let Ont = require('ontology-ts-sdk');
export default {
  getWalletFile($password, $encryptedPrivateKey = '') {

    // // return json
    let wallet
    let res
    if(!$encryptedPrivateKey) {
      const privateKey = Ont.Crypto.PrivateKey.random();
      const publicKey = privateKey.getPublicKey();
      const wallet = Ont.Wallet.create();
      const identity = Ont.Identity.create(privateKey, $password, '');
      const account = Ont.Account.create(privateKey, $password, '');
      wallet.addIdentity(identity);
      wallet.addAccount(account);
      //register ontid to chain
      const signPri = new Ont.Crypto.PrivateKey('75de8489fcb2dcaf2ef3cd607feffde18789de7da129b5e97c81e001793cb7cf');
      const payer = new Ont.Crypto.Address('AazEvfQPcQ2GEFFPLF1ZLwQ7K5jDn81hve');
      const gasPrice = '500';
      const gasLimit = '20000';
      const tx = Ont.OntidContract.buildRegisterOntidTx(identity.ontid, publicKey, gasPrice, gasLimit);
      tx.payer = payer;
      Ont.TransactionBuilder.signTransaction(tx, signPri);
      Ont.TransactionBuilder.addSign(tx, privateKey);
      //send tx
      const restClient = new Ont.RestClient(process.env.NODE_URL);
      return restClient.sendRawTransaction(tx.serialize()).then(res => {
        if(res.Error === 0) {
          const keystore = wallet.toJson();
          sessionStorage.setItem('wallet', keystore);
          sessionStorage.setItem('privateKey',privateKey.key)
          return keystore;
        }
      }).catch(err => {
        return Promise.reject(err);
      })
    } else {
      return Ont.SDK.importIdentity('', $encryptedPrivateKey, $password).then( res => {
        wallet = res.result
        sessionStorage.setItem('wallet', wallet)
        sessionStorage.setItem('privateKey',privateKey)
        return wallet
      })

    }
    /*
    response:{
      error : number,
      result : string||object,
      desc : string
    }
    */
    //0 - SUCCESS

  },

  recoveryWallet(password, keystring) {
    const salt = keystring.substr(0,24);
    const address = keystring.substr(24, 34);
    const encryptedPrivateKey = keystring.substr(58);
  return Ont.SDK.importIdentityAndCreateWallet('', encryptedPrivateKey, password, address, salt).then((res) => {
      let wallet = res.result
      sessionStorage.setItem('wallet', wallet)
      return res
    }, (err) => {
      sessionStorage.setItem('wallet', null)
      return err
    })


  }

}
