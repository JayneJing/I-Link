import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import successImg from './success.png'

import styles from './TransactionSuccessTemplate.scss'

class TransactionSuccessTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  closeBord = () => {
    this.props.hideBord(false)
  }

  render() {
    return (
      <div className={styles.templateWraper}>
        <div className={styles.success}>
          <img src={successImg} alt=""/>
          <h3>捐款成功</h3>
        </div>
        <div className={styles.info}>
          <div>
            <h3 style={{ color: '#367abd', marginBottom: '40px', }}>感谢您的爱心助力!</h3>
            <p style={{ color: '#367abd', marginBottom: '20px' }}>交易哈希：</p>
            <div className={styles.hashText} style={{ color: '#666', cursor: 'pointer', marginBottom: '60px' }}>
              {this.props.transactionHash}</div>
          </div>
          <div className={styles.submit} onClick={this.closeBord}>确定</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TransactionSuccessTemplate))
