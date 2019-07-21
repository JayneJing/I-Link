import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './RecipientSuccessTemplate.scss'

class RecipientSuccessTemplate extends React.Component {
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
        <span className={styles.closeBtn} onClick={this.closeBord}>x</span>
        <h1>发布成功</h1>
        <div className={styles.info}>
          <div>
            <label>您的申请已经成功发布，请耐心等待。</label>
          </div>
        </div>
        <div className={styles.submit} onClick={this.closeBord}>确定</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RecipientSuccessTemplate))
