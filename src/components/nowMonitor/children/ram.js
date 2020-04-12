import React from 'react';
import { LineChart } from 'bizcharts-plot';
import styles from '../index.scss';

class Ram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.ws = React.createRef();
  }

  render() {
    return (
      <div className={styles.plotList}>
        {/* 内存监控 */}
        <LineChart
          data={this.props.cpuData}
          padding='auto'
          title={{
            text: '内存使用率历史监控'
          }}
          description={{
            text: '本监控为此主机内存使用率历史数据'
          }}
          xField='createdAt'
          yField='ramUsed'
          xAxis={{
            visible: true,
            label: {
              autoHide: true
            }
          }}
          yAxis={{
            color: 'red',
            min: 0,
            max: 100,
            label: {
              formatter: v => `${v}%`
            }
          }}
          lineStyle={{
            lineWidth: 2,
            stroke: '#20a53a'
          }}
          // 动画
          animation={{
            type: 'clipingWithData'
          }}
          smooth
          slider={{}}
          height={400}
          forceFit
        />
      </div>
    );
  }
}

export default Ram;
