/**
 * 全部历史监控页
 */
import React from 'react';
import PoltList from './children/poltList';
import { withRouter } from 'react-router-dom';
import styles from './index.scss';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.nowMonitor}>
        <PoltList hid={this.props.match.params.hid || 41} />
      </div>
    );
  }
}

export default withRouter(IndexPage);
