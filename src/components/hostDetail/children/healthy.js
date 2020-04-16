import {
  registerShape,
  Chart,
  Axis,
  Tooltip,
  Coord,
  Point,
  Guide,
  Series
} from 'viser-react';
import * as React from 'react';
import styles from '../index.scss';

registerShape('point', 'pointer', {
  draw(cfg, container) {
    let point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint(point);
    const center = this.parsePoint({
      // 获取极坐标系下画布中心点
      x: 0,
      y: 0
    });
    // 绘制指针
    container.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y + 0,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round'
      }
    });
    return container.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 9.75,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff'
      }
    });
  }
});

const GAUGE_MAX = 100;
const GAUGE_MIN = 0;

const scale = [
  {
    dataKey: 'value',
    min: GAUGE_MIN,
    max: GAUGE_MAX,
    tickInterval: 10,
    nice: false
  }
];

const color = ['#F5222D', '#FFBF00', '#20a53a'];

export default class Healthy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      trend: 'up' | 'down',
      data: [
        {
          value: 0
        }
      ]
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     timer: setTimeout(this.setData, 0)
  //   });
  //   // this.timer = setTimeout(this.setData, 0);
  // }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps);
    const { used, ramUsed, gpuUsed } = nextProps.cpuData;
    const { netWidth, cDiskUsed } = this.props.hostDetail;
    const up = 0.2;
    const netUsed = up / (netWidth * 1024) / 8;
    const healthy =
      100 -
      Math.floor(
        ramUsed * 0.4 +
          used * 0.26 +
          netUsed * 0.15 +
          cDiskUsed * 0.15 +
          gpuUsed * 0.04
      );
    this.setState(
      {
        data: [{ value: healthy }]
      },
      () => {
        // console.log(this.state);
      }
    );
  }

  // componentWillUnmount() {
  //   if (this.state.timer) {
  //     clearTimeout(this.state.timer);
  //   }
  // }

  setData = () => {
    if (this.state.timer) {
      clearTimeout(this.timer);
    }

    const delta = Math.random();
    const prevVal = this.state.data[0].value;
    if (this.state.trend === 'up') {
      const nextVal = prevVal + delta;
      if (nextVal > 9) {
        this.setState({ trend: 'down' });
      } else {
        this.setState({ data: [{ value: nextVal }] });
      }
    } else {
      const nextVal = prevVal - delta;
      if (nextVal < 0) {
        this.setState({ trend: 'up' });
      } else {
        this.setState({ data: [{ value: nextVal }] });
      }
    }
    this.setState(
      {
        timer: setTimeout(this.setData, 1000)
      },
      () => {
        // console.log(this.state);
      }
    );
    // this.timer = setTimeout(this.setData, 1000);
  };

  render() {
    const { data } = this.state;
    const val = data[0].value;

    return (
      <div
        style={{
          float: 'left',
          background: 'white',
          overflow: 'hidden',
          marginTop: '12px',
          height: '320px',
          width: '35%',
          marginLeft: '12px',
          display: 'flex',
          justifyContent: 'center'
        }}
        className={styles.healthyPlot}
      >
        <Chart
          forceFit={true}
          width={360}
          height={360}
          data={data}
          scale={scale}
          padding={[60, 40, 60, 40]}
          animate={true}
        >
          <Coord
            type='polar'
            startAngle={-202.5}
            endAngle={22.5}
            radius={0.75}
          />
          <Axis
            dataKey='value'
            zIndex={2}
            line={null}
            label={{
              offset: -16,
              textStyle: {
                fontSize: 18,
                textAlign: 'center',
                textBaseline: 'middle'
              }
            }}
            subTickCount={4}
            subTickLine={{
              length: -8,
              stroke: '#fff',
              strokeOpacity: 1
            }}
            tickLine={{
              length: -17,
              stroke: '#fff',
              strokeOpacity: 1
            }}
            grid={null}
          />
          <Axis dataKey='1' show={false} />
          {/* 指针 */}
          <Series
            gemo='point'
            position='value*1'
            shape='pointer'
            color='#0066FF'
            active={false}
          />
          {/* 剩余部分圆弧进度条 */}
          <Guide
            type='arc'
            zIndex={0}
            top={false}
            start={[0, 0.945]}
            end={[100, 0.945]}
            style={{
              stroke: '#CBCBCB',
              lineWidth: 10
            }}
          />
          {/* 红色范围 0-50 */}
          <Guide
            type='arc'
            zIndex={1}
            start={[0, 0.945]}
            end={[Math.max(0, Math.min(50, val)), 0.945]}
            style={{
              stroke: color[0],
              lineWidth: 10
            }}
          />
          {/* 黄色范围 50-80 */}
          <Guide
            type='arc'
            zIndex={1}
            start={[50, 0.945]}
            end={[Math.max(50, Math.min(80, val)), 0.945]}
            style={{
              stroke: color[1],
              lineWidth: 10
            }}
          />
          {/* 绿色范围 80~100 */}
          <Guide
            type='arc'
            zIndex={1}
            start={[80, 0.945]}
            end={[Math.max(80, Math.min(100, val)), 0.945]}
            style={{
              stroke: color[2],
              lineWidth: 10
            }}
          />

          <Guide
            type='html'
            position={['50%', '95%']}
            html={`
              <div style="width: 350px;text-align: center;">
                <p style="font-size: 20px; color: #545454;margin: 0;">健康值</p>
                <p style="font-size: 36px;color: #545454;margin: 0;">${val}%</p>
              </div>
            `}
          />
        </Chart>
      </div>
    );
  }
}
