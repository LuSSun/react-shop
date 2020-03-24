import store from '@/store'
import history from '../config/history'
import cookie from '../utils/store/cookie'
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
  store.dispatch({
    type: 'LOGOUT'
  })
  cookie.set('login_back_url',`${window.location.pathname}${window.location.search}`)
  // token过期
  // 重定向到登陆页面
  history.push('/login')
  return
}

