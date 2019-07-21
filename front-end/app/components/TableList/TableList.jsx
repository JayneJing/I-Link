import React from 'react'
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './TableList.scss'

import Pagiation from '../Pagination/Pagination'

class TableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  moreClick = () => {
    // console.log(this.router)
  }
  render() {
    return (
      <div className={styles.tableWraper}>
        <div className={styles.tableContent}>
          {
            this.props.sessionName ? <div className={styles.sessionName}>{this.props.sessionName}</div> : null
          }
          <div className={styles.refresh} onClick={this.props.refreshList}> 刷新 </div>
          <div className={styles.tableList}>
            <table cellSpacing="0" cellPadding="0">
              <thead>
                <tr>
                  {
                    this.props.tableHeader.map((item, index) => {
                      return (
                        <th width={item.width} key={index}>{item.name}</th>
                      )
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {
                  this.props.tableData.map((item, index) => {
                    return (
                      <tr key={index} className={this.props.colorClass === "green" ? styles.green : this.props.colorClass === "red" ? styles.red : null}>
{/*                        {
                          Object.keys(item).map((item1,index1) => {
                            return (
                              item1 === "amount" ? <td key={index1}>{item[item1]} ont</td> : <td key={index1}>{item[item1]}</td>
                            )
                          })
                        }*/}
                        <td>{item.trans_time}</td>
                        <td><a href={"http://localhost:8080/transaction/"+item.txhash+"/testnet"}>{item.txhash}</a></td>
                        <td >{this.props.type === 'payer' ? item.payer : this.props.type === 'remittee' ? item.remittee :
                          item.payer === this.props.address ? item.remittee : item.payer}</td>
                        <td className={this.props.plus === '+' ? styles.green : this.props.plus === '-'? styles.red :
                          item.payer === this.props.address ? styles.red : styles.green}>
                            {this.props.plus === '-' ? "-"+item.amount : this.props.plus === '+' ? "+"+item.amount :
                            item.payer === this.props.address ? "-"+item.amount : "+"+item.amount}
                          </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        {
          !this.props.moreList &&
          <span className={styles.more} onClick={this.moreClick}>
            <NavLink
              to={{
                pathname: `/list`,
                search: `?name=${this.props.name}`,
              }}
            >了解更多 >></NavLink>
          </span>
        }
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TableList))
