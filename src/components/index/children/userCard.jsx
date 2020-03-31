import React from 'react';
import styles from '../index.scss';
import { UserOutlined } from '@ant-design/icons';
import ICON from '@/assets/icon';
import { Progress } from 'antd';

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hh: '1',
      mm: '30'
    };
  }

  render() {
    return (
      <div className={styles.infoWarp}>
        <div className={styles.top}>
          <div className={styles.left}>
            <h2>Hi,王锐~</h2>
            <h3>初次见面，请多关照~</h3>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            {/* 登录次数 */}
            <Progress
              strokeColor='#009933'
              trailColor='#009933'
              percent={23}
              strokeWidth={4}
              format={percent => (
                <span className={styles.format}>
                  {percent}
                  <br />
                  <span>登录次数</span>
                </span>
              )}
              type='circle'
              width={120}
            />
            {/* 在线时长 */}
            <Progress
              status='active'
              strokeWidth={4}
              strokeColor='#FF981D'
              trailColor='#FF981D'
              percent={10}
              format={percent => (
                <span style={{ fontSize: '28px' }} className={styles.format}>
                  {this.state.hh}
                  <font>小时</font>
                  {this.state.mm}
                  <font>分</font>
                  <br />
                  <span>在线时长</span>
                </span>
              )}
              type='circle'
              width={120}
            />
            <Progress
              percent={10}
              format={percent => percent}
              type='circle'
              width={120}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <span style={styles.time}>
            <UserOutlined />
            &nbsp; 上次登录：2020-03-25 20:30:10
          </span>
          <span style={styles.time}>
            <ICON type='iconip' />
            &nbsp; 上次登录IP：127.0.0.1
          </span>
          <span style={styles.time}>
            <ICON type='iconaddress' />
            &nbsp; 上次登录位置：浙江杭州
          </span>
        </div>
      </div>
    );
  }
}

export default UserCard;
