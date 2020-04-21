import React from 'react';
/**
 * @ Author: wangrui
 * @ Create Time: 2020-03-25 16:58:23
 */

import { HomeOutlined, BellOutlined } from '@ant-design/icons';
import FontIcon from '../assets/icon';

export const menus = [
  {
    path: '/index',
    title: '首页',
    icon: <HomeOutlined />
  },
  {
    path: '/hostList',
    title: '主机列表',
    icon: <FontIcon type='iconhost' />
  },
  {
    path: '/bell',
    title: '消息',
    icon: <BellOutlined />
  }
];
