import React from 'react';
import { Card, Avatar, Button } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import styles from './index.scss';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 修改名字
  editName = () => {};

  render() {
    return (
      <div className='shadow-radius'>
        {' '}
        <Card title='基本资料'>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <Avatar icon={<UserOutlined />} size={90} />
              <div className={styles.userName}>
                <span>
                  admin
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
                <span className={styles.phone}>15562976106</span>
              </div>
            </div>
            <div className={styles.info}>
              <div>
                <p>ID：</p>
                <p>备注：</p>
                <p>密码：</p>
              </div>
              <div>
                <p>12244</p>
                <p>
                  {' '}
                  <EditOutlined
                    onClick={this.editRemark}
                    style={{
                      fontSize: '16px',
                      color: '#1890ff',
                      cursor: 'pointer'
                    }}
                  />
                </p>
                <p>
                  <Button type='primary' size='small' ghost>
                    修改
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default UserInfo;
