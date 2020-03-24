import React from 'react';
import axios from '../request/axiosConfig';
import api from '../request/api/api_user';
import styles from './index.scss';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const res = await axios({
      url: api.userInfo,
      method: 'post'
    });
    console.log('res', res);
  }

  render() {
    return <>indexPage</>;
  }
}

export default IndexPage;
