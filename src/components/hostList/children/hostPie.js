import React from 'react';
import { Pie } from '@antv/g2plot';
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
  }

  componentDidMount() {
    this.renderPie();
  }

  renderPie = () => {
    const piePlot = new Pie(document.getElementById('container'), {
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
      color: ['#20a53a', '#ff4d4f', 'rgb(100, 118, 151)'],
      label: {
        visible: true,
        type: 'spider'
      }
    });
    piePlot.render();
  };

  render() {
    return (
      <div className={styles.hostPie}>
        <div id='container'></div>
      </div>
    );
  }
}

export default HostPie;
