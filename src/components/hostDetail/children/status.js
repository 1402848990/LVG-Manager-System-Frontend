/**
 *@description 主机详情状态图表
 */
import React from 'react';
import { WindowsOutlined } from '@ant-design/icons';
import axios from '@/request/axiosConfig';
import api_host from '@/request/api/api_host';
import { Progress, Button } from 'antd';
import styles from '../index.scss';

const { Group } = Button;

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      system,
      coreNum,
      ram,
      cDisk,
      cDiskUsed,
      dDisk,
      dDiskUsed
    } = this.props.hostDetail;
    const { used, ramUsed } = this.props.cpuData;
    return (
      <div className={styles.status}>
        <div className={styles.title}>
          状态
          <Group style={{ borderRadius: '10px', marginLeft: '12px' }}>
            <Button type='primary'>实时监控</Button>
            <Button type='primary'>大屏监控</Button>
          </Group>
        </div>
        <div className={styles.pargrams}>
          <div className={styles.progress}>
            <h3>CPU使用率</h3>
            <Progress
              status='active'
              strokeColor='#20a53a'
              trailColor='#99999978'
              percent={used}
              strokeWidth={6}
              format={percent => (
                <span className={styles.format}>{percent}%</span>
              )}
              type='circle'
              width={100}
            />
            <h3>{coreNum}核心</h3>
          </div>
          <div className={styles.progress}>
            <h3>内存使用率</h3>
            <Progress
              strokeColor='#20a53a'
              trailColor='#99999978'
              percent={ramUsed}
              strokeWidth={6}
              format={percent => (
                <span className={styles.format}>{percent}%</span>
              )}
              type='circle'
              width={100}
            />
            <h3>
              {(ramUsed * 0.01 * ram * 1024).toFixed(2)}/{ram * 1024}(MB)
            </h3>
          </div>
          <div className={styles.progress}>
            <h3>C:/</h3>
            <Progress
              strokeColor='#20a53a'
              trailColor='#99999978'
              percent={cDiskUsed}
              strokeWidth={6}
              format={percent => (
                <span className={styles.format}>{percent}%</span>
              )}
              type='circle'
              width={100}
            />
            <h3>
              {cDiskUsed * 0.01 * cDisk} GB/{cDisk} GB
            </h3>
          </div>
          <div className={styles.progress}>
            <h3>D:/</h3>
            <Progress
              strokeColor='#20a53a'
              trailColor='#99999978'
              percent={dDiskUsed || 10}
              strokeWidth={6}
              format={percent => (
                <span className={styles.format}>{percent}%</span>
              )}
              type='circle'
              width={100}
            />
            <h3>
              {dDiskUsed || 0.2 * dDisk} GB/{dDisk} GB
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Status;
