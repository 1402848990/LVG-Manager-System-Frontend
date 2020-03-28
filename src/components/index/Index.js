import React, { Component } from 'react';
import Websocket from 'react-websocket';
import UserCard from './children/userCard';
import HostIndex from './children/hostIndex.jsx';
import HostList from './children/hostList';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
    this.ws = React.createRef();
  }

  componentDidMount() {
    console.log(1);

    // Websocket.sendMessage(11);
    // console.log('refs', this.ws.current.sendMessage('ok'));
  }

  handleData = data => {
    console.log('data', data);
    this.setState({
      data
    });
  };

  render() {
    return (
      <div className='shadow-radius'>
        <div style={{ overflow: 'hidden' }}>
          <UserCard />
          <HostIndex />
        </div>

        <HostList />
        {/* <Websocket
            url='ws://localhost:8088/wstest'
            onMessage={this.handleData}
            reconnectIntervalInMilliSeconds={10000}
            sendMessage='111'
            ref={this.ws}
            // onOpen={() => {
            //   this.ws.current.sendMessage('ok');
            // }}
          /> */}
      </div>
    );
  }
}

export default Index;
