function isBase64(str) {
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return base64regex.test(str);
}
let Ont = require('ontology-ts-sdk');
export default {
  decryptWalletFile($walletFile, $password) {
    try {
      let result = JSON.parse($walletFile)
      if (typeof result === 'string') {
        result = JSON.parse(result)
      }
      const params = {
        cost: result.scrypt.n,
        blockSize: result.scrypt.r,
        parallel: result.scrypt.p,
        size: result.scrypt.dkLen
      };
      if (result.identities && result.identities.length && result.identities[0]) {
        const identity = result.identities[0]
        const control = identity.controls[0]
        const ontid = identity.ontid;
        if(control['enc-alg'] === 'aes-256-gcm') {
          let encPri = new Ont.Crypto.PrivateKey(control.key);
          const salt = control.salt;
          const address = new Ont.Crypto.Address(control.address);
          const privateKey = encPri.decrypt($password, address, salt, params);
          const info = {
            privateKey : privateKey.key,
            encryptedPrivateKey : control.key,
            ontid: ontid,
            isGetInfo: true
          }
          return info
        } else {
          throw 'NOT_SUPPORTED_WALLET' //'Not supported wallet file. Please sign up and retry.'
        }

      } else if(result.accounts.length && result.accounts[0]) {
        const account = result.accounts[0]
        if (account['enc-alg'] === 'aes-256-gcm') {
          let encPri = new Ont.Crypto.PrivateKey(account.key);
          const salt = account.salt;
          const address = new Ont.Crypto.Address(account.address);
          const privateKey = encPri.decrypt($password, address, salt, params);
          const info = {
            privateKey: privateKey.key,
            encryptedPrivateKey : account.key,
            ontid: 'did:ont:' + account.address,
            isGetInfo: true
          }
          return info
        } else {
          throw 'NOT_SUPPORTED_WALLET'  //'Not supported wallet file. Please sign up and try again.'
        }

      } else {
        throw  'INVALID_WALLET' //'Invalid wallet file.'
      }
    } catch(err) {
      console.log('err: ' + err)
      let errInfo = {
        err: err,
        isGetInfo: false
      }
      return errInfo
    }
  },

  //Decprecated
  decryptWalletFileOld( $walletFile, $password) {
      try {
        let result = JSON.parse($walletFile)
        if(typeof result === 'string') {
          result = JSON.parse(result)
        }
        const params = {
          cost: result.scrypt.n,
          blockSize: result.scrypt.r,
          parallel: result.scrypt.p,
          size: result.scrypt.dkLen
        };
        if(result.identities.length && result.identities[0]) {
          const encryptedPrivateKey = result.identities[0].controls[0].key
          const ontid = result.identities[0].ontid
          const checksum = Ont.Crypto.Address.fromOntid(ontid).getB58Checksum()

          let privateKey = ''
          //case 1: encrypt with CTR
          const control = result.identities[0].controls[0]
          if (control['enc-alg'] === 'aes-256-gcm') {
            let encPri = new Ont.Crypto.PrivateKey(control.key);
            const salt = btoa(control.salt);
            const address = new Ont.Crypto.Address(control.address);
            const privateKey = encPri.decrypt($password, address, salt, params);
            const info = {
              privateKey,
              encryptedPrivateKey,
              ontid: ontid,
              isGetInfo: true
            }
            return info
          }
          if(isBase64(encryptedPrivateKey)) {
            const decPri = Ont.scrypt.encryptWithCtr(encryptedPrivateKey,)
            privateKey = decPri.key;
          } else {
          //case 2: encrypt with ECB
          //case 3： encrypt with ECB and plain pk(no algorithm&curve)
            privateKey = Ont.scrypt.decryptWithEcb(encryptedPrivateKey, $password, params);
            const decPub = new Ont.Crypto.PrivateKey(privateKey).getPublicKey();
            let checkCase2 = true,
                checkCase3 = true;
            try {
              Ont.scrypt.checkEcbDecrypted(encryptedPrivateKey, privateKey, decPub.serializeHex());
            }catch(err) {
              checkCase2 = false;
            }
            try {
              Ont.scrypt.checkEcbDecrypted(encryptedPrivateKey, privateKey, decPub.key);
            }catch(err) {
              checkCase3 = false;
            }

            if(!checkCase2 && !checkCase3) {
              throw 'Encryption failed.'
            }

          }
          if(privateKey) {
            let info = {
              privateKey: privateKey,
              encryptedPrivateKey: encryptedPrivateKey,
              ontid: ontid,
              isGetInfo: true
            }
            return info
          }
        }
        //only has account
        else if(result.accounts.length && result.accounts[0]) {
          const account = result.accounts[0]
          if(account['enc-alg'] === 'aes-256-gcm') {
            let encPri = new Ont.Crypto.PrivateKey(account.key);
            const salt = btoa(account.salt);
            const address = new Ont.Crypto.Address(account.address);
            const privateKey = encPri.decrypt($password, address, salt, params);
            const info = {
              privateKey,
              encryptedPrivateKey,
              ontid:'did:ont:' + account.address,
              address: account.address,
              isGetInfo: true
            }
            return info
          }
        } else {
          throw 'Wrong wallet file.';
        }
      } catch(err) {
        console.log('err: '+err)
          let errInfo = {
            err: err,
            isGetInfo: false
          }
          return errInfo
      }
  }
}
