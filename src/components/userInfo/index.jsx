/**
 * @description 用户资料
 */
import React from 'react';
import { Card, Avatar, Button, Input } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import EditPassWord from './children/editPassWord';
import axios from '@/request/axiosConfig';
import api from '@/request/api/api_user';
import LoginLog from './children/loginLog';
import styles from './index.scss';
import moment from 'moment';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      changeName: '',
      nameEdit: false,
      visible: false
    };
  }

  async componentDidMount() {
    await this.getUserInfo();
  }

  // 获取用户资料
  getUserInfo = async () => {
    const { id } = JSON.parse(localStorage.getItem('userInfo'));
    const res = await axios({
      url: api.userInfo,
      method: 'post',
      data: {
        id
      }
    });
    await this.setState({
      userInfo: res.data.info,
      changeName: res.data.info.userName
    });
  };

  // 修改名字
  editName = async () => {
    await this.setState({
      nameEdit: true
    });
  };

  // 修改备注
  editRemark = async () => {
    await this.setState({
      remarkEdit: true
    });
  };

  // 名字修改失去焦点
  handleNameBlur = async () => {
    console.log('失去焦点');
    await axios({
      url: api.editUserInfo,
      method: 'post',
      data: {
        changeData: {
          userName: this.state.changeName
        },
        id: this.state.userInfo.id
      }
    });
    await this.setState({
      nameEdit: false
    });
    await this.getUserInfo();
  };

  // 备注修改失去焦点
  handleRemarkBlur = async () => {
    console.log('失去焦点');
    await axios({
      url: api.editUserInfo,
      method: 'post',
      data: {
        changeData: {
          remark: this.state.changeRemark
        },
        id: this.state.userInfo.id
      }
    });
    await this.setState({
      remarkEdit: false
    });
    await this.getUserInfo();
  };

  handlePicChange = e => {
    e.persist();
    console.log(e);
  };

  render() {
    const {
      userName,
      phone,
      createdAt,
      updatedAt,
      version,
      id,
      remark
    } = this.state.userInfo;
    return (
      <div className='shadow-radius'>
        {/* 修改密码Modal */}
        <EditPassWord
          id={id}
          phone={phone}
          visible={this.state.visible}
          close={() => {
            this.setState({ visible: false });
          }}
        />
        <Card title='基本资料'>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <Avatar icon={<UserOutlined />} size={90} />
              {/* <PicUpload /> */}
              <div className={styles.userName}>
                <span>
                  {this.state.nameEdit ? (
                    <Input
                      onBlur={this.handleNameBlur}
                      onChange={value => {
                        value.persist();
                        this.setState({
                          changeName: value.target.value
                        });
                        console.log('value', value);
                      }}
                      maxLength={10}
                      style={{ width: '100px' }}
                      size='small'
                      defaultValue={userName}
                      value={this.state.changeName}
                    />
                  ) : (
                    userName
                  )}

                  <EditOutlined
                    onClick={this.editName}
                    style={{
                      marginLeft: '10px',
                      color: '#1890ff',
                      cursor: 'pointer'
                    }}
                  />
                </span>
                <br />
                <span className={styles.phone}>{phone}</span>
              </div>
            </div>
            <div className={styles.info}>
              <div>
                <p>ID：</p>
                <p>备注：</p>
                <p>密码：</p>
                <p>注册时间：</p>
                <p>更新时间：</p>
                <p>修改次数：</p>
              </div>
              <div>
                <p>{id}</p>
                <p>
                  {this.state.remarkEdit ? (
                    <Input
                      onBlur={this.handleRemarkBlur}
                      onChange={value => {
                        value.persist();
                        this.setState({
                          changeRemark: value.target.value
                        });
                        console.log('value', value);
                      }}
                      maxLength={100}
                      style={{ width: '200px' }}
                      size='small'
                      defaultValue={remark}
                      value={this.state.changeRemark}
                    />
                  ) : (
                    remark
                  )}
                  <EditOutlined
                    onClick={this.editRemark}
                    style={{
                      marginLeft: '16px',
                      color: '#1890ff',
                      cursor: 'pointer'
                    }}
                  />
                </p>
                <p>
                  <Button
                    type='primary'
                    size='small'
                    onClick={() => {
                      this.setState({ visible: true });
                    }}
                    ghost
                  >
                    修改
                  </Button>
                </p>
                <p>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p>{moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p>{version}次</p>
              </div>
            </div>
          </div>
        </Card>
        {/* 登录日志 */}
        <LoginLog />
      </div>
    );
  }
}

export default UserInfo;
