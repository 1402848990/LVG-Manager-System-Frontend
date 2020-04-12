import React from 'react';
import {
  BorderBox1,
  FullScreenContainer,
  Loading,
  BorderBox12,
  BorderBox8,
  CapsuleChart
} from '@jiaminghi/data-view-react';
import WarnLog from './children/warnLog';
import NetSpeed from './children/netSpeed';
import styles from './index.scss';
import './app.css';

export default class BigScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  async componentDidMount() {
    setInterval(this.setConfig, 2000);
  }

  // 设置config
  setConfig = async () => {
    // console.log(1);

    const configs = JSON.parse(JSON.stringify(this.state.config));
    configs.data[0].value = Math.floor(Math.random() * 100);
    await this.setState(
      {
        config: configs
      },
      () => {
        console.log(this.state);
      }
    );
  };
  render() {
    console.log(1);

    return (
      <>
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
                  <div className='title'>登录日志</div>
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
                      <span>1200KB/S</span>
                      <span>120KB/S</span>
                      <span>50M</span>
                    </div>
                  </div>
                  {/* 网络 */}
                  <NetSpeed hid={41} />
                </div>
              </div>
              <div className='xpanel-wrapper xpanel-wrapper-25'>
                <div className='xpanel xpanel-c-b'>
                  <div className='title title-long'>主机配置</div>
                  <div className={styles.config}>
                    <div className={styles.name}>
                      <span>主机名：8核4G</span>
                      <span>&nbsp;实例：8核4G</span>
                      <span>IP：127.0.0.1</span>
                      <br />
                      <span>&nbsp;&nbsp;状态：正常</span>
                      <span>C盘容量：50G</span>
                      <span>备注：---</span>
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
                    <p> 创建时间：------ </p>
                    <p> 开机时间：------ </p>
                    <p> 运行时长：------ </p>
                  </BorderBox8>
                </div>
              </div>
              <div className='xpanel-wrapper xpanel-wrapper-30'>
                <div className='xpanel xpanel-r-m'>
                  <div className='title'></div>
                </div>
              </div>
              <div className='xpanel-wrapper xpanel-wrapper-45'>
                <div className='xpanel xpanel-r-b'>
                  {/* 右下角 预警日志 */}
                  <div className='title'>预警日志</div>
                  <WarnLog hid={41} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
