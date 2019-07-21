let Ont = require('ontology-ts-sdk');
import {RestClient} from 'ontology-ts-sdk';
import {BLOCK_CHAIN_URL} from '../API'
export default {
  sendTransaction: async function ($walletAddress, $toAddress, $privateKey, $money) {
    console.log($walletAddress)
    console.log($toAddress)
    const restClient = new RestClient(BLOCK_CHAIN_URL);
    const walletAddress = new Ont.Crypto.Address($walletAddress);
    const walletPrivateKey = new Ont.Crypto.PrivateKey($privateKey);

    const toAddress = new Ont.Crypto.Address($toAddress);


    var tx = Ont.OntAssetTxBuilder.makeTransferTx('ONT', walletAddress, toAddress, $money, 0, 20000, walletAddress);
    Ont.TransactionBuilder.signTransaction(tx, walletPrivateKey);
    const res = await restClient.sendRawTransaction(tx.serialize(), false);

    console.log(res);
    return res
  },

  sendTransactionByJson: async function () {
    const restClient = new RestClient('http://127.0.0.1:20334');
    const adminPrivateKey = new Ont.Crypto.PrivateKey('57a4fdfdcd5e114853e782e1c3346a8118ad4bd60963eb4d237ba1cb23a90666');
    const json = {
      "action": "invoke",
      "version": "v1.0.0",
      "id": "10ba038e-48da-487b-96e8-8d3b99b6d18a",
      "params": {
        "invokeConfig": {
          "contractHash": "0100000000000000000000000000000000000000",
          "functions": [{
            "operation": "transfer",
            "args": [{
              "name": "arg0-from",
              "value": "Address:AL6YBSSi9rJwkxSHc3K6tq8Zy53Nji4aRP"
            },
              {
                "name": "arg1-to",
                "value": "Address:AUz5BAASDNfv7gvgRsncMjM9cSjmDon5if"
              },
              {
                "name": "arg2-amount",
                "value": "Long:100000"
              }
            ]
          }],
          "payer": "AL6YBSSi9rJwkxSHc3K6tq8Zy53Nji4aRP",
          "gasLimit": 20000,
          "gasPrice": 0
        }
      }
    };
    const txs = Ont.TransactionBuilder.makeTransactionsByJson(json);
    Ont.TransactionBuilder.signTransaction(txs[0], adminPrivateKey);
    const res = await restClient.sendRawTransaction(txs[0].serialize(), false);
    console.log(res);

  },
  sendTransactionBySmartContract: async function ($address,$privateKey,$childAddress,$value) {
    const restClient = new RestClient('http://127.0.0.1:20334');
    const walletAddress =  new Ont.Crypto.Address($address);
    const walletPrivateKey = new Ont.Crypto.PrivateKey($privateKey);
    const walletPublicKey = walletPrivateKey.getPublicKey()
    const contractAddr = new Ont.Crypto.Address(Ont.utils.reverseHex('f943b4f4cc42f83a1cd1af3561c9825b2ecb291e'));

    let functionName = 'setBreadInfo'
    let functionParam = []
    let childAddress = new Ont.Parameter('childAddress', 'String', $childAddress)
    functionParam.push(childAddress)
    let value = new Ont.Parameter('value', 'Int', $value)
    functionParam.push(value)
    let tx

    tx = Ont.TransactionBuilder.makeInvokeTransaction(functionName, functionParam, contractAddr, '0', '20000', walletAddress)
    Ont.TransactionBuilder.signTransaction(tx, walletPrivateKey)
    const res = await restClient.sendRawTransaction(tx.serialize(), false, false);

    console.log(res)
    return res

  },
  updateTransactionBySmartContract: async function ($address,$privateKey,$childAddress,$value) {
    const restClient = new RestClient('http://127.0.0.1:20334');
    const walletAddress =  new Ont.Crypto.Address($address);
    const walletPrivateKey = new Ont.Crypto.PrivateKey($privateKey);
    const walletPublicKey = walletPrivateKey.getPublicKey()
    const contractAddr = new Ont.Crypto.Address(Ont.utils.reverseHex('f943b4f4cc42f83a1cd1af3561c9825b2ecb291e'));

    let functionName = 'setBreadInfo'
    let functionParam = []
    let childAddress = new Ont.Parameter('childAddress', 'String', $childAddress)
    functionParam.push(childAddress)
    let value = new Ont.Parameter('value', 'Int', $value)
    functionParam.push(value)
    let tx

    tx = Ont.TransactionBuilder.makeInvokeTransaction(functionName, functionParam, contractAddr, '0', '20000', walletAddress)
    Ont.TransactionBuilder.signTransaction(tx, walletPrivateKey)
    const res = await restClient.sendRawTransaction(tx.serialize(), false, false);

    console.log(res)
    return res

  },
  checkStatusBySmartContract: async function ($address,$privateKey,$childAddress) {
    const restClient = new RestClient('http://127.0.0.1:20334');
    const walletAddress =  new Ont.Crypto.Address($address);
    const walletPrivateKey = new Ont.Crypto.PrivateKey($privateKey);
    const walletPublicKey = walletPrivateKey.getPublicKey()
    const contractAddr = new Ont.Crypto.Address(Ont.utils.reverseHex('f943b4f4cc42f83a1cd1af3561c9825b2ecb291e'));

    let functionName = 'getBreadInfo'
    let functionParam = []
    let childAddress = new Ont.Parameter('childAddress', 'String', $childAddress)
    functionParam.push(childAddress)
    console.log(functionParam)
    let tx

    tx = Ont.TransactionBuilder.makeInvokeTransaction(functionName, functionParam, contractAddr, '0', '20000', walletAddress)
    Ont.TransactionBuilder.signTransaction(tx, walletPrivateKey)
    const res = await restClient.sendRawTransaction(tx.serialize(), false, false);
    console.log(res)

    const m = await restClient.getSmartCodeEvent(res.Result);
  }
}


