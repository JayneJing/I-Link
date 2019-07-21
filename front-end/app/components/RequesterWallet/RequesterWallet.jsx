import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'

import styles from './RequesterWallet.scss'
import {register} from "../../actions/login";

class RequesterWallet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      money:'',
      img:'',
      title:'',
    }
  }
  setMoney = (e) => {
    this.setState({
      money: e.target.value,
    })
  }
  setImg = (e) => {
    this.setState({
      img: e.target.value,
    })
  }
  setText = (e) => {
    this.setState({
      title: e.target.value,
    })
  }
  submmit = () => {
    console.log(this.state)
  }
  render() {
    return (
      <div className={styles.content}>
        <h1>发布捐助信息</h1>
        <h2>钱包地址: xxxxxxxxxxxxxxxxxxxxxxx</h2>
        <h2>
          筹款数量:
          <input type="text" placeholder="筹款金额" onChange={this.setMoney}/>Ont
        </h2>
        <div className={styles.upload}>
          <input type="file" name='file' id='file' onChange={this.setImg}/>
          <label for="file">视频/照片上传</label>
          <span>Title</span>
          <div className={styles.img}>
            <img src="" id='show' alt=""/>
            <textarea name="" id="" cols="30" rows="10" onChange={this.setText}></textarea>
          </div>
          <p onClick={this.submmit}>发布</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RequesterWallet))
