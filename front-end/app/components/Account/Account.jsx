import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
// import Swal from 'sweetalert2'

import DonationTemplate from '../DonationTemplate/DonationTemplate'
import RecipientTemplate from '../RecipientTemplate/RecipientTemplate'
import styles from './Account.scss'
import {getBalance, getTransforHistory} from "../../actions/wallet";
import TransactionSuccessTemplate from "../TransactionSuccessTemplate/TransactionSuccessTemplate";
import CharityReleaseTemplate from "../CharityReleaseTemplate/CharityReleaseTemplate"
import CharityTransforBoard from "../CharityTransforTemplate/CharityTransforTemplate"
import RecipientSuccessTemplate from "../RecipientSuccessTemplate/RecipientSuccessTemplate"
import BreadContractCheckTemplate from '../BreadContractCheckTemplate/BreadContractCheckTemplate'
import Sleep from "../../constants/ont-wallet/sleep";


class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      walletInfo:'',
      walletBalance:'',
      showBord: false,
      showRecipientBoard: false,
      showCharityReleaseBoard: false,
      showCharityTransforBoard:false,
      showSuccessBord: '',
      showRecipientSuccessBoard: '',
      transactionHash:'',
      CharityReleaseTemplateAddress:'',
      CharityReleaseTemplateMoney:'',
      BreadContractCheckTemplate:''
    }
  }
  componentDidMount = () => {
    this.props.getBalance(this.props.walletInfo.address)
    this.setState({walletInfo: this.props.walletInfo})
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.walletBalance !== nextProps.walletBalance) {
      this.setState({walletBalance: nextProps.walletBalance})
    }
    if(this.props.walletInfo !== nextProps.walletInfo){
      this.setState({walletInfo: nextProps.walletInfo})
    }
  }
  operate = ($buttonName2) => {
    if($buttonName2) {
      this.showBord()
    }else {
      switch (this.props.buttonName){
        case '捐款':
          this.showBord()
          break
        case '爱心助力':
          this.showCharityReleaseBoard()
          break
        case '发布申请':
          this.showRecipientBoard()
          break
      }
    }
  }
  showBord = () => {
    this.setState({
      showBord: true,
    })
  }
  hideBord = (showBord) => {
    this.setState({
      showBord: showBord,
    })
  }
  showSuccessBord = () => {
    this.setState({
      showSuccessBord: true,
    })
    Sleep.sleep(8000).then(() => {
      console.log("mmm")
      this.props.getTransforHistory(this.props.walletInfo.address,'payer')
    })

  }
  hideSuccessBord = (showSuccessBord) => {
    this.setState({
      showSuccessBord: showSuccessBord,
    })
  }
  showRecipientBoard = () => {
    this.setState({
      showRecipientBoard: true,
    })
  }
  hideRecipientBoard = (showRecipientBoard) => {
    this.setState({
      showRecipientBoard: showRecipientBoard,
    })
  }
  showRecipientSuccessBoard = () => {
    this.setState({
      showRecipientSuccessBoard: true,
    })
  }
  hideRecipientSuccessBoard = (showRecipientSuccessBoard) => {
    this.setState({
      showRecipientSuccessBoard: showRecipientSuccessBoard,
    })
  }
  showCharityReleaseBoard = () => {
    this.setState({
      showCharityReleaseBoard: true,
    })
  }
  hideCharityReleaseBoard = (showCharityReleaseBoard) => {
    this.setState({
      showCharityReleaseBoard: showCharityReleaseBoard,
    })
  }
  getTransHash = ($hash) => {
    this.setState({transactionHash: $hash})
  }
  showCharityTransforBoard = ($address,$money) => {
    this.setState({
      showCharityTransforBoard: true,
      CharityReleaseTemplateAddress:$address,
      CharityReleaseTemplateMoney:$money,
    })
  }
  hideCharityTransforBoard = (showCharityTransforBoard) => {
    this.setState({
      showCharityTransforBoard: showCharityTransforBoard,
    })
  }
  showCheckBreadContract = () => {
    this.setState({
      BreadContractCheckTemplate:true
    })
  }
  hideBreadContractCheckTemplate = () => {
    this.setState({
      BreadContractCheckTemplate:false
    })
  }
  render() {

    return (
      <div className={styles.account}>
        <h2 className={styles.accountTitle}>钱包地址</h2>
        <div className={styles.accountInfo}>
          {this.state.walletInfo.address}
        </div>
        <h2 className={styles.accountTitle}>钱包余额</h2>
        <div className={styles.accountInfo}>
          <span>{this.state.walletBalance}</span> ont
        </div>
        <div className={styles.operate} onClick={() => {this.operate()}}>{this.props.buttonName}</div>
        {
          ((this.props.buttonName2) && (this.props.personalInfo.role!=='provider')) ?
            (<div className={styles.operate} onClick={() => {this.operate(this.props.buttonName)}}>{this.props.buttonName2}</div>):''
        }
        {
          this.props.personalInfo.role ==='provider' ?
            (<div className={styles.operate} onClick={this.props.toBreadContract}>物品助力</div>):''
        }
        {
          this.props.personalInfo.role ==='recipient' ?
            (<div className={styles.operate} onClick={this.showCheckBreadContract}>确认物品</div>):''
        }
        {this.state.showBord && <DonationTemplate showBord={this.state.showBord} hideBord={this.hideBord} showSuccessBord={this.showSuccessBord} getTransHash={this.getTransHash} />}
        {this.state.showSuccessBord && <TransactionSuccessTemplate showBord={this.state.showSuccessBord} hideBord={this.hideSuccessBord} transactionHash={this.state.transactionHash}/>}
        {this.state.showCharityReleaseBoard && <CharityReleaseTemplate showBord={this.state.showCharityReleaseBoard} hideBord={this.hideCharityReleaseBoard} showCharityTransforBoard={this.showCharityTransforBoard}/>}
        {this.state.showRecipientBoard && <RecipientTemplate showBord={this.state.showRecipientBoard} hideBord={this.hideRecipientBoard} updateList={this.props.updateList} />}
        {this.state.showCharityTransforBoard &&
        <CharityTransforBoard showBord={this.state.showCharityTransforBoard}
                              hideBord={this.hideCharityTransforBoard}
                              recipientAddress={this.state.CharityReleaseTemplateAddress}
                              money={this.state.CharityReleaseTemplateMoney}
                              showSuccessBord={this.showSuccessBord}
                              getTransHash={this.getTransHash}/>}
        {this.state.showRecipientSuccessBoard && <RecipientSuccessTemplate showBord={this.state.showRecipientSuccessBoard} hideBord={this.hideRecipientSuccessBoard} />}
        {this.state.BreadContractCheckTemplate && <BreadContractCheckTemplate showBord={this.state.BreadContractCheckTemplate} hideBord={this.hideBreadContractCheckTemplate} />}
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
    getBalance: bindActionCreators(getBalance, dispatch),
    getTransforHistory: bindActionCreators(getTransforHistory, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Account))
