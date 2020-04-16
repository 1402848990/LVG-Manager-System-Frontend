import React from 'react';
import {
  BorderBox1,
  FullScreenContainer,
  Loading,
  BorderBox12,
  BorderBox8,
  CapsuleChart
} from '@jiaminghi/data-view-react';
import Websocket from 'react-websocket';
import WarnLog from './children/warnLog';
import NetSpeed from './children/netSpeed';
import CPU from './children/cpu';
import RAM from './children/ram';
import axios from '@/request/axiosConfig';
import api_host from '@/request/api/api_host';
import styles from './index.scss';
import { withRouter } from 'react-router-dom';
// import './screen.css';

import moment from 'moment';

class BigScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostDetail: {},
      hid: this.props.match.params.hid || 30,
      up: '',
      down: '',
      netWidth: '',
      data: [],
      config: {
        data: [
          {
            name: 'CPU',
            value: 90
          },
          {
            name: 'RAM',
            value: 30
          },
          {
            name: 'GPU',
            value: 5
          },
          {
            name: 'CDisk',
            value: 50
          }
        ],
        unit: '%'
      }
    };
    this.netSpeed = React.createRef();
  }

  async componentDidMount() {
    this.getHostDetail();
    // setInterval(this.setConfig, 2000);
  }

  // 根据hid获取主机详情
  getHostDetail = async () => {
    const { hid } = this.state;
    const res = await axios({
      url: api_host.getHost,
      method: 'post',
      data: {
        id: hid
      }
    });
    await this.setState({
      hostDetail: res.data.data
    });
  };

  // 设置上行网络
  setUp = up => {
    this.setState({
      up
    });
  };

  // 设置下行网络
  setDown = down => {
    this.setState({
      down
    });
  };

  // 处理CPU监控数据
  handleCpuData = async data => {
    const oldData = this.state.data.slice();
    const newData =
      (data && !data.includes('连接成功') && JSON.parse(data)) || [];
    // 如果state中的数据大于七条去掉多余数据
    if (oldData.length > 12) {
      oldData.shift();
      oldData.shift();
    }

    // 处理柱状图数据
    const { used, gpuUsed, ramUsed } = newData[0] || {};

    // 新数据追加到旧数据中
    newData.map(x => {
      oldData.push(x);
    });
    await this.setState(
      {
        data: oldData,
        config: {
          data: [
            {
              name: 'system',
              value: 100
            },
            {
              name: 'CPU',
              value: used
            },
            {
              name: 'RAM',
              value: ramUsed
            },
            {
              name: 'GPU',
              value: gpuUsed
            },
            {
              name: 'CDisk',
              value: 20
            }
          ],
          unit: '%'
        }
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    require('./screen.css');
    const { up, down, hid } = this.state;
    // 主机信息
    const {
      createdAt,
      hostIp,
      hostName,
      openAt,
      closeAt,
      coreNum,
      desc,
      ram,
      netWidth,
      state,
      cDisk
    } = this.state.hostDetail;
    const urlCpu = `ws://localhost:8088/cpuScreen/hid=${hid}`;
    return (
      <div className='fullscreen'>
        <Websocket
          url={urlCpu}
          onMessage={this.handleCpuData}
          reconnectIntervalInMilliSeconds={10000}
          sendMessage='cpu'
        />{' '}
        <div className='header'>
          <h1 className='header-title'>大屏可视化监控</h1>
        </div>
        <div className='wrapper'>
          <div className='content'>
            {/* 左侧 */}
            <div className='col col-l'>
              <div className='xpanel-wrapper xpanel-wrapper-40'>
                {/* 左上 */}
                <div className='xpanel xpanel-l-t'>
                  <div className='title'></div>
                  <CapsuleChart
                    config={this.state.config}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
              <div className='xpanel-wrapper xpanel-wrapper-60'>
                {/* 登录日志 */}
                <div className='xpanel xpanel-l-b'>
                  <div className='title'>CPU实时监控</div>
                  <div className={styles.cpu}>
                    <CPU getData={this.state.data} hid={hid} />
                  </div>
                </div>
              </div>
            </div>
            <div className='col col-c'>
              <div className='xpanel-wrapper xpanel-wrapper-75'>
                {/* 中间上部分 */}
                <div className='xpanel no-bg'>
                  <div className={styles.net}>
                    <div className={styles.title}>
                      <span>健康值</span>
                      <span>上行网络</span>
                      <span>下行网络</span>
                      <span>带宽</span>
                    </div>
                    <div className={styles.value}>
                      <span>90</span>
                      <span>{up}KB/S</span>
                      <span>{down}KB/S</span>
                      <span>{netWidth}M</span>
                    </div>
                  </div>
                  {/* 网络 */}
                  <NetSpeed
                    setUp={this.setUp}
                    setDown={this.setDown}
                    ref={this.netSpeed}
                    hid={hid}
                  />
                </div>
              </div>
              <div className='xpanel-wrapper xpanel-wrapper-25'>
                <div className='xpanel xpanel-c-b'>
                  <div className='title title-long'>主机配置</div>
                  <div className={styles.config}>
                    <div className={styles.name}>
                      <span>主机名：{hostName}</span>
                      <span>
                        &nbsp;实例：{coreNum}核{ram}G
                      </span>
                      <span>IP：{hostIp}</span>
                      <br />
                      <span>
                        &nbsp;&nbsp;状态：
                        {state === 1 ? '正常' : state === 0 ? '关机' : '告警'}
                      </span>
                      <span>C盘容量：{cDisk}G</span>
                      <span>备注：{desc || '----'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col col-r'>
              <div className='xpanel-wrapper xpanel-wrapper-25'>
                <div className='xpanel xpanel-r-t'>
                  <div className='title'>时间参数</div>
                  <BorderBox8 className={styles.time}>
                    <p>
                      {' '}
                      创建时间：
                      {moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}{' '}
                    </p>
                    <p>
                      {' '}
                      开机时间： {moment(openAt).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )}{' '}
                    </p>
                    <p>
                      {' '}
                      运行时长：
                      {Math.floor(
                        (Date.now() - openAt) / 1000 / 60 / 60
                      )}小时{' '}
                    </p>
                  </BorderBox8>
                </div>
              </div>
              <div className='xpanel-wrapper xpanel-wrapper-30'>
                <div className='xpanel xpanel-r-m'>
                  <div className='title'>RAM实时监控</div>
                  <div>
                    <RAM getData={this.state.data} hid={hid} />
                  </div>
                </div>
              </div>
              <div className='xpanel-wrapper xpanel-wrapper-45'>
                <div className='xpanel xpanel-r-b'>
                  {/* 右下角 预警日志 */}
                  <div className='title'>预警日志</div>
                  <WarnLog hid={hid} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BigScreen);
