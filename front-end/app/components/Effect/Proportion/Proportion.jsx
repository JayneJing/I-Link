// vendor
import React from 'react'
import echarts from 'echarts'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './Proportion.scss'

class Proportion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount = () => {
    this.myChart = echarts.init(this.Proportion)
    this.renderData()
    window.addEventListener('resize', this.resizeChart)
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resizeChart)
  }
  resizeChart = () => {
    this.myChart.resize()
  }
  renderData = (data) => {
    const option = {
    title : {
        text: '款项落实比例',
        x: 'center',
        align: 'right'
    },
      color: ['#3398DB'],
      tooltip: {
        // trigger: 'axis',
        // axisPointer: { // 坐标轴指示器，坐标轴触发有效
        //   type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        // },
        // formatter: "{b} : {c} ({d}%)"
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
      },
      series: [
        {
          name: '收入与助力',
          type: 'pie',
          stack: 'claim',
          data: [
            { value: 335333, name: '剩余额度' },
            { value: 610569, name: '落实额度' },
          ],
        },
      ],
    }
    this.myChart.clear()
    this.myChart.setOption(option)
  }
  render() {
    return (
      <div>
        <div
          className={styles.wrapper}
          ref={(input) => { this.Proportion = input }}
          style={{ width: '100%', height: 300 }}
        />
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
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Proportion))
