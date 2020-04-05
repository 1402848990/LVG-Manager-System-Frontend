import React from 'react';
import styles from '../index.scss';
import { UserOutlined } from '@ant-design/icons';
import ICON from '@/assets/icon';
import { Progress } from 'antd';
import axios from '@/request/axiosConfig';
import api_user from '@/request/api/api_user';
import api_host from '@/request/api/api_host';
import moment from 'moment';

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hh: 0,
      mm: 0,
      thisLoginDate: null,
      loginLog: []
    };
  }

  async componentDidMount() {
    await this.getUserInfo();
    // 更新在线时长
    this.keepTime();
    setInterval(this.keepTime, 60000);
  }

  /**
   * 获取用户信息
   */
  getUserInfo = async () => {
    const { userInfo } = localStorage;
    const id = userInfo ? JSON.parse(userInfo).id : null;
    const res = await axios({
      url: api_user.loginLog,
      method: 'post',
      data: {
        id
      }
    });
    // 用户登录日志存到state中
    await this.setState({
      loginLog: res.data.data,
      thisLoginDate: res.data.data[0].createdAt
    });
    // const { ip, address, createdAt, total } = res.data.data;
  };

  /**
   * 登录时长计算
   */
  keepTime = () => {
    const re = (Date.now() - this.state.thisLoginDate) / 1000 / 60 / 60;
    const hh = parseInt(re);
    const mm = parseInt((re - hh) * 60);
    this.setState({
      hh,
      mm
    });
  };

  render() {
    const { ip, address, createdAt } =
      this.state.loginLog.length > 0 ? this.state.loginLog[1] : {};
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
                  {this.state.loginLog.length}
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
              strokeWidth={4}
            />
            {/* 主机数量 */}
            <Progress
              percent={this.props.hostNum / 10}
              format={percent => (
                <span className={styles.format}>
                  {this.props.hostNum}
                  <br />
                  <span>主机数量</span>
                </span>
              )}
              type='circle'
              width={120}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <span style={styles.time}>
            <UserOutlined />
            &nbsp; 上次登录：{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </span>
          <span style={styles.time}>
            <ICON type='iconip' />
            &nbsp; 上次登录IP：{ip}
          </span>
          <span style={styles.time}>
            <ICON type='iconaddress' />
            &nbsp; 上次登录位置：{address}
          </span>
        </div>
      </div>
    );
  }
}

export default UserCard;
