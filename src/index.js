import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/css/index.css';
// import FastClick from 'fastclick'
import './utils/rem'
import App from './App';
import { Provider } from 'react-redux'
import 'animate.css'
// 后来加上会影响页面的某些布局  所以默认加上
import 'antd-mobile/dist/antd-mobile.css'
import './assets/iconfont/iconfont.css'
import './assets/css/base.css'
import './assets/css/reset.css'
import './assets/css/style.css'

import store from './store'
// import { history } from './config/history'
// import history from '@/config/history'
import * as serviceWorker from './serviceWorker';
// FastClick.attach(document.body)

// history 对象是可变的。因此建议从 <Route> 渲染组件时接收的属性中直接访问 location，而不是通过 history.location 进行访问。
// 这样可以保证 React 在生命周期中的钩子函数正常执行。

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
