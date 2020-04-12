import React from 'react';
import { AreaChart } from 'bizcharts-plot';
import styles from '../index.scss';

class Ram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <div className={styles.plotList}>
        {/* 网络监控 */}
        <AreaChart
          data={this.props.netData}
          padding='auto'
          title={{
            text: '网络上行下行速度历史监控'
          }}
          description={{
            text: '本监控为此主机网络使用率历史数据'
          }}
          xField='createdAt'
          yField='speed'
          stackField='type'
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
          animate={true}
          animation={{
            update: 'fadeIn'
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
