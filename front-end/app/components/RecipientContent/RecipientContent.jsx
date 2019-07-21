import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './RecipientContent.scss'

import PIC1 from './pic1.jpeg'
import PIC2 from './pic2.jpeg'
import {getTransforHistory} from "../../actions/wallet";
import {getRecipientProjectContent} from "../../actions/recipient";

class RecipientContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipientContent: ''
    }
    this.recipientInfo = {
      title: '联合国儿童基金会大使王源探访云南沧源',
      money: 13000,
      walletAddress: '09e599ecde6eec18608bdecd0cf0a54b02b',
      content: '各位好心人大家好！ 他叫童文斌，2019年01月31日，我得知他不幸被检查出得了白血病，后续治疗需要200000元。 我知道他还有很多想做的事没做，他一直是一个积极向上、热爱生活的人，他对家人关爱，对朋友关心，他人生的道路应该还很长，他身边每个人都不希望他离开这个世界。 他在北医三院接受治疗已经有一段时间了，他现在也每天都严格按照医生的叮嘱好好吃药，顽强的对抗病魔。他说他想活下去。 希望大家可以伸出援手，让他有条件继续接受治疗，尽快好起来，家人和朋友都在等着他康复，谢谢你们了！我们急需您的帮助！望好心人士伸手相助，多一份转发就多一份希望，接力点亮生命的希望之光!'
    }
  }
  componentDidMount = () => {
    const params = {
      project_id:this.props.match.params.id
    }
    this.props.getRecipientProjectContent(params)
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.recipientContent !== nextProps.recipientContent) {
      this.setState({recipientContent: nextProps.recipientContent})
    }
  }
  render() {
    const recipientContent = this.state.recipientContent
    return (
      <div className={styles.content}>
        <div className={styles.title}>
          {recipientContent? recipientContent.title :''}
        </div>
        <div className={styles.contentTop}>
          <div className={styles.raiseMoney}>
            <span>筹款金额：</span>
            <span className={styles.number}>{recipientContent? recipientContent.money :''}</span>
            <span>ont</span>
          </div>
          <div className={styles.walletAddress}>
            <span>钱包地址：</span>
            <span className={styles.address}>{recipientContent? recipientContent.walletAddress :''}</span>
          </div>
        </div>
        <div className={styles.contentBottom}>
          <p className={styles.reasonTitle}>求助心声</p>
          <div className={styles.reasonDespict}>
            {recipientContent? recipientContent.content :''}
          </div>
          <div className={styles.imgs}>
            <img src={PIC1} alt=""/>
            <img src={PIC2} alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    recipientContent: state.recipient.recipientContent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipientProjectContent: bindActionCreators(getRecipientProjectContent, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RecipientContent))
