import React from 'react';
import { Pie } from '@antv/g2plot';
import { countNum } from '@/utils/index';
import styles from '../index.scss';

class HostPie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          type: '正常',
          value: 27
        },
        {
          type: '告警',
          value: 25
        },
        {
          type: '关机',
          value: 18
        }
      ]
    };
    this.piePlot = null;
  }

  componentDidMount() {
    this.renderPie();
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    // 所有主机的状态
    const stateList = nextProps.allHost.map(item => item.state);
    // 不同状态主机的数量
    const stateAndNum = countNum(stateList);
    const data = stateAndNum.map(item => {
      return {
        type: item[0] === 1 ? '正常' : item[0] === 0 ? '关机' : '告警',
        value: item[1]
      };
    });
    this.piePlot ? this.piePlot.changeData(data) : null;
    // await this.setState(
    //   {
    //     data
    //   },
    //   () => {
    //     console.log(this.state);
    //   }
    // );
  }

  componentWillUnmount() {
    this.piePlot.destroy();
  }

  renderPie = () => {
    this.piePlot = new Pie(document.getElementById('containers'), {
      forceFit: true,
      title: {
        visible: true,
        text: '所有主机情况概览'
      },
      description: {
        visible: true,
        text: '正常、告警、关机的主机数量'
      },
      radius: 0.8,
      data: this.state.data,
      angleField: 'value',
      colorField: 'type',
      color: state => {
        return state === '正常'
          ? '#20a53a'
          : state === '关机'
          ? 'rgb(100, 118, 151)'
          : '#ff4d4f';
      },
      label: {
        visible: true,
        type: 'spider'
      }
    });
    this.piePlot.render();
  };

  render() {
    return (
      <div className={styles.hostPie}>
        <div id='containers'></div>
      </div>
    );
  }
}

export default HostPie;
