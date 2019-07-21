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

import styles from './Donator.scss'

import PIC from './pic.jpg'
import {getTransforHistory} from "../../actions/wallet"
import {login} from "../../actions/login"

class HelpSeeker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideNav: false,
      transforHistory:[]
    }
    // 受助列表
    this.tableHeader = [
      {
        name: '捐助时间',
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
    this.sessionName = '捐款记录'
    // 发布历史记录
  }
  paging = (pageCurr) => {
    //console.log(pageCurr)
    // 获取受捐记录的数据（根据页数）
  }
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll.bind(this))
    this.refreshList()
  }
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.transforHistory !== nextProps.transforHistory) {
      this.setState({transforHistory: nextProps.transforHistory})
    }
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
  refreshList = () => {
    this.props.getTransforHistory(this.props.walletInfo.address,'payer')
  }
  operate = () => {
    // 发布信息的方法
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
            buttonName="捐款"
          />
        </div>
        <div className={styles.recipientsRecord}>
          <TableList
            tableHeader={this.tableHeader}
            tableData = {this.state.transforHistory.slice(0,10)}
            sessionName={this.sessionName}
            refreshList={this.refreshList}
            type="remittee"
            plus="+"
            address={this.props.walletInfo.address}
          />
          <Pagiation
            config = {{
              totalPage: 3,
              paging: this.paging,
            }}
          />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTransforHistory: bindActionCreators(getTransforHistory, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HelpSeeker))
