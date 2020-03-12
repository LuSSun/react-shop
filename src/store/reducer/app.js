import { LOGIN_KEY } from '../action-type'
import cookie from "@/utils/store/cookie";

let defaultState = {
	footer: true,
	home: true,
	homeActive: false,
	token: cookie.get('login_status') || null,
	backgroundColor: "#fff",
	userInfo: null,
	isLoading:false
}

export default (state = defaultState, action = {}) => {

	switch (action.type) {
		case 'demo1':
			return {
				...state,
				userInfo: action.data
			}
		case 'LOGIN':
			cookie.set(LOGIN_KEY, action.token, action.expires_time)
			return {
				...state,
				token: action.token
			}
		case 'LOGOUT':
			cookie.remove(LOGIN_KEY)
			return {
				...state,
				token: undefined
			}
		case 'LOADING_START':
			return {
				...state,
				isLoading: true
			}
		case 'LOADING_END':
			return {
				...state,
				isLoading: false
			}
		default:
			return state
	}
}
