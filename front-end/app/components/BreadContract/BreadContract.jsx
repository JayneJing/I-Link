import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './BreadContract.scss'
import UserInfo from "../UserInfo/UserInfo";
import {NavLink} from "react-router-dom";
import GetWalletFileMsg from "../../constants/ont-wallet/info";
import WalletTransaction from "../../constants/ont-wallet/transaction";


class BreadContract extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData:[],
      ChildAddress:'',
      value: '',
    }
    this.tableHeader = ['交易hash','孩子地址','数量','']
  }
  componentDidMount = () => {
    const m = JSON.parse(localStorage.getItem('tableData'))
    this.setState({tableData: m })
  }
  componentWillUnmount = () => {
  }
  componentWillReceiveProps = (nextProps) => {
  }
  setBreadContract = async() => {
    let info = GetWalletFileMsg.decryptWalletFile(this.props.walletInfo.walletFile, '111111')
    if(info.isGetInfo){
      console.log(info)
      let msg = await WalletTransaction.sendTransactionBySmartContract(this.props.walletInfo.address,info.privateKey,this.state.ChildAddress,this.state.value )
      if(msg.Desc === "SUCCESS") {
        const data = {
          contractHash: msg.Result,
          ChildAddress: this.state.ChildAddress,
          value: this.state.value
        }
        console.log(data)
        let m = JSON.parse(JSON.stringify(this.state.tableData))
        m.push(data)
        this.setState({tableData: m })
        localStorage.setItem('tableData', JSON.stringify(m))
      }
    }
  }
  childAddress = (e) => {
    this.setState({
      ChildAddress: e.target.value,
    })
  }
  value = (e) => {
    this.setState({
      value: e.target.value,
    })
  }
  checkStatus = async($childAddress) => {
    let info = GetWalletFileMsg.decryptWalletFile(this.props.walletInfo.walletFile, '111111')
    if(info.isGetInfo){
      console.log(info)
      let msg = await WalletTransaction.checkStatusBySmartContract(this.props.walletInfo.address,info.privateKey,$childAddress)
      if(msg.Desc === "SUCCESS") {
        window.location.href="http://localhost:20334/api/v1/smartcode/event/txhash/"+msg.Result
        console.log(msg.Result)
      }
    }
  }
  render() {
    return (
      <div className={styles.recipientsInfo} style={this.state.hideNav ? { marginTop: '161px' } : { marginTop: '0' }}>
        <div className={styles.recipients}>
          <div className={styles.sessionName}>
            个人钱包
          </div>
          <UserInfo
          />

          <div className={styles.account}>
            <h2 className={styles.accountTitle}>孩子钱包地址</h2>
            <input onChange={this.childAddress}/>
            <h2 className={styles.accountTitle}>面包数量</h2>
            <input onChange={this.value} />
            <div className={styles.operate} onClick={() => {this.setBreadContract()}}>记录信息</div>
          </div>
        </div>
        <div className={styles.recipientsRecord}>
          <div className={styles.tableWraper}>
            <div className={styles.tableContent}>
              <div className={styles.sessionName}>送物品记录</div>
              <div className={styles.tableList}>
                <table cellSpacing="0" cellPadding="0">
                  <thead>
                  <tr>
                    {
                      this.tableHeader.map((item, index) => {
                        return (
                          <th key={index}>{item}</th>
                        )
                      })
                    }
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.tableData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.contractHash}</td>
                          <td>{item.ChildAddress}</td>
                          <td>{item.value}</td>
                          <td><button className={styles.refresh} onClick={() => this.checkStatus(item.ChildAddress)}>查看状态</button> </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    walletInfo: state.wallet.walletInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BreadContract))
