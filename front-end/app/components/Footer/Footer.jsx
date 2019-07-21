import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './Footer.scss'

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={styles.footerWraper}>
        <div className={styles.footerInfo}>
          <ul>
            <li>合作伙伴</li>
            <li>我们的工作</li>
            <li>联系我们</li>
            <li>支持我们</li>
            <li>新闻资讯</li>
          </ul>
          <ul>
            <li>亲子指南</li>
            <li>童享健康</li>
            <li>一生平安</li>
            <li>成长早期很重要</li>
          </ul>
          <div>
            <span>官方微博</span>
            <span>微信公众号</span>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Footer))
