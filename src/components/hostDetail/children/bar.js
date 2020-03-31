import React from 'react';
import { Button } from 'antd';
import styles from '../index.scss';

const { Group } = Button;

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ margin: '12px 0px 12px 12px' }}>
        <Group style={{ borderRadius: '10px' }}>
          <Button type='primary' size='large'>
            实时监控
          </Button>
          <Button type='primary' size='large'>
            大屏监控
          </Button>
        </Group>
      </div>
    );
  }
}

export default Bar;
