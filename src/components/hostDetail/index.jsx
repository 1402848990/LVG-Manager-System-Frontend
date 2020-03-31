import React from 'react';
import Status from './children/status';
import HostDesc from './children/hostDesc';
import Plot from './children/plot';
import styles from './index.scss';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // <div className='shadow-radius'>
      <div className={styles.hostDetail}>
        <Status />
        <HostDesc />
        <Plot />
      </div>
      // </div>
    );
  }
}

export default IndexPage;
