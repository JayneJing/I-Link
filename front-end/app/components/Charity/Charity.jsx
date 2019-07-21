import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import UserInfo from '../UserInfo/UserInfo'
import TableList from '../TableList/TableList'
import Account from '../Account/Account'
import Pagiation from '../Pagination/Pagination'
import ReleaseHistory from '../ReleaseHistory/ReleaseHistory'

import styles from './Charity.scss'
import {getTransforHistory} from "../../actions/wallet";
import { getAllApplyProjectList } from "../../actions/recipient"

class Charity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideNav: false,
      transforHistory:[],
    }
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
    this.sessionName = '交易记录'
  }
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll.bind(this))
    this.refreshList()
    const params = {
      address: this.props.walletInfo.address,
      type: "create",
    }
    this.props.getAllApplyProjectList(params)
  }
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.transforHistory !== nextProps.transforHistory) {
      this.setState({transforHistory: nextProps.transforHistory})
    }
  }
  refreshList = () => {
    this.props.getTransforHistory(this.props.walletInfo.address,'all')
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
    //console.log(pageCurr)
    // 获取受捐记录的数据（根据页数）
  }
  changeApplyProjectList = () => {
    const params = {
      address: this.props.walletInfo.address,
      type: "create",
    }
    this.props.getAllApplyProjectList(params)
  }
  toBreadContract = () => {
    this.props.history.push('/provider/breadContract')
  }
  render() {
    return (
      <div className={styles.charityWraper} style={this.state.hideNav ? { marginTop: '161px' } : { marginTop: '0' }}>
        <div className={styles.charityInfoBox}>
          <div className={styles.charityInfo}>
            <UserInfo userInfo={this.userInfo} />
          </div>
          <div className={styles.charityActive}>
            <Account
              buttonName="爱心助力"
              buttonName2="转给机构"
              toBreadContract={this.toBreadContract}
            />
          </div>
        </div>
        {
          this.props.personalInfo.role && this.props.personalInfo.role === "charity" && this.props.allApplyProjectList.length > 0 ?
            <div className={styles.checkWraper}>
              <p>审核申请</p>
              <div className={styles.releaseHistory}>
                {
                  this.props.allApplyProjectList.map((item, index) => {
                    return (
                      <ReleaseHistory info={item} key={index} changeApplyProjectList={this.changeApplyProjectList} charity />
                    )
                  })
                }
              </div>
            </div> :
            null
        }
        <div className={styles.charityList}>
          <TableList
            tableHeader={this.tableHeader}
            tableData = {this.state.transforHistory.slice(0,10)}
            sessionName={this.sessionName}
            refreshList={this.refreshList}
            type="all"
            plus="all"
            address={this.props.walletInfo.address}
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
    allApplyProjectList: state.recipient.allApplyProjectList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTransforHistory: bindActionCreators(getTransforHistory, dispatch),
    getAllApplyProjectList: bindActionCreators(getAllApplyProjectList, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Charity))
