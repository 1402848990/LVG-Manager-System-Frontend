import React from "react";
import styles from "./conpenent.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.title}>欢迎登录</div>
        </div>
      </div>
    );
  }
}

export default Login;
