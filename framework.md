
## Fe framework

企业级前端开发框架：[redux](https://redux.js.org/)、[dvajs](https://dvajs.com/)、[umijs](https://umijs.org/)、[bigfish](https://bigfish.alipay.com/)

config

```js
export default {
  // appType 标记为 h5, 就会官方植入 hd, fastclick 等移动研发相关解决方案;
  appType: 'h5 | console',
  // deployMode: 'assets | custom',
  deployMode: {
    mode: 'online',
  },
  favicon: false,
  title: '标题',
  targets: {
    ios: 8,
    android: 4,
    chrome: 33,
  },
  // 是否关掉 cssModule;
  disableCSSModules: true,
  deer: {
    // 埋点位
    spma: 'a1153',
  },
  // 异常搜集
  clue: { pid: '12345' },
  dynamicImport: {
    webpackChunkName: false,
    loadingComponent: '../src/component/Loading',
  },
  theme: {
    // 'brand-primary': '#108ee9',
  },
  locale: {
    enable: true,
  }
  // 去除默认加上的 .html 后缀
  exportStatic: null,
  // 解决对于 node_modules 有 es6 会在 build 报错
  es5ImcompatibleVersions: true,
  // Android 4 里 Set Promise 未定义错误
  // 如果是 assets 应用，没有用到 bigfish 构建出来的 HTML, script 配置无效，需手动修改后端 html 文件添加
  script: [
    'https://a.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js',
  ],
  proxy: {
    dev: {
      'eworkcard/api/': {
        target: 'http://xx.alipay.net',
      },
    },
    test: {},
    pre: {},
  }
  routes: [{
    path: '/',
    indexRoute: {
      title: 'ww',
      spmb: 'b9903',
      component: 'index',
    },
    component: '../layout',
    routes: [
      {
        path: 'index',
        spmb: 'b9903',
        component: 'index',
      },
      {
        path: 'guide',
        spmb: 'b9901',
        title: 'xx',
        component: 'guide',
      },
    ],
  }],
}
```

model

```js
// from 2018-2019 云游 @pofeng
import axios from 'axios';
import { Action } from 'redux';
type ModelState = {
  params: object;
};
type SetStateAction = Action & { payload: Partial<ModelState> };

function setState(payload: Partial<ModelState>) {
  const action: SetStateAction = { type: 'setState', payload };
  return action;
}
const getInitialState = (): ModelState => {
  return {
    architecture: [],
  };
};
const namespace = 'xxx';
export default {
  namespace,
  state: getInitialState(),
  reducers: {
    setState(state: ModelState, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetchData(_, effectMap: EffectsCommandMap) {
      const { call, put, fork, select } = effectMap;
      yield fork(() => fetch_deploymentUnitWhiteList(_, effectMap));
      try {
        const modelState: ModelState = yield select(state => state[namespace]);
        const rsp: IServiceResponse = yield call(() => axios.get(`/api/envs/${envId}`));
        yield put(setState({ architecture: rsp.data.data }));
      } catch (e) {
        yield put(setState({ architecture: getInitialState().architecture }));
      }
    },
  },
};
```

page

```js
import React, { PureComponent } from '@alipay/bigfish/react';
import { Divider, Icon, Layout, Menu } from '@alipay/bigfish/antd';
import { List, WingBlank, Button, Flex } from '@alipay/bigfish/antd-mobile';
import { connect } from '@alipay/bigfish/sdk';
import history from '@alipay/bigfish/sdk/history';
import { Link } from '@alipay/bigfish/sdk/router';
import { formatMessage } from '@alipay/bigfish/locale';
import { replace, map, indexOf } from "@alipay/bigfish/util/lodash";
import qs from '@alipay/bigfish/util/query-string';
'@alipay/bigfish/eslint'
'@alipay/bigfish/stylelint'

@connect(({ page, guide }) => ({ page, guide }))
@NavWrapper
export default class App extends PureComponent {
  componentDidMount() {
  }
  goBack = (ev) => {}
  render() {}
}
```

### request 组件
csrf-token 处理、gateway domain 网关域名、登录、返回异常、返回json结果格式化、上传/下载

### 微前端
微应用注册、路由管控(统一菜单/权限)、发布版本管控、发布灰度控制、多环境(日常/预发/线上)、预加载、应用组件。

子应用样式丢失。


## h5 or 小程序

> 2018-12-24

- butian线下面的，除非特殊情况，否则都是优先小程序，如果要走h5的话，需要走审批。(@hanseng - 支付宝)
- 只会在一些小需求上试点，目前主要还是 h5。(@yuanfei - 微贷)
- 核心的链路，容易出 bug 的用 h5，比如我们这边的通用业务，通用投保，理赔，一些新业务会考虑小程序。(@chengwu - 保险)

考虑到一期的重要性、和直接面向 C 端用户，采用 h5 方式开发。

h5 套壳？参考：小程序『套壳』指南

### 小程序

小程序 API

```js
const { Ali } = window;
const { isAlipay } = Ali;
window.AlipayJSBridge;
document.addEventListener('AlipayJSBridgeReady', callback, false);
Ali.httpRequest({ url: '', method: 'POST' }, (result) => {});
Ali.rpc({ operationType: '', requestData: [] }, (result) => {});
Ali.call('imageViewer', { enablesavephoto: true, images: [], init: index });
Ali.showLoading(param);
Ali.hideLoading();
Ali.showToast({ content: '' });
Ali.showActionSheet({ content: '' }, (result) => {});
Ali.popWindow();
AlipayJSBridge.call('getSystemInfo', { }, (result) => {});
AlipayJSBridge.call('popWindow');
AlipayJSBridge.call('setTitle', { title: 'xxx' });
```

采用了虚拟 DOM 的思想。小程序的渲染层和逻辑层分别由2个线程管理：渲染层的界面使用了 WebView 进行渲染；逻辑层采用 JsCore 线程运行JS脚本。一个小程序存在多个界面，所以渲染层存在多个 WebView 线程，这两个线程的通信会经由微信客户端做中转，逻辑层发送网络请求也经由 Native 转发。
目的：安全可控，沙箱隔离，限制 DOM 和 BOM 能力。逻辑层和渲染层是独立的，二者不会互相阻塞，因此性能更优（小程序限制了 JS 操作 DOM 的能力，因此不用担心二者的不同步问题）在浏览器网页中，虽然 JS 执行和 UI 渲染也是处于两个线程，但是 JS 线程和 UI 线程是互斥的。


小程序采用的是混合架构，可通过 html 里的 a 标签启动新的 webview 窗口、调用 popWindow 关闭窗口。基本页面元素是 html 渲染，弹窗类 loading toast ActionSheet 和 本地存储、系统或用户信息，使用客户端原生实现。

而 react-native 只是采用 js/html 写法，背后完全是 客户端原生 渲染。
