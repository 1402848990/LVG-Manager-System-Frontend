import React from 'react';
import { List, Avatar, Card, Col, Row, Progress } from 'antd';
import { WindowsOutlined } from '@ant-design/icons';
import styles from '../index.scss';

class HostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: 'Title 1'
        },
        {
          title: 'Title 2'
        },
        {
          title: 'Title 3'
        },
        {
          title: 'Title 4'
        },
        {
          title: 'Title 1'
        },
        {
          title: 'Title 2'
        },
        {
          title: 'Title 3'
        },
        {
          title: 'Title 4'
        },
        {
          title: 'Title 1'
        },
        {
          title: 'Title 2'
        },
        {
          title: 'Title 3'
        },
        {
          title: 'Title 4'
        }
      ]
    };
  }

  render() {
    return (
      <div className={styles.hostList}>
        <List
          style={{ paddingTop: '20px', backgroundColor: '#F1F2F7' }}
          // loading={true}
          bordered={true}
          dataSource={this.state.data}
          grid={{ gutter: 4, column: 2 }}
          renderItem={item => (
            <List.Item>
              <Row className={styles.row} gutter={4}>
                <Col span={6} className={styles.left}>
                  {/* 左侧 */}
                  <div>
                    {' '}
                    <Avatar
                      style={{ color: 'white', backgroundColor: '#1FAEFF' }}
                      icon={<WindowsOutlined />}
                    ></Avatar>
                  </div>
                  <div>127.0.0.1</div>
                  <div>服务器名字</div>
                </Col>
                <Col span={12} className={styles.data}>
                  <div>
                    <span>负载：</span>
                    <Progress
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068'
                      }}
                      percent={50}
                      status='active'
                      className={styles.progress}
                    />
                  </div>
                  <div>
                    CPU：
                    <Progress
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068'
                      }}
                      percent={50}
                      status='active'
                      className={styles.progress}
                    />
                  </div>
                  <div>网络：12344</div>
                </Col>
                <Col span={6} className={styles.right}>
                  <span>健康值</span>
                  <span>100</span>
                </Col>
              </Row>
              {/* <Card title={item.title}>Card content</Card> */}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default HostList;
