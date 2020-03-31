import React from 'react';
import {
  Chart,
  Tooltip,
  Axis,
  Legend,
  SmoothLine,
  Point,
  Slider,
  Plugin
} from 'viser-react';
import { AreaChart } from 'bizcharts-plot';
import { Row, Col } from 'antd';
import styles from '../index.scss';

const scale = [
  {
    dataKey: 'month',
    alias: '月份'
  },
  {
    dataKey: 'value',
    alias: '数值'
  },
  {
    dataKey: 'type',
    type: 'cat'
  }
];

class PoltList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    const res = await fetch(
      'https://g2plot.antv.vision/zh/examples/data/sales.json'
    );
    const res3 = await fetch(
      'https://g2plot.antv.vision/zh/examples/data/oil.json'
    );
    const d = await res.json();
    const d3 = await res3.json();
    await this.setState(
      {
        data: d,
        data3: d3
      },
      () => {
        console.log(this.state);
      }
    );
  }

  render() {
    return (
      <div className={styles.plotList}>
        <Row justify='space-between' className={styles.row}>
          {/* CPU */}
          <Col className={styles.col} span={11}>
            <AreaChart
              data={this.state.data}
              padding='auto'
              title={{
                text: 'CPU使用率监控详情'
              }}
              description={{
                text: '本监控为一周前至今CPU使用率监控'
              }}
              xField='城市'
              yField='销售额'
              xAxis={{
                visible: true,
                label: {
                  autoHide: true
                }
              }}
              yAxis={{
                label: {
                  // 数值格式化为千分位
                  formatter: v =>
                    `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`)
                }
              }}
              slider={{
                start: '常熟市',
                end: '江口'
              }}
              forceFit
            />
          </Col>
          {/* 内存 */}
          <Col className={styles.col} span={11}>
            <AreaChart
              data={this.state.data}
              padding='auto'
              title={{
                text: 'CPU使用率监控详情'
              }}
              description={{
                text: '本监控为一周前至今CPU使用率监控'
              }}
              xField='城市'
              yField='销售额'
              xAxis={{
                visible: true,
                label: {
                  autoHide: true
                }
              }}
              yAxis={{
                label: {
                  // 数值格式化为千分位
                  formatter: v =>
                    `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`)
                }
              }}
              slider={{
                start: '常熟市',
                end: '江口'
              }}
              forceFit
            />
          </Col>
        </Row>
        <Row justify='space-around'>
          <Col className={styles.col} span={11}>
            <AreaChart
              padding='auto'
              data={this.state.data3}
              title='近期网络速率'
              xField='date'
              yField='value'
              stackField='country'
              colors={[
                '#6897a7',
                '#8bc0d6',
                '#60d7a7',
                '#dedede',
                '#fedca9',
                '#fab36f',
                '#d96d6f'
              ]}
              xAxis={{
                type: 'time',
                tickCount: 5
              }}
              legend={{
                visible: true,
                position: 'right-top'
              }}
              smooth
              forceFit
              slider={{
                start: '1970',
                end: '2012'
              }}
            />
          </Col>
          <Col className={styles.col} span={11}></Col>
        </Row>
      </div>
    );
  }
}

export default PoltList;
