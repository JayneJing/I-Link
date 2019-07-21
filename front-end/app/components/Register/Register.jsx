import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'

import styles from './Register.scss'
import {register} from "../../actions/login";

//  wallet_address this.props.walletInfo.address
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roler: 'donator',
      wallet_address: this.props.walletInfo.address,
    }
    this.role = [
      {
        rolerCN: '捐助者',
        rolerEN: 'donator',
      },
      {
        rolerCN: '求助者',
        rolerEN: 'recipient',
      },
    ]
  }

  roleChecked = (roler) => {
    this.setState({
      roler,
    })
  }

  submit = () => {
    console.log(this.state.wallet_address)
    console.log(this.nameChange.value)
    console.log(this.sexChange.value)
    console.log(this.occupationChange.value)
    console.log(this.phoneChange.value)
    console.log(this.addressChange.value)
    console.log(this.state.roler)
    const personalInfo = {
      name:this.nameChange.value,
      role:this.state.roler,
      gender:this.sexChange.value,
      profession: this.occupationChange.value,
      phone: this.phoneChange.value,
      wallet_address: this.state.wallet_address,
      address:this.addressChange.value,
    }
    // const personalInfo = {
    //   name:'Jayne',
    //   role:'donator',
    //   gender:'女',
    //   profession: '程序员',
    //   phone: '13145645876',
    //   wallet_address: 'AL6YBSSi9rJwkxSHc3K6tq8Ze53Nji4aRP',
    //   address:'北京市海淀区',
    // }
    this.props.register(personalInfo)
  }
  setDonateTrue = () => {
    this.setState({
      donate: true,
      role:'donator',
      account: '',
      name: '',
      sex: '',
      job: '',
      contact: '',
      address: '',
    })
  }
  setDonateFalse = () => {
    this.setState({
      donate: false,
      role:'recipient',
      account: '',
      name: '',
      sex: '',
      job: '',
      contact: '',
      address: '',
    })
  }
  render() {
    return (
      <div className={styles.content}>
        <div className={styles.title}>
          {
            this.role.map((item, index) => {
              return(
                <div
                  key={index}
                  className={classNames({
                    [styles.roleSelect]: true,
                    [styles.checked]: this.state.roler == item.rolerEN,
                  })}
                  onClick={() => {this.roleChecked(item.rolerEN)}}
                >
                  {item.rolerCN}
                </div>
              )
            })
          }
        </div>
        <div className={styles.form}>
          <div className={styles.info}>
            <div className={styles.group}><label>账户:</label><span>{this.state.wallet_address}</span></div>
            <div className={styles.group}><label>姓名:</label><input type="text" placeholder="请输入您姓名" ref={input => this.nameChange = input} /></div>
            <div className={styles.group}><label>性别:</label><input type="text" placeholder="请输入您的性别" ref={input => this.sexChange = input} /></div>
            <div className={styles.group}><label>职业:</label><input type="text" placeholder="请输入您的职业" ref={input => this.occupationChange = input} /></div>
            <div className={styles.group}><label>联系方式:</label><input type="text" placeholder="请输入您的联系方式" ref={input => this.phoneChange = input} /></div>
            <div className={styles.group}><label>联系地址:</label><input type="text" placeholder="请输入您的住址" ref={input => this.addressChange = input} /></div>
          </div>
          <div className={styles.upload}>
            <h3>上传头像:</h3>
            <div className={styles.uploadBtn}>请选择文件</div>
            <div className={styles.showImg}>
              <img src="" alt="Image preview..."/>
            </div>
          </div>
        </div>
        <div className={styles.submit} onClick={() => this.submit()}>登录</div>
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
    register: bindActionCreators(register, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Register))
