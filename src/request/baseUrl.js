/**
 * axios baseUrl配置
 */
let baseUrl = null;
console.log(process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
  case 'production':
    console.log('生产环境');
    baseUrl = 'http://wrdemo.cn/api';
    break;
  default:
    baseUrl = 'http://localhost:8088/api';
    break;
}
// export default baseUrl;
module.exports = baseUrl;
