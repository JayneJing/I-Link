import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './CharityTransforTemplate.scss'
import {CHARITY_ADDRESS} from '../../constants/Address'
import WalletTransaction from "../../constants/ont-wallet/transaction";
import GetWalletFileMsg from "../../constants/ont-wallet/info";
import TransactionSuccessTemplate from '../TransactionSuccessTemplate/TransactionSuccessTemplate'
import CLOSE from './close.png'

class CharityTransforTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password:'',
      money:'',
    }
  }

  closeBord = () => {
    this.props.hideBord(false)
  }
  showSuccessBord = () => {
    this.props.showSuccessBord()
  }
  getTransHash = ($hash) => {
    this.props.getTransHash($hash)
  }
  toTransaction = async() => {
    let info = GetWalletFileMsg.decryptWalletFile(this.props.walletInfo.walletFile, this.state.password)
    if(info.isGetInfo){
      console.log(info)
      let msg = await WalletTransaction.sendTransaction(this.props.walletInfo.address,this.props.recipientAddress,info.privateKey,this.state.money )
      if(msg.Desc === "SUCCESS") {
        this.showSuccessBord()
        this.getTransHash(msg.Result)
        this.closeBord()
      }
    }

  }
  setPassword = (e) => {
    this.setState({password: e.target.value})
  }
  setValue = (e) => {
    this.setState({money: e.target.value})
  }

  render() {
    return (
      <div>
        <div className={styles.templateDiv}>
        </div>
        <div className={styles.templateWraper}>
          <div className={styles.templateTop}>
            <h1>爱心捐款</h1>
          </div>
          <span className={styles.closeBtn} onClick={this.closeBord}>
            <img src={CLOSE}/>
          </span>

          <div className={styles.info}>
            <div>
              <label>钱包地址：</label>
              <span>{this.props.walletInfo.address}</span>
            </div>
            <div>
              <label>受益人地址：</label>
              <span>{this.props.recipientAddress}</span>
            </div>
            <div>
              <label>项目所需金额：</label>
              <span>{this.props.money}</span>
            </div>
            <div>
              <label>捐款金额：</label>
              <input type="text" onChange={this.setValue}/>
              <p className={styles.balanceText}>余额：{this.props.walletBalance} Ont</p>
            </div>
            <div>
              <label>输入密码：</label>
              <input type="password" onChange={this.setPassword}/>
            </div>
          </div>
          <div className={styles.submit} onClick={this.toTransaction}>捐款</div>

        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    walletInfo: state.wallet.walletInfo,
    personalInfo: state.login.personalInfo,
    walletBalance: state.wallet.walletBalance,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CharityTransforTemplate))
