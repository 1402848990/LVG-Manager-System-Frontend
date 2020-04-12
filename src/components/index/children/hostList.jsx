/**
 * @description 首页的主机列表
 */
import React from 'react';
import Websocket from 'react-websocket';
import { List, Avatar, Card, Col, Row, Progress } from 'antd';
import { WindowsOutlined } from '@ant-design/icons';
import IconFont from '@/assets/icon';
import { withRouter } from 'react-router-dom';
import styles from '../index.scss';

// progress状态颜色
const safeColor = {
  '0%': '#108ee9',
  '100%': '#87d068'
};
const warnColor = {
  '0%': '#f37923',
  '100%': '#f76814'
};

const errColor = {
  '0%': '#e91010',
  '100%': '#de4a4a'
};

class HostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cpuData: [],
      netData: [],
      healthyScatter: [] // 健康值分布
    };
    this.ws = React.createRef();
  }

  handleCpuData = async data => {
    // console.log('data', data);
    // cpu数据存入state中
    await this.setState(
      {
        cpuData: (data && !data.includes('连接成功') && JSON.parse(data)) || {}
      }
      // () => {
      //   console.log('state', this.state);
      // }
    );
  };

  handleNetData = async data => {
    // console.log('data', data);
    // NET数据存入state中
    await this.setState({
      netData: (data && !data.includes('连接成功') && JSON.parse(data)) || {}
    });
  };

  render() {
    const { cpuData, netData } = this.state;
    let cpu = 0;
    let gpu = 0;
    let ram = 0;
    let up = 0;
    let down = 0;

    return (
      <div className={styles.hostList}>
        <Websocket
          url='ws://localhost:8088/CpuWs'
          onMessage={this.handleCpuData}
          reconnectIntervalInMilliSeconds={10000}
          sendMessage='cpu'
          ref={this.ws}
          onOpen={() => {
            this.ws.current.sendMessage('getCurrentCpuData');
          }}
        />
        <Websocket
          url='ws://localhost:8088/NetWs'
          onMessage={this.handleNetData}
          reconnectIntervalInMilliSeconds={10000}
          sendMessage='net'
        />
        <List
          style={{ paddingTop: '20px', backgroundColor: '#f1f2f7' }}
          loading={!(cpuData.length > 0 && netData.length > 0)}
          bordered={true}
          dataSource={this.props.allHost}
          grid={{ gutter: 2, column: 2 }}
          renderItem={item => {
            // C盘占用率\带宽
            const { cDiskUsed = 0.2, netWidth } = item;

            if (this.state.cpuData.length > 0) {
              this.state.cpuData.map(data => {
                if (item.id === data.hid) {
                  cpu = data.used;
                  ram = data.ramUsed;
                  gpu = data.gpuUsed;
                }
              });
            }
            if (netData.length > 0) {
              netData.map(data => {
                if (item.id === data.hid) {
                  up = data.up;
                  down = data.down;
                }
              });
            }

            // console.log(
            //   'cpu:',
            //   cpu,
            //   'ram:',
            //   ram,
            //   'up:',
            //   up,
            //   'netWidth:',
            //   netWidth,
            //   'cDiskUsed:',
            //   cDiskUsed,
            //   'gpu:',
            //   gpu
            // );

            // 带宽占用率
            const netUsed = up / (netWidth * 1024) / 8;
            const healthy = (
              100 -
              Math.floor(
                ram * 0.4 +
                  cpu * 0.26 +
                  netUsed * 0.15 +
                  cDiskUsed * 0.15 +
                  gpu * 0.04
              )
            ).toString(); // 为了避免NAN时报错，所以转成string

            return (
              <List.Item
                onClick={() => {
                  this.props.history.push(`/hostDetail/${item.id}`);
                }}
              >
                <Row className={styles.row} gutter={4}>
                  <Col span={5} className={styles.left}>
                    {/* 左侧 */}
                    <div>
                      {' '}
                      <Avatar
                        style={{ backgroundColor: '#1FAEFF' }}
                        icon={
                          <IconFont
                            type={
                              item.system.includes('Windows')
                                ? 'iconwindows1'
                                : item.system.includes('CentOS')
                                ? 'iconicon_centos'
                                : 'iconicon_ubuntu'
                            }
                            styles={{
                              color: 'white'
                            }}
                          />
                        }
                      ></Avatar>
                    </div>
                    <div>{item.hostIp}</div>
                    <div>{item.hostName}</div>
                  </Col>
                  {/* 中间 */}
                  <Col span={14} className={styles.data}>
                    <div>
                      CPU：
                      <Progress
                        percent={cpu}
                        strokeColor={
                          cpu > 50
                            ? cpu > 70
                              ? errColor
                              : warnColor
                            : safeColor
                        }
                        status='active'
                        className={styles.progress}
                      />
                    </div>
                    <div>
                      <span>内存：</span>
                      <Progress
                        strokeColor={
                          ram > 50
                            ? ram > 70
                              ? errColor
                              : warnColor
                            : safeColor
                        }
                        percent={ram}
                        status='active'
                        className={styles.progress}
                      />
                    </div>

                    <div>
                      网络：
                      <span style={{ width: '90px', display: 'inline-block' }}>
                        <IconFont
                          type='iconnetUp'
                          styles={{
                            marginRight: '-3px'
                          }}
                        />
                        {up}KB
                      </span>
                      <IconFont
                        styles={{
                          marginRight: '-3px'
                        }}
                        type='icondown'
                      />
                      {down}KB
                    </div>
                  </Col>
                  {/* 右侧 健康值 */}
                  <Col span={5} className={styles.right}>
                    <span>健康值</span>
                    <span>{healthy}</span>
                  </Col>
                </Row>
                {/* <Card title={item.title}>Card content</Card> */}
              </List.Item>
            );
          }}
        />
      </div>
    );
  }
}

export default withRouter(HostList);
