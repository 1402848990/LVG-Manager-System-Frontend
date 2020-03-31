import React from 'react';
import { Button } from 'antd';
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
import styles from '../index.scss';

const { Group } = Button;
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1721121_0h9krkvt45di.js'
});

class HostDesc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.hostDesc}>
        <div className={styles.left}>
          <img src={require('@/images/icon-host-linux.png')} alt='' />
          <p className={styles.name}>A_CentOS7_SZ1</p>
          <div className={styles.groupButton}>
            <Group style={{ borderRadius: '10px' }}>
              <Button
                size='large'
                shape='circle'
                icon={<SettingOutlined />}
              ></Button>
              <Button size='large' icon={<PlayCircleOutlined />}></Button>
              <Button size='large' icon={<PoweroffOutlined />}></Button>
              <Button size='large' icon={<RetweetOutlined />}></Button>
            </Group>
          </div>
          <p>主机备注</p>
          <p>---</p>
          <div className={styles.options}>
            <p>实例配置</p>
            <p>
              {' '}
              <HddOutlined />
              <span>实例：2核4G</span>
            </p>
            <p>
              <IconFont type='iconStatus' />
              <span>状态：正常</span>
            </p>
            <p>
              <IconFont type='iconIP' />
              <span>内网IP： 172.18.51.133</span>
            </p>
            <p>
              <IconFont type='iconinternet' />
              <span>公网IP： 120.24.108.179 (固定带宽1Mbps)</span>
            </p>
            <p>
              <UserOutlined />
              <span>用户名： aabbccdd</span>
            </p>
            <p>
              <LockOutlined />
              <span>密码： password</span>
            </p>
            <p>
              <LockOutlined />
              <span>开机时间： 2020-3-21 20:30:00</span>
            </p>
            <p>
              <LockOutlined />
              <span>到期时间： 2020-3-21 20:30:00</span>
            </p>
          </div>
        </div>
        <div className={styles.right}></div>
      </div>
    );
  }
}

export default HostDesc;
