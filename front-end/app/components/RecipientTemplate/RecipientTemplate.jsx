import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './RecipientTemplate.scss'
import {CHARITY_ADDRESS} from '../../constants/Address'
import WalletTransaction from "../../constants/ont-wallet/transaction";
import GetWalletFileMsg from "../../constants/ont-wallet/info";
import TransactionSuccessTemplate from '../TransactionSuccessTemplate/TransactionSuccessTemplate'
import { creatRecipient } from '../../actions/recipient'
import Beneficiary1 from './Beneficiary1.jpg'

class RecipientTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      money: '',
      title: '',
      content: '',
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.recipientInfo.result === "success") {
      this.updateList()
    }
  }
  closeBord = () => {
    this.props.hideBord(false)
  }
  toCreate = async() => {
    const params = {
      money: this.state.money,
      title: this.state.title,
      content: this.state.content,
      wallet_address: this.props.walletInfo.address,
      name: this.props.personalInfo.name,
    }
    this.props.creatRecipient(params)
  }

  updateList = () => {
    this.props.updateList()
    this.closeBord()
  }
  getTransHash = ($hash) => {
    this.props.getTransHash($hash)
  }

  setValue = (e) => {
    this.setState({money: e.target.value})
  }
  setTitle = (e) => {
    this.setState({title: e.target.value})
  }
  setContent = (e) => {
    this.setState({content: e.target.value})
  }

  render() {
    return (
      <div className={styles.templateWraper}>
        <span className={styles.closeBtn} onClick={this.closeBord}>x</span>
        <h1>填写信息</h1>
        <div className={styles.info}>
          <div>
            <label>钱包地址：</label>
            <span>{this.props.walletInfo.address}</span>
          </div>
          <div>
            <label>筹款数量：</label>
            <input type="text" onChange={this.setValue}/>
            <span style={{ lineHeight:'20px' }}>Ont</span>
          </div>
        </div>
        <div className={styles.recipientInfo}>
          <div className={styles.left}>
            <p>视频/照片上传</p>
            <img src={Beneficiary1} alt="Image preview..."/>
          </div>
          <div className={styles.right}>
             <label>标题：</label>
             <input type="text" placeholder="标题" onChange={this.setTitle} />
             <label>发声：</label>
            <textarea name="" id="" cols="30" rows="10" placeholder="发声" onChange={this.setContent} />
          </div>
        </div>
        <div className={styles.submit} onClick={this.toCreate}>发布</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    walletInfo: state.wallet.walletInfo,
    personalInfo: state.login.personalInfo,
    recipientInfo: state.recipient.recipientInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    creatRecipient: bindActionCreators(creatRecipient, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RecipientTemplate))
