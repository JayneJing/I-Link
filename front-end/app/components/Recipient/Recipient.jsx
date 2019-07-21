import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import TableList from '../TableList/TableList'
import UserInfo from '../UserInfo/UserInfo'
import Account from '../Account/Account'
import Pagiation from '../Pagination/Pagination'
import ReleaseHistory from '../ReleaseHistory/ReleaseHistory'
import styles from './Recipient.scss'
import {getTransforHistory, setWalletInfo} from "../../actions/wallet";
import {login} from "../../actions/login";
import {getRecipientProjectList} from "../../actions/recipient";

class Recipient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideNav: false,
      transforHistory:[],
      recipientProjectList:[],
    }

    // 受助列表
    this.tableHeader = [
      {
        name: '受捐时间',
        width: '',
      },
      {
        name: '交易哈希',
        width: '',
      },
      {
        name: '地址',
        width: '',
      },
      {
        name: '数量',
        width: '',
      },
    ]
    this.sessionName = '受捐记录'
  }
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll.bind(this))
    this.refreshList()
    const params = {
      type:'single',
      address: this.props.walletInfo.address
    }
    this.props.getRecipientProjectList(params)
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.transforHistory !== nextProps.transforHistory) {
      this.setState({transforHistory: nextProps.transforHistory})
    }
    if (this.props.recipientProjectList !== nextProps.recipientProjectList) {
      this.setState({recipientProjectList: nextProps.recipientProjectList})
    }
  }
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }
  handleScroll = (e) => {
    if (e.srcElement.scrollingElement.scrollTop > 100) {
      this.setState({
        hideNav: true,
      })
    } else {
      this.setState({
        hideNav: false,
      })
    }
  }
  paging = (pageCurr) => {
    console.log(pageCurr)
    // 获取受捐记录的数据（根据页数）
  }
  refreshList = () => {
    this.props.getTransforHistory(this.props.walletInfo.address,'remittee')
  }
  operate = () => {
    // 发布信息的方法
  }
  updateList = () => {
    const params = {
      type:'single',
      address: this.props.walletInfo.address
    }
    this.props.getRecipientProjectList(params)
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
          <Account
            buttonName="发布申请"
            updateList={this.updateList}
          />
        </div>
        <div className={styles.recipientsRecord}>
          <TableList
            tableHeader={this.tableHeader}
            tableData = {this.state.transforHistory.slice(0,10)}
            sessionName={this.sessionName}
            refreshList={this.refreshList}
            type="payer"
            plus="+"
            address={this.props.walletInfo.address}
          />
          {/* <Pagiation
            config = {{
              totalPage: 18,
              paging: this.paging,
            }}
          /> */}
        </div>
        <div className={styles.releaseHistory}>
          {
            this.state.recipientProjectList.map((item, index) => {
              return (
                <ReleaseHistory info={item} key={index}/>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    walletInfo: state.wallet.walletInfo,
    personalInfo: state.login.personalInfo,
    transforHistory: state.wallet.transforHistory,
    recipientProjectList: state.recipient.recipientProjectList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTransforHistory: bindActionCreators(getTransforHistory, dispatch),
    getRecipientProjectList: bindActionCreators(getRecipientProjectList, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Recipient))
