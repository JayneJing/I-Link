import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './BreadContractCheckTemplate.scss'
import {CHARITY_ADDRESS} from '../../constants/Address'
import WalletTransaction from "../../constants/ont-wallet/transaction";
import GetWalletFileMsg from "../../constants/ont-wallet/info";
import TransactionSuccessTemplate from '../TransactionSuccessTemplate/TransactionSuccessTemplate'
import CLOSE from './close.png'
import {getSmartCodeByHash} from "../../actions/wallet";

class BreadContractCheckTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value:'',
      breadValue:'',
    }
  }
  componentDidMount = () => {
    //this.getBreadValue()
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.breadValue !== nextProps.breadValue) {
      //this.setState({breadValue: nextProps.breadValue})
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
  getBreadValue = async () => {
    let info = GetWalletFileMsg.decryptWalletFile(this.props.walletInfo.walletFile, '111111')
    if(info.isGetInfo){
      console.log(info)
      let msg = await WalletTransaction.checkStatusBySmartContract(this.props.walletInfo.address,info.privateKey,this.props.walletInfo.address)
      console.log(msg)
    }
  }
  toTransaction = async() => {
    this.closeBord()
  }
  setValue = (e) => {
    this.setState({value: e.target.value})
  }

  render() {
    return (
      <div>
        <div className={styles.templateDiv}>
        </div>
        <div className={styles.templateWraper}>
          <div className={styles.templateTop}>
            <h1>确认物品</h1>
          </div>
          <span className={styles.closeBtn} onClick={this.closeBord}>
            <img src={CLOSE}/>
          </span>

          <div className={styles.info}>
            <div>
              <label>应收面包：</label>
              <span>30个</span>
            </div>
            <div>
              <label>实收：</label>
              <input type="text" onChange={this.setValue}/>
            </div>
          </div>
          <div className={styles.submit} onClick={this.toTransaction}>确认</div>

        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    walletInfo: state.wallet.walletInfo,
    breadValue: state.wallet.breadValue,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSmartCodeByHash: bindActionCreators(getSmartCodeByHash, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BreadContractCheckTemplate))
