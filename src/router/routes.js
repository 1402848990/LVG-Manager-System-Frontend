import Index from '../components/index/Index';
import HostDetail from '../components/hostDetail';
import NowMonitor from '../components/nowMonitor';
import HostList from '../components/hostList';
import UserInfo from '../components/userInfo';
import BigScreen from '../components/bigScreen';
import Error404 from '../components/Error404';
import Bell from '../components/bell';

export const routes = [
  { path: '/index', component: Index }, // 首页
  { path: '/hostDetail/:hid', component: HostDetail }, // 主机详情页
  { path: '/nowMonitor/:hid', component: NowMonitor }, // 历史监控
  { path: '/hostList', component: HostList }, // 主机列表
  { path: '/userInfo', component: UserInfo }, // 用户信息
  { path: '/404', component: Error404 }, // 404
  { path: '/bigScreen/:hid', component: BigScreen }, // 大屏
  { path: '/bell', component: Bell } // 404
];
