import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './Wallet.scss'
import GetWalletFileMsg from '../../constants/ont-wallet/info'
import FileHelper from '../../constants/ont-wallet/file-generate-and-get'
import Sleep from '../../constants/ont-wallet/sleep'
import WalletTransaction from '../../constants/ont-wallet/transaction'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      WalletFile: '',
      password: '',
      Address: '',
    }
  }
  getFiles = () => {
    const files = document.getElementById("inputFile").files
    const WalletFile = files[0]
    this.setState({ WalletFile })
  }
  setPassword = (e) => {
    this.setState({ password : e.target.value })
  }
  openWallet = () => {
    Sleep.sleep(200).then(() => {
      FileHelper.readWalletFile(this.state.WalletFile).then( ($walletFile) => {
        if($walletFile) {
          let info = GetWalletFileMsg.decryptWalletFile($walletFile, this.state.password)
          if(info.isGetInfo) {
            const Address = info.ontid.substring(8)
            this.setState({ Address })
            console.log(info)
          }else{
            console.log(info)
          }
        }
      })
    })
  }
  toTransaction = () => {
    WalletTransaction.sendTransactionByJson()
  }
  render() {
    return (
      <div className={styles.fontC}>
        <input type="file" onChange={this.getFiles} id="inputFile"/>
        <input type="text" placeholder="密码"
               value={this.state.password} onChange={(event) => this.setPassword(event)}/>
        <button onClick={this.openWallet}>打开钱包</button>
        <div>钱包地址：{this.state.Address}</div>
        <button onClick={this.toTransaction}>转账</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login))
