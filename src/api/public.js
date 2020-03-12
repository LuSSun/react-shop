import request from '../utils/request'

// 首页

export function getHomeData() {
    return request.get('index', {}, { login: false })
}