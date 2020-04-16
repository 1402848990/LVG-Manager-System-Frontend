.
├── README.md ---README 文件
├── build ---项目打包目录
│   ├── asset-manifest.json
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── precache-manifest.b301c18.js
│   ├── robots.txt
│   ├── service-worker.js
│   └── static
│   ├── css
│   ├── js
│   └── media
├── src ---核心代码目录
│   ├── App.js ---入口文件
│   ├── assets ---静态文件目录
│   │   ├── css
│   │   ├── icon
│   │   ├── images
│   │   ├── img
│   │   └── svg
│   ├── components ---组件目录
│   │   ├── BasicDrawer.js
│   │   ├── Error404.js ---404 组件
│   │   ├── FullScreen.js ---全屏组件
│   │   ├── NoData.js
│   │   ├── auth
│   │   ├── bell ---消息组件模块
│   │   ├── bigScreen ---大屏监控模块
│   │   ├── hostDetail ---主机详情模块
│   │   ├── hostList ---主机列表模块
│   │   ├── index ---首页模块
│   │   ├── layout ---外层布局模块
│   │   ├── login ---登录模块
│   │   ├── hisMonitor ---历史监控模块
│   │   ├── userInfo ---用户资料模块
│   │   └── verification ---验证码组件
│   ├── global.css ---全局基础样式
│   ├── index.js
│   ├── redux ---redux 目录
│   │   ├── actions
│   │   ├── constants
│   │   ├── reducers
│   │   └── store.js
│   ├── request ---接口请求目录
│   │   ├── api ---api 地址
│   │   ├── axiosConfig.js ---axios 封装
│   │   └── baseUrl.js ---路径配置
│   ├── router ---路由配置目录
│   │   ├── index.js
│   │   ├── menus.js ---导航栏配置
│   │   └── routes.js
│   ├── serviceWorker.js
│   ├── setupTests.js
│   └── utils ---工具包
│   └── index.js
├── config ---项目配置目录
│   ├── env.js
│   ├── getHttpsConfig.js
│   ├── jest
│   │   ├── cssTransform.js
│   │   └── fileTransform.js
│   ├── modules.js
│   ├── paths.js
│   ├── pnpTs.js
│   ├── webpack.config.js
│   └── webpackDevServer.config.js
├── package-lock.json
├── package.json ---相关包 JSON
├── node_modules ---依赖库目录
├── public ---公共文件目录
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── scripts ---服务配置目录
│   ├── build.js
│   ├── start.js
│   └── test.js
├── tree.md
└── yarn.lock
