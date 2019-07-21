// vendor
import React from 'react'
import echarts from 'echarts'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import styles from './ProportionLine.scss'

class ProportionLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.time= ['2019-02', '2019-03', '2019-04', '2019-05', '2019-06', '2019-07']
    this.donatorData = [2394, 2671, 3129, 2765, 3204, 1983]
    this.recipientData = [1892, 2348, 2873, 2918, 3017, 2841]
  }
  componentDidMount = () => {
    this.myChart = echarts.init(this.ProportionLine)
    this.renderData()
    window.addEventListener('resize', this.resizeChart)
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resizeChart)
  }
  resizeChart = () => {
    this.myChart.resize()
  }
  renderData = () => {
    const option = {
    title : {
        text: '捐款人数与受益人数增长趋势',
        x: 'center',
        align: 'right'
    },
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.time,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [ // （可以有多个坐标轴），数组中的对象位置决定了yAxisIndex的值（yAxisIndex会在series中用到）
        {
          type: 'value', // 表示属性为value类
          scale: true,
          minInterval: 1, // 坐标最小划分单位，设置为1表示坐标轴节点保留整数
          splitNumber: 4, // 指定坐标轴节点分割数（非强制），会按照预算自行调整最合适的分割数
          yAxisIndex: 0,
          axisLine: { // 表示坐标轴是否显示
            show: true,
          },
          axisTick: false,
          position: 'left',
          splitLine: { // 表示分割线属性设置
            lineStyle: { // 表示分割线的样式
              type: 'solid',
            },
          },
          axisLabel: {
            formatter: '{value} ', // 表示所有值得单位
          },
        },
      ],
      series: [
          {
              name: '收入',
              type: 'line',
              data: this.donatorData,
          },
          {
            name: '支出',
            type: 'line',
            data: this.recipientData,
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
          ref={(input) => { this.ProportionLine = input }}
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
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ProportionLine))
