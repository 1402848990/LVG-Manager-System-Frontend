/**
 * axios baseUrl配置
 */
let baseUrl = null;
console.log(process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
  case "production":
    baseUrl = "../../../../";
    break;
  default:
    baseUrl = "http://localhost:8088/api";
    break;
}
// export default baseUrl;
module.exports = baseUrl;
