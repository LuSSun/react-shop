import store from '@/store'

export function toLogin( {history, location}) {
	// 没有token 跳转到登陆页面
  store.dispatch({
    type: 'LOGOUT'
  })
  history.push({
    pathname: '/login',
    state: { from: location }
  })
}

export function toMainLogin() {
  // token过期
  // 重定向到登陆页面
  store.dispatch({
    type: 'LOGOUT'
  })

  return

}
