import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'
import { parseURLQuery } from '../../Utils/Utils'
import {getTransforHistory} from "../../actions/wallet";
import {CHARITY_ADDRESS,ACTUATOR_ADDRESS,PROVIDER_ADDRESS} from '../../constants/Address'

import TableList from '../TableList/TableList'

import styles from './MoreDetailsListBoard.scss'

class MoreDetailsListBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideNav: false,
      name: null,
      data: [],
    }
    this.sessionName = ''
    this.tableHeader1 = [
      {
        name: '爱心时间',
        width: '',
      },
      {
        name: '交易哈希',
        width: '',
      },
      {
        name: '地址',
        width: '',
      },
      {
        name: '数量',
        width: '',
      },
    ]
  }

  componentWillMount = () => {
    this.setState({
      name: parseURLQuery().name
    })
  }
  componentDidMount = () => {
    const name = parseURLQuery().name
    switch (name) {
      case 'donator':
        this.sessionName = '捐款记录'
        this.setState({data:this.props.transforHistoryForCharity})
        break
      case 'recipient':
          this.sessionName = '受捐记录'
        this.setState({data:this.props.transforHistoryForVested})
        break
      case 'charity':
          this.sessionName = '慈善机构交易面板'
        this.setState({data:this.props.transforHistoryForCharity})
        break
      case 'actuator':
          this.sessionName = '执行机构交易面板'
        this.setState({data:this.props.transforHistoryForActuator})
        break
      case 'provider':
          this.sessionName = '供应商交易面板'
        this.setState({data:this.props.transforHistoryForProvider})
        break
      default:
        break
    }
    window.addEventListener('scroll', this.handleScroll.bind(this))
    // this.props.getTransforHistory(CHARITY_ADDRESS,'remittee',name)
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.transforHistoryForDonator !== nextProps.transforHistoryForDonator) {
      this.setState({data: nextProps.transforHistoryForDonator})
    }
    if (this.props.transforHistoryForCharity !== nextProps.transforHistoryForCharity) {
      this.setState({data: nextProps.transforHistoryForCharity})
    }
    if (this.props.transforHistoryForActuator !== nextProps.transforHistoryForActuator) {
      this.setState({data: nextProps.transforHistoryForActuator})
    }
    if (this.props.transforHistoryForProvider !== nextProps.transforHistoryForProvider) {
      this.setState({data: nextProps.transforHistoryForProvider})
    }
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
  refreshList1 = () => {
    // this.state.name 表示角色 下面第三个参数
    // this.props.getTransforHistory(CHARITY_ADDRESS,'remittee','donator')
    // this.props.getTransforHistory(CHARITY_ADDRESS,'all','charity')
    // this.props.getTransforHistory(ACTUATOR_ADDRESS,'all','actuator')
    // this.props.getTransforHistory(PROVIDER_ADDRESS,'all','provider')
  }
  render() {
    return (
      <div className={styles.listWraper} style={this.state.hideNav ? { marginTop: '161px' } : { marginTop: '0' }}>
        <TableList
          tableHeader={this.tableHeader1}
          tableData = {this.state.data}
          sessionName={this.sessionName}
          refreshList={this.refreshList1}
          type={parseURLQuery().name === "donator" ? "payer" :"all"}
          plus={parseURLQuery().name === "donator" ? "-" :"all"}
          address={CHARITY_ADDRESS}
          moreList={true}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transforHistoryForDonator: state.wallet.transforHistoryForDonator,
    transforHistoryForVested: state.wallet.transforHistoryForVested,
    transforHistoryForCharity:state.wallet.transforHistoryForCharity,
    transforHistoryForActuator:state.wallet.transforHistoryForActuator,
    transforHistoryForProvider:state.wallet.transforHistoryForProvider,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTransforHistory: bindActionCreators(getTransforHistory, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MoreDetailsListBoard))
