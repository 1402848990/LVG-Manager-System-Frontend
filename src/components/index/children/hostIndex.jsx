/**
 * 散点图表示此刻不同健康值下有多少主机
 */
import React from 'react';
import styles from '../index.scss';
import { Progress } from 'antd';
import { Scatter } from '@antv/g2plot';

class HostIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { healthy: '100', hostNum: 30, type: 'perfect' },
        { healthy: '90', hostNum: 40, type: 'perfect' },
        { healthy: '70', hostNum: 30, type: 'warn' },
        { healthy: '70', hostNum: 50, type: 'warn' },
        { healthy: '60', hostNum: 40, type: 'warn' },
        { healthy: '70', hostNum: 60, type: 'warn' },
        { healthy: '30', hostNum: 70, type: 'error' },
        { healthy: '10', hostNum: 90, type: 'error' },
        { healthy: '23', hostNum: 50, type: 'error' }
      ],
      scatterPlot: null
    };
    this.container = React.createRef();
  }

  componentDidMount() {
    this.state.scatterPlot = new Scatter(this.container.current, {
      data: this.state.data,
      xField: 'healthy',
      yField: 'hostNum',
      height: 280,
      forceFit: true,
      pointSize: 5,
      colorField: 'type',
      color: ['#009933', '#FF981D', 'red'],
      title: {
        visible: false,
        text: '实时虚拟机-健康状态分布图',
        style: {
          fontSize: 12,
          fill: 'black'
        }
      },
      meta: {
        hostNum: {
          alias: '台',
          formatter: v => {
            return `${v}`;
          }
        }
      },
      xAxis: {
        tickCount: 10,
        grid: {
          visible: false
        }
      },
      yAxis: {
        grid: {
          visible: false
        }
      },
      label: {
        visible: true
      },
      legend: {
        position: 'right-center'
      }
    });
    this.state.scatterPlot.render();
  }

  render() {
    return (
      <div className={styles.hostIndex}>
        <div ref={this.container} id='container'></div>
      </div>
    );
  }
}

export default HostIndex;
