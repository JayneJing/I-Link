import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './Pagination.scss'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startPage: 1,
      groupCount: 7,
      totalPage: this.props.config.totalPage || 1,
      pageCurr: this.props.config.pageCurr || 1,
    }
  }
  create = () => {
    const { startPage, groupCount, totalPage, pageCurr } = this.state
    let pages = []
    pages.push(
      <li
        key={0}
        className = { pageCurr === 1 ? styles.nomore : "" }
        onClick = {() => {this.goPrev()}}
      >
        上一页
      </li>
    )
    if (totalPage <= 10) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(
          <li
            onClick = {() => { this.go(i) }}
            className = { pageCurr === i ? styles.active : "" }
            key={i}
          >
            {i}
          </li>
        )
      }
    }else{
      for (let i = startPage; i <= groupCount + startPage; i ++) {
        if (i <= totalPage - 2) {
          pages.push(
            <li
              className = { pageCurr === i ? styles.active : ""}
              key={i}
              onClick = {() => {this.go(i)}}
            >
              {i}
            </li>
          )
        }
      }
      // 分页中间的省略号
      if (totalPage - startPage >= 9) {
        pages.push(<li className = { styles.ellipsis } key={ -1 }>···</li>)
      }
      // 倒数第一、第二页
      pages.push(
        <li
          className = { pageCurr === totalPage -1 ? styles.active : ""}
          key={ totalPage - 1 }
          onClick = {() => {this.go(totalPage - 1)}}
        >
          { totalPage -1 }
        </li>
      )
      pages.push(
        <li
          className = { pageCurr === totalPage ? styles.active : ""}
          key={ totalPage }
          onClick = {() => {this.go(totalPage)}}
        >
          { totalPage }
        </li>
      )
    }
    pages.push(
      <li
        key={totalPage + 1}
        className = { pageCurr === totalPage ? styles.nomore : "" }
        onClick = {() => {this.goNext()}}
      >
        下一页
      </li>
    )
    return pages
  }

  go = (pageCurr) => {
    const { groupCount, totalPage, startPage } = this.state
    // 计算 startPage
    this.setState({
      startPage: Math.floor(pageCurr / (groupCount+1)) * groupCount +1
    })
    // 最后几页重新计算 startPage
    if (totalPage - pageCurr < groupCount) {
      this.setState({
        startPage: totalPage - groupCount,
      })
    }
    // 设置当前页
    this.setState({
      pageCurr
    })
    this.props.config.paging(pageCurr)
  }

  goPrev = () => {
    let { pageCurr } = this.state
    if (--pageCurr === 0) {
      return
    }
    this.go(pageCurr)
  }

  goNext = () => {
    let { pageCurr } = this.state
    const { totalPage } = this.props.config
    if (++pageCurr > totalPage) {
        return
    }
    this.go(pageCurr)
  }

  render() {
    return (
      <div className = { styles.main }>
        <ul className = { styles.page }>
          {
            this.create()
          }
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Pagination))
