import React from 'react';
/**
 * @ Author: wangrui
 * @ Create Time: 2020-03-25 16:58:23
 * @ Description:权限控制，permission 1==超级管理员，其它为普通用户
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
    path: '/news',
    title: '消息',
    icon: <BellOutlined />
  }
];
