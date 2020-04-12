import React from 'react';
import NetSpeed from './netSpeed';
import Healthy from './healthy';
import WarnLog from './warnLog';
import styles from '../index.scss';

class Plot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.plot}>
        <div style={{ overflow: 'hidden' }}>
          <NetSpeed hid={this.props.hid} />
          <Healthy
            hostDetail={this.props.hostDetail}
            cpuData={this.props.cpuData}
            hid={this.props.hid}
          />
        </div>
        <WarnLog hid={this.props.hid} />
      </div>
    );
  }
}

export default Plot;
