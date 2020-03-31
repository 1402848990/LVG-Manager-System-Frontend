import React from 'react';
import { WindowsOutlined } from '@ant-design/icons';
import { Progress, Button } from 'antd';
import styles from '../index.scss';

const { Group } = Button;

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.status}>
        <p>
          状态
          <Group style={{ borderRadius: '10px', marginLeft: '12px' }}>
            <Button type='primary'>实时监控</Button>
            <Button type='primary'>大屏监控</Button>
          </Group>
        </p>
        <div className={styles.pargrams}>
          <div className={styles.progress}>
            <h3>CPU使用率</h3>
            <Progress
              strokeColor='#20a53a'
              trailColor='#99999978'
              percent={23}
              strokeWidth={6}
              format={percent => (
                <span className={styles.format}>{percent}%</span>
              )}
              type='circle'
              width={100}
            />
            <h3>8核心</h3>
          </div>
          <div className={styles.progress}>
            <h3>内存使用率</h3>
            <Progress
              strokeColor='#20a53a'
              trailColor='#99999978'
              percent={23}
              strokeWidth={6}
              format={percent => (
                <span className={styles.format}>{percent}%</span>
              )}
              type='circle'
              width={100}
            />
            <h3>494/1535(MB)</h3>
          </div>
          <div className={styles.progress}>
            <h3>C:/</h3>
            <Progress
              strokeColor='#20a53a'
              trailColor='#99999978'
              percent={23}
              strokeWidth={6}
              format={percent => (
                <span className={styles.format}>{percent}%</span>
              )}
              type='circle'
              width={100}
            />
            <h3>9.90 GB/39.90 GB</h3>
          </div>
          <div className={styles.progress}>
            <h3>D:/</h3>
            <Progress
              strokeColor='#20a53a'
              trailColor='#99999978'
              percent={23.3}
              strokeWidth={6}
              format={percent => (
                <span className={styles.format}>{percent}%</span>
              )}
              type='circle'
              width={100}
            />
            <h3>863.50 MB/80.00 GB</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Status;
