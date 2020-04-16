import React from 'react';
import { LineChart } from 'bizcharts-plot';
import styles from '../index.scss';

class Disk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <div className={styles.plotList}>
        {/* 磁盘 */}
        <LineChart
          loading={!this.props.diskData}
          data={this.props.diskData}
          padding='auto'
          title={{
            text: '磁盘读写数据历史监控'
          }}
          description={{
            text: '本监控为此主机磁盘读写速度历史数据'
          }}
          xField='createdAt'
          yField='speed'
          seriesField='type'
          xAxis={{
            visible: true,
            label: {
              autoHide: true
            }
          }}
          colors={['#ff7f0e', '#2ca02c']}
          yAxis={{}}
          legend={{
            visible: true,
            position: 'top'
          }}
          // lineStyle={{
          //   lineWidth: 2,
          //   stroke: 'red'
          // }}
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

export default Disk;
