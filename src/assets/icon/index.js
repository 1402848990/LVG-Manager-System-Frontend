/**
 * @description 对阿里iconfont的封装
 */
import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1721121_7kvlz7lifu.js'
});

export default class ICON extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <IconFont type={this.props.type} style={this.props.styles} />;
  }
}
