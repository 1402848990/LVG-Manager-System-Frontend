import React from 'react';
import { AreaChart } from 'bizcharts-plot';
import styles from '../index.scss';

class Cpu extends React.Component {
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
        {/* CPU监控 */}
        <AreaChart
          data={this.props.cpuData}
          padding='auto'
          title={{
            text: 'CPU使用率历史监控'
          }}
          description={{
            text: '本监控为此主机CPU使用率历史数据'
          }}
          tooltip={{
            string: 'cross'
          }}
          xField='createdAt'
          yField='used'
          xAxis={{
            visible: true,
            label: {
              autoHide: true
            }
          }}
          yAxis={{
            min: 0,
            max: 100,
            label: {
              formatter: v => `${v}%`
            }
          }}
          areaStyle={{
            strokeStyle: 'red'
          }}
          slider={{}}
          height={400}
          forceFit
        />
      </div>
    );
  }
}

export default Cpu;
