// vendor
import React from 'react'
import echarts from 'echarts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import Proportion from './Proportion/Proportion'
import ProportionBar from './ProportionBar/ProportionBar'
import ProportionLine from './ProportionLine/ProportionLine'
import ReleaseHistory from '../ReleaseHistory/ReleaseHistory'

import {getRecipientProjectList} from "../../actions/recipient";

import styles from './Effect.scss'

class Effect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideNav: false,
      recipientProjectList:[],
    }
    this.list = [{"current_money":10.0,"id":2,"money":10000.0,"name":"Jayne","state":"Finish","title":"MASS","walletAddress":"A15NzM9iE3VT9X8SGk5h3dii6GPFQh2vme"},{"current_money":10.0,"id":2,"money":10000.0,"name":"Jayne","state":"Finish","title":"MASS","walletAddress":"A15NzM9iE3VT9X8SGk5h3dii6GPFQh2vme"},{"current_money":10.0,"id":2,"money":10000.0,"name":"Jayne","state":"Finish","title":"MASS","walletAddress":"A15NzM9iE3VT9X8SGk5h3dii6GPFQh2vme"},{"current_money":10.0,"id":2,"money":10000.0,"name":"Jayne","state":"Finish","title":"MASS","walletAddress":"A15NzM9iE3VT9X8SGk5h3dii6GPFQh2vme"},{"current_money":10.0,"id":2,"money":10000.0,"name":"Jayne","state":"Finish","title":"MASS","walletAddress":"A15NzM9iE3VT9X8SGk5h3dii6GPFQh2vme"},{"current_money":10.0,"id":2,"money":10000.0,"name":"Jayne","state":"Finish","title":"MASS","walletAddress":"A15NzM9iE3VT9X8SGk5h3dii6GPFQh2vme"},]
  }
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll.bind(this))
    const params = {
      type:'finish',
      // address: this.props.walletInfo.address
    }
    this.props.getRecipientProjectList(params)
  }
  componentWillReceiveProps = (nextProps) => {
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

  render() {
    return (
      <div className={styles.effectWrapper} style={this.state.hideNav ? { marginTop: '161px' } : { marginTop: '0' }}>
        <div className={styles.countWrapper}>
          <div className={styles.item}><p>捐赠总收入: </p><span>52100 <label>ont</label></span></div>
          <div className={styles.item}><p>助力总支出: </p><span>52100 <label>ont</label></span></div>
          <div className={styles.item}><p>助力落地总数: </p><span>52100 <label>个</label></span></div>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.HelpWrapper}>
            <div className={styles.helpPie}>
              <Proportion />
            </div>
            <div className={styles.helpList}>
              <div className={styles.listTit}>
                已落实项目
              </div>
              <div className={styles.listContent}>
                {
                  // this.state.recipientProjectList.map((item, index) => {
                  this.list.map((item, index) => {
                    return (
                      <ReleaseHistory info={item} key={index} type="small"/>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className={styles.barWrpper}>
            <ProportionBar />
          </div>
          <div className={styles.barWrpper}>
            <ProportionLine />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    walletInfo: state.wallet.walletInfo,
    recipientProjectList: state.recipient.recipientProjectList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipientProjectList: bindActionCreators(getRecipientProjectList, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Effect))
