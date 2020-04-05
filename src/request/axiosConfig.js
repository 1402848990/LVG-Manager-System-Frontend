/**
 * axios 拦截封装
 */
import axios from 'axios';
import baseUrl from './baseUrl';
import qs from 'qs';

let service = axios.create({
  baseURL: baseUrl,
  timeout: 600000
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    // console.log('headers', response);
    //获取更新的token
    const { token } = response.data;
    //如果token存在则存在localStorage
    token && localStorage.setItem('token', token);
    return response;
  },
  error => {
    if (error.response) {
      const { status } = error.response;
      //如果401或405则到登录页
      if (status === 401 || status === 405) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在localStorage中取出token塞入请求头部中
    const token = localStorage.getItem('token');
    config.headers.Authorization = `${token}`;
    // post请求使用表单的形式提交
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
