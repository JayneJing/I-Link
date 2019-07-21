import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './Message.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      telnumber: '',
      info: '',
    }
  }
  telChange = (e) => {
    this.setState({
      telnumber: e.target.value,
    })
  }
  infoChage = (e) => {
    this.setState({
      info: e.target.value,
    }) 
  }
  render() {
    return (
      <div className={styles.wraper}>
        <div className={styles.top}>
          新 信 息
        </div>
        <div className={styles.receiver}>
          <label>收件人：</label>
          <input type="text" onChange={() => {this.telChange}} />
        </div>
        <div className={styles.infoWraper}>
        </div>
        <div className={styles.info}>
          <input type="text" onChange={() => {this.infoChage}} />
          <div className={styles.sendBtn}>发送</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login))
