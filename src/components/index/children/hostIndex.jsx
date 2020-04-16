/**
 * 散点图表示此刻不同健康值下有多少主机
 */
import React from 'react';
import styles from '../index.scss';
import Websocket from 'react-websocket';
import { Spin } from 'antd';
import { Scatter } from '@antv/g2plot';

let cpu = 0;
let gpu = 0;
let ram = 0;
let up = 0;
let down = 0;

class HostIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cpuData: [],
      netData: [],
      scatterPlot: null
    };
    this.container = React.createRef();
  }

  componentDidMount() {
    // init 主机健康值分布散点图
    this.state.scatterPlot = new Scatter(this.container.current, {
      data: this.state.data,
      xField: 'healthy',
      yField: 'hostNum',
      height: 276,
      forceFit: true,
      pointSize: 5,
      colorField: 'type',
      color: type => {
        return type === 'perfect'
          ? '#009933'
          : type === 'warn'
          ? '#FF981D'
          : 'red';
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
        // tickCount: 10,
        tickInterval: 5,
        grid: {
          visible: false
        }
      },
      yAxis: {
        min: 0,
        max: 20,
        tickCount: 10,
        tickInterval: 2,
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

  handleCpuData = async data => {
    // 基础数据存入state中
    await this.setState(
      {
        cpuData: (data && !data.includes('连接成功') && JSON.parse(data)) || {}
      }
    );
  };

  handleNetData = async data => {
    // NET数据存入state中
    await this.setState(
      {
        netData: (data && !data.includes('连接成功') && JSON.parse(data)) || {}
      },
      () => {
        this.refresh();
      }
    );
  };

  // 查找重复健康值及其个数
  countNum = arr => {
    const _res = [];
    arr.sort();
    for (let i = 0; i < arr.length; ) {
      let count = 0;
      for (let j = i; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
          count++;
        }
      }
      _res.push([arr[i], count]);
      i += count;
    }
    return _res;
  };

  // 更新数据
  refresh = async () => {
    const { allHost } = this.props;
    const { cpuData, netData } = this.state;
    const list = [];
    allHost.map(item => {
      const { cDiskUsed = 0.2, netWidth } = item;
      if (cpuData.length > 0) {
        cpuData.map(data => {
          if (item.id === data.hid) {
            cpu = data.used;
            ram = data.ramUsed;
            gpu = data.gpuUsed;
          }
        });
      }
      if (netData.length > 0) {
        netData.map(data => {
          if (item.id === data.hid) {
            up = data.up;
            down = data.down;
          }
        });
      }
      const netUsed = up / (netWidth * 1024) / 8;
      const healthy =
        100 -
        Math.floor(
          ram * 0.4 +
            cpu * 0.26 +
            netUsed * 0.15 +
            cDiskUsed * 0.15 +
            gpu * 0.04
        );

      list.push(healthy);
    });
    const count = this.countNum(list);

    const data = count.map(item => {
      return {
        healthy: item[0],
        hostNum: item[1],
        type: item[0] > 80 ? 'perfect' : item[0] > 60 ? 'warn' : 'error'
      };
    });
    this.state.scatterPlot.changeData(data);
  };

  render() {
    return (
      <div className={styles.hostIndex}>
        <Websocket
          url='ws://localhost:8088/CpuWs'
          onMessage={this.handleCpuData}
          reconnectIntervalInMilliSeconds={10000}
          sendMessage='111'
          ref={this.ws}
        />
        <Websocket
          url='ws://localhost:8088/NetWs'
          onMessage={this.handleNetData}
          reconnectIntervalInMilliSeconds={10000}
          sendMessage='net'
        />
        <Spin
          spinning={this.state.cpuData.length === 0}
          tip='主机健康值分布加载中...'
        >
          <div style={{ top: '5px' }} ref={this.container} id='container'></div>
        </Spin>
      </div>
    );
  }
}

export default HostIndex;
