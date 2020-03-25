import React from 'react';
import axios from '../../request/axiosConfig';
import api from '../../request/api/api_user';
import styles from './index.scss';
import { Link } from 'react-router-dom';

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
    return (
      <>
        indexPage
        <Link to='/login'>去登录</Link>
      </>
    );
  }
}

export default IndexPage;
