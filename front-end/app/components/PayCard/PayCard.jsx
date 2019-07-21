import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import { cardPay } from '../../actions/login'

import styles from './PayCard.scss'

import CARD from './card.png'
import POS from './pos.png'
import CLOSE from '../DonationTemplate/close.png'
import BREAD from './bread.jpg'

class PayCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: '',
      password: '',
      showBoard: false,
      hideNav: false,
      costNumber: 8,
    }
  }
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll.bind(this))
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
  changeNumber = (e) => {
    this.setState({
      number: e.target.value,
    })
  }
  changePassword = () => {
    this.setState({
      password: e.target.value,
    })
  }
  payCard = () => {
    this.setState({
      showBoard: true,
    })
  }
  closeBord = () => {
    this.setState({
      showBoard: false,
    })
  }
  buy = () => {
    const params = {
      numbers: this.state.number,
      password: this.state.password,
      sy: sy,
    }
    this.props.cardPay(params)
    this.setState({
      showBoard: false,
    })
  }
  showBread = () => {
    // this.props.cardPayResult.num
    const breadArr = []
    for ( let i = 0 ; i < this.state.costNumber ; i++) {
      breadArr.push(<img src={BREAD} alt="" key={i}/>)
    }
    return breadArr
  }
  render() {
    return (
      <div className={styles.payCard} style={this.state.hideNav ? { marginTop: '180px' } : { marginTop: '50px' }}>
        <div className={styles.left}>
          <div className={styles.Card}>
            <img src={CARD} alt=""/>
          </div>
          <div className={styles.Pos}>
            <img src={POS} alt=""/>
          </div>
        </div>
       <div className={styles.right}>
          <div className={styles.number}>
            <label>购买数量（个）:</label>
            <input type="text" onChange={() => {this.changeNumber}}/>
            <p onClick={this.payCard}>刷卡</p>
          </div>
          <div className={styles.invoice}>
            <div className={styles.title}>发票凭据：</div>
            <div className={styles.content}>
              {
                this.showBread()
              }
            </div>
          </div>
       </div>
        {
          this.state.showBoard ? 
            <div className={styles.board}>
              <div className={styles.dialog}>
                <div className={styles.templateTop}>
                  <h1>购买</h1>
                </div>
                <span className={styles.closeBtn} onClick={this.closeBord}>
                  <img src={CLOSE}/>
                </span>
                <div className={styles.info}>
                  <div className={styles.password}>
                    <label>密码:</label>
                    <input type="password" onChange={() => {this.changePassword}}/>
                  </div>
                </div>
                <div className={styles.btnWraper}>
                  <p className={styles.submit} onClick={this.buy}>确定</p>
                </div>
              </div>
            </div>
            : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cardPayResult: state.login.cardPayResult,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cardPay: bindActionCreators(cardPay, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PayCard))
