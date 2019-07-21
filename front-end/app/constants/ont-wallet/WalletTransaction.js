var WalletTransaction = {
    ConfirmReward: function ($questionId,$AskerAddress,$bestAnswerAddress){
        console.log($questionId)

        const walletAddress =  new Ont.Crypto.Address('ARswehu2w1jMZU5qhckTdoZV9jogUzXfZX');
        const walletPrivateKey = new Ont.Crypto.PrivateKey('3c1e911dd41532c29c5ff37685e4916e08442b4a1d53ec829dc0f07f855f9e16');
        const walletPublicKey = walletPrivateKey.getPublicKey()

        const bbsAddress = new Ont.Crypto.Address('AazEvfQPcQ2GEFFPLF1ZLwQ7K5jDn81hve');
        const bbsPrivateKey = new Ont.Crypto.PrivateKey('75de8489fcb2dcaf2ef3cd607feffde18789de7da129b5e97c81e001793cb7cf');
        const bbsPublicKey = bbsPrivateKey.getPublicKey()

        const contractAddr = new Ont.Crypto.Address(CONTRACT_HASH);

        let functionName = 'ConfirmAnswer'
        let questionIdHash = Ont.utils.hash160($questionId)

        const AskerAddress = new Ont.Crypto.Address($AskerAddress)
        const bestAnswerAddress = new Ont.Crypto.Address($bestAnswerAddress)
        let functionParam = []
        let asker = new Ont.Parameter('asker', 'ByteArray', AskerAddress.serialize())
        functionParam.push(asker)
        let questionHash = new Ont.Parameter('questionHash', 'ByteArray', questionIdHash)
        functionParam.push(questionHash)
        let answer = new Ont.Parameter('answer', 'ByteArray', bestAnswerAddress.serialize())
        functionParam.push(answer)


        console.log(functionParam)
        let tx
        try {
            //make transaction
            //const tx = TransactionBuilder.makeInvokeTransaction(funcName, [p1, p2], contractAddr, gasPrice, gasLimit,payerAddr)
            tx = Ont.TransactionBuilder.makeInvokeTransaction(functionName, functionParam, contractAddr, '500','20000', walletAddress)
            console.log(tx)
            console.log([walletPublicKey,bbsPublicKey])
            Ont.TransactionBuilder.signTx(tx,2,[walletPublicKey,bbsPublicKey],walletPrivateKey)
            console.log(tx)
            //Ont.TransactionBuilder.signTx(tx,2,[walletPublicKey,bbsPublicKey],bbsPrivateKey)
            //console.log(tx)
            //let txParam = Ont.TransactionBuilder.buildTxParam(tx)
            //console.log(txParam)
            //WalletTransaction.askReward(txParam)
        } catch(err) {
            console.log(err)
        }


    },


    askReward: function ($txParam,$clickButton) {
        // let url = Ont.CONST.TEST_ONT_URL.sendRawTxByRestful
        let url = NODE_URL;
        // let url = '127.0.0.1'
        // let url = "139.219.134.195"; //48h test server
        var socket = new WebSocket(`ws://${url}:${Ont.CONST.HTTP_WS_PORT}`)
        socket.onopen = () => {
            console.log('socket connected')
            socket.send($txParam)
        }
        socket.onmessage = (event) => {
            let res = event.data
            if (typeof res === 'string') {
                res = JSON.parse(res)
            }
            console.log(res)
            if(res.Error !== 0) {
                socket.close()
                console.log(false)
            }
            if(res.Action === 'Notify') {
                // res = formatSocketEventData(event)
               $clickButton()
                socket.close()
            }

            setTimeout(function(){
                socket && socket.close()
            }, 6000)
        }
        socket.onerror = (event) => {
            //no server or server is stopped
            console.log(event.data)
            socket.close()
        }
        socket.onclose = (event) => {
            console.log('socket closed')
        }
    }
}