import request from "../utils/request";

/**
 * 用户登录
 * @params data object 用户账号密码
 */
export function login(data) {
  return request.post("/login", data, { login: false });
}

/**
 * 用户手机号登录
 * @param data object 用户手机号 也只能
 */
export function loginMobile(data) {
  return request.post("/login/mobile", data, { login: false });
}

/**
 * 用户发送验证码
 * @param data object 用户手机号
 */
export function registerVerify(data) {
  return request.post("/register/verify", data, { login: false });
}

/**
 * 用户手机号注册
 * @param data object 用户手机号 验证码 密码
 */
export function register(data) {
  return request.post("/register", data, { login: false });
}
/**
 * 用户手机号修改密码
 * @param data object 用户手机号 验证码 密码
 */
export function registerReset(data) {
  return request.post("/register/reset", data, { login: false });
}

/*
 * 个人中心
 * */
export function getUser() {
  return request.get("/user");
}

/*
 * 个人中心(功能列表)
 * */
export function getMenuUser() {
  return request.get("/menu/user");
}

/*
 * 批量领取优惠券
 * */
export function couponReceiveBatch(couponId) {
  return request.post("/coupon/receive/batch", { couponId });
}
