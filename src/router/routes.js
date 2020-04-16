import Index from '../components/index/Index';
import HostDetail from '../components/hostDetail';
import NowMonitor from '../components/nowMonitor';
import HostList from '../components/hostList';
import UserInfo from '../components/userInfo';
import BigScreen from '../components/bigScreen';
import Error404 from '../components/Error404';

export const routes = [
  { path: '/index', component: Index },
  { path: '/hostDetail/:hid', component: HostDetail },
  { path: '/nowMonitor/:hid', component: NowMonitor },
  { path: '/hostList', component: HostList },
  { path: '/userInfo', component: UserInfo },
  { path: '/404', component: Error404 },
  { path: '/bigScreen/:hid', component: BigScreen }
];
