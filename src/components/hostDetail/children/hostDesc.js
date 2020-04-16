import React from 'react';
import EditHostModal from './editHostModal';
import EditWarn from './editWarn';
import { Button, message } from 'antd';
import {
  createFromIconfontCN,
  SettingOutlined,
  PlayCircleOutlined,
  PoweroffOutlined,
  HddOutlined,
  LockOutlined,
  UserOutlined,
  RetweetOutlined
} from '@ant-design/icons';
import PcIcon from '@/assets/icon/pc';
import axios from '@/request/axiosConfig';
import api_host from '@/request/api/api_host';
import api_logs from '@/request/api/api_logs';
import moment from 'moment';
import styles from '../index.scss';

const { Group } = Button;
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1721121_o53k0k60t1o.js'
});

class HostDesc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: true,
      warnModalVisible: false
    };
  }

  /**
   * 批量开/关机
   */
  openOrClose = async type => {
    const res = await axios({
      url: type === 'open' ? api_host.openHostBatch : api_host.closeHostBatch,
      method: 'post',
      data: {
        ids: [this.props.hid]
      }
    });
    console.log('res', res);
    if (res.data.success) {
      // 执行成功
      const { id: uid } = JSON.parse(localStorage.getItem('userInfo'));
      // 操作日志写入
      this.saveOperation(
        uid,
        type === 'open' ? '开启' : '关闭',
        JSON.stringify([this.props.hid])
      );
      message.success(
        `${type === 'open' ? '开启' : '关闭'}--${
          res.data.data[0]
        }台主机--成功！`
      );
      // await this.getAllHost();
    } else {
      // 执行失败
      message.success(`服务器错误！`);
    }
  };

  // 操作日志写入
  saveOperation = async (uid, type, hids, log) => {
    const res = await axios({
      url: api_logs.saveOperationLogs,
      method: 'post',
      data: {
        info: {
          uid,
          type,
          hids,
          log
        }
      }
    });
  };

  // 关闭Modal
  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  // 关闭warnModal
  closeWarnModal = () => {
    this.setState({
      warnVisible: false
    });
  };

  render() {
    const {
      hostName,
      coreNum,
      hostIp,
      createdAt,
      openAt,
      closeAt,
      netWidth,
      ram,
      state,
      desc,
      system
    } = this.props.hostDetail;
    return (
      <div className={styles.hostDesc}>
        {/* 主机配置项修改Modal */}
        <EditHostModal
          hid={this.props.hid}
          visible={this.state.visible}
          closeModal={this.closeModal}
          hostDetail={this.props.hostDetail}
        />
        {/* 预警设置Modal */}
        <EditWarn
          hid={this.props.hid}
          warnVisible={this.state.warnVisible}
          closeWarnModal={this.closeWarnModal}
          saveOperation={this.saveOperation}
        />
        <div className={styles.left}>
          {/* 电脑SVG图标 */}
          <span className={styles.pcicon}>
            <PcIcon
              type={system && system.includes('Windows') ? 'win' : 'linux'}
            />
          </span>
          {/* 主机名 */}
          <p className={styles.name}>{hostName}</p>
          <div className={styles.groupButton}>
            <Group style={{ borderRadius: '10px' }}>
              {/* 设置 */}
              <Button
                onClick={() => {
                  this.setState({
                    visible: true
                  });
                }}
                size='large'
                shape='circle'
                icon={<SettingOutlined />}
              ></Button>
              {/* 开机 */}
              <Button
                onClick={this.openOrClose.bind(this, 'open')}
                size='large'
                icon={<PlayCircleOutlined />}
              ></Button>
              {/* 关机 */}
              <Button
                onClick={this.openOrClose.bind(this, 'close')}
                size='large'
                icon={<PoweroffOutlined />}
              ></Button>
              {/* 预警设置 */}
              <Button
                onClick={() => {
                  this.setState({
                    warnVisible: true
                  });
                }}
                size='large'
                icon={
                  <IconFont style={{ fontSize: '18px' }} type='iconyujing' />
                }
              ></Button>
            </Group>
          </div>
          <p>主机备注</p>
          <p>{desc || '---'}</p>
          <div className={styles.options}>
            <p>实例配置</p>
            <p>
              {' '}
              <HddOutlined />
              <span>
                实例： {coreNum}核{ram}G
              </span>
            </p>
            <p>
              <IconFont type='iconStatus' />
              <span>
                状态：{state === 1 ? '正常' : state === 0 ? '关机' : '告警'}
              </span>
            </p>
            <p>
              <IconFont type='iconIP' />
              <span>内网IP：{hostIp}</span>
            </p>
            <p>
              <IconFont type='iconinternet' />
              <span>
                公网IP： {hostIp} (固定带宽{netWidth}Mbps)
              </span>
            </p>
            <p>
              <UserOutlined />
              <span>用户名： administrator</span>
            </p>
            <p>
              <LockOutlined />
              <span>
                开机时间：{moment(openAt).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </p>
            <p>
              <LockOutlined />
              <span>
                关机时间：{moment(closeAt).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </p>
            <p>
              <LockOutlined />
              <span>
                创建时间：{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </p>
            <p> &nbsp;</p>
            <p> &nbsp;</p>
            <p> &nbsp;</p>
          </div>
        </div>
        <div className={styles.right}></div>
      </div>
    );
  }
}

export default HostDesc;
