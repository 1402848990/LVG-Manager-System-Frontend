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
        {/* GPU监控 */}
        <AreaChart
          loading={!this.props.cpuData}
          data={this.props.cpuData}
          padding='auto'
          title={{
            text: 'GPU使用率历史监控详情'
          }}
          description={{
            text: '本监控为至今GPU使用率监控'
          }}
          xField='createdAt'
          yField='gpuUsed'
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
          slider={{}}
          height={400}
          forceFit
        />
      </div>
    );
  }
}

export default Cpu;
