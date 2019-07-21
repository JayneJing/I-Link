import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'

import styles from './UserInfo.scss'
import {getPersonalInfo} from "../../actions/login";
// Beneficiary 非洲儿童
import Beneficiary1 from "./img/Beneficiary1.jpg"
import Beneficiary2 from "./img/Beneficiary2.jpg"
import Beneficiary3 from "./img/Beneficiary3.jpg"
// 慈善机构
import helpRoxiWalk from "./img/helpRoxiWalk.png"
import knitForLife from "./img/knitForLife.png"
import prayer from "./img/prayer.png"
// 侯旭辉
import houxh1 from "./img/houxh1.jpeg"
import houxh2 from "./img/houxh2.jpeg"
import houxh3 from "./img/houxh3.jpeg"
// import PHOTO from './photo.jpg'
// gender: "女"
// homeAddress: "北京市海淀区"
// name: "Jayne"
// phone: "13145645876"
// profession: "程序员"
// role: "donator"
// walletAddress: "AL6YBSSi9rJwkxSHc3K6tq8Zy53Nji4aRP"
class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      personalInfo: '',
      headImg: '',
    }
    this.Beneficiary = [Beneficiary1, Beneficiary2, Beneficiary3]
    this.Charity = [helpRoxiWalk, knitForLife, prayer]
    this.houxh = [houxh1, houxh2, houxh3]
  }
  componentDidMount = () => {
    this.props.getPersonalInfo(this.props.walletInfo.address,this.props.walletInfo.role,)
   
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.personalInfo !== nextProps.personalInfo) {
      this.setState({personalInfo: nextProps.personalInfo})
      switch(nextProps.personalInfo.role) {
        case 'recipient':
            this.setState({
              headImg: this.Beneficiary[Math.floor(Math.random()*3)],
            })
          break
        case 'charity':
          this.setState({
            headImg: this.Charity[0],
          })
          break
        case 'provider':
          this.setState({
            headImg: this.Charity[1],
          })
          break
        case 'actuator':
          this.setState({
            headImg: this.Charity[2],
          })
          break
        case 'donator':
          this.setState({
            headImg: this.houxh[Math.floor(Math.random()*3)]
          })
          break
        default:
          break
      }
    }
  }
  render() {
    return (
      <div className={styles.user}>
        <div className={styles.photoWraper}>
          <img
            src={this.state.headImg}
            alt=""
            className={classNames({
              [styles.photo]: true,
              [styles.photoCharity]: this.state.personalInfo.role === 'charity' || this.state.personalInfo.role === 'provider' || this.state.personalInfo.role === 'actuator',
            })}
          />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.edit}>
            <span>编辑</span>
          </div>
          <p>
            <span>名称:</span>
            <span>{this.state.personalInfo.name}</span>
          </p>
          {
            (this.state.personalInfo.role === 'donator' || this.state.personalInfo.role === 'recipient') &&
            <div>
              <p>
                <span>性别:</span>
                <span>{this.state.personalInfo.gender}</span>
              </p>
              <p>
                <span>职业:</span>
                <span>{this.state.personalInfo.profession}</span>
              </p>
            </div>
          }
          {
            (this.state.personalInfo.role === 'Charity' || this.state.personalInfo.role === 'provider' || this.state.personalInfo.role === 'actuator') &&
            <div className={styles.description}>
              <span>机构描述:</span>
              <span className={styles.descriptionInfo}>{this.state.personalInfo.description}</span>
            </div>
          }
          <p>
            <span>联系方式:</span>
            <span>{this.state.personalInfo.phone}</span>
          </p>
          <p>
            <span>地址:</span>
            <span>{this.state.personalInfo.homeAddress}</span>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    walletInfo: state.wallet.walletInfo,
    personalInfo: state.login.personalInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonalInfo: bindActionCreators(getPersonalInfo, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserInfo))
