/**
 * @description 生成验证码组件
 */
import React from "react";
import styles from "./index.scss";

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: "",
      num2: ""
    };
  }

  componentDidMount() {
    this.changeNum();
  }

  // 生成1-20的随机整数
  proRandom = () => {
    return Math.floor(Math.random() * 20 + 1);
  };

  // 切换验证码
  changeNum = () => {
    this.setState({
      num1: this.proRandom(),
      num2: this.proRandom()
    });
  };

  // 验证结果
  getCheckRes = () =>
    Number(this.props.sub) === Number(this.state.num1 + this.state.num2);

  render() {
    const { num1, num2 } = this.state;
    return (
      <div className={styles.wrap} onClick={this.changeNum}>
        {num1}+{num2}
      </div>
    );
  }
}

export default Verification;
