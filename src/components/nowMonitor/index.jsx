import React from 'react';
import PoltList from './children/poltList';
import styles from './index.scss';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.nowMonitor}>
        <PoltList />
      </div>
    );
  }
}

export default IndexPage;
