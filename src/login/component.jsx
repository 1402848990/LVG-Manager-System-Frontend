import React from 'react';
import styles from './conpenent.scss';
import { Tabs, Alert } from 'antd';
import UserName from './children/userName.jsx';
import Phone from './children/phone';
import Register from './children/register';

const { TabPane } = Tabs;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      message: '',
      key: '1'
    };
  }

  /**
   * tabChange
   */
  tabChange = e => {
    this.setState({
      key: e
    });
  };

  /**
   * Alert
   */
  handleAlert = (alert, message, type = 'error') => {
    this.setState(
      {
        alert,
        message,
        type
      },
      () => {
        setTimeout(() => {
          this.setState({ alert: false });
        }, 3000);
      }
    );
  };

  render() {
    const { alert, message, key, type = 'error' } = this.state;
    return (
      <div className={styles.body}>
        {alert ? (
          <Alert
            style={{
              width: 400 + 'px',
              margin: '0 auto',
              borderRadius: '15px',
              top: '20px',
              position: 'absolute',
              left: 0,
              right: 0
            }}
            type={type}
            banner
            message={message}
          />
        ) : null}
        <img src={require('../images/right-top.png')} alt='' />
        <div
          style={{ height: key === '3' ? '500px' : '' }}
          className={styles.content}
        >
          <p className={styles.title}>
            {key === '3' ? '欢迎注册' : '欢迎登陆'}
          </p>
          <Tabs activeKey={key} defaultActiveKey='1' onChange={this.tabChange}>
            <TabPane tab='账户登录' key='1'>
              <UserName
                tabChange={this.tabChange}
                handleAlert={this.handleAlert}
                fprops={this.props}
              />
            </TabPane>
            <TabPane tab='手机号登录' key='2'>
              <Phone
                tabChange={this.tabChange}
                handleAlert={this.handleAlert}
              />
            </TabPane>
            <TabPane tab='注册' key='3'>
              <Register handleAlert={this.handleAlert} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Login;
