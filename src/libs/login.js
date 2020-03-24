import store from '@/store'
import history from '../config/history'
export function toLogin( obj) {
	// 没有token 跳转到登陆页面
  store.dispatch({
    type: 'LOGOUT'
  })
  obj.history.push({
    pathname: '/login',
    state: { from: obj.location }
  })
}

export function toMainLogin() {
  console.log('未登录')
  // token过期
  // 重定向到登陆页面
  history.push({
    pathname: '/login',
    state: { from: history.location }
  })
  return
}

