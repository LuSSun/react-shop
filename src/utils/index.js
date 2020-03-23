const location = window.location
export function trim(str) {
	return String.prototype.trim.call(str);
}

export function isType(arg, type) {
	return Object.prototype.toString.call(arg) === "[object " + type + "]";
}

export function isWeixin() {
	return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
}

export function parseQuery() {
	const res = {};

	const query = (location.href.split("?")[1] || "")
		.trim()
		.replace(/^(\?|#|&)/, "");

	if (!query) {
		return res;
	}

	query.split("&").forEach(param => {
		const parts = param.replace(/\+/g, " ").split("=");
		const key = decodeURIComponent(parts.shift());
		const val = parts.length > 0 ? decodeURIComponent(parts.join("=")) : null;

		if (res[key] === undefined) {
			res[key] = val;
		} else if (Array.isArray(res[key])) {
			res[key].push(val);
		} else {
			res[key] = [res[key], val];
		}
	});

	return res;
}
export function checkPhone(phone){
    if(!(/^1[3456789]\d{9}$/.test(phone))){
        return true;
    }
}
//获取QueryString的数组
export function getQueryString() {
  let result = window.location.search.match(
    new RegExp('[?&][^?&]+=[^?&]+', 'g'),
  );
  if (result == null) {
    return '';
  }
  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].substring(1);
  }
  return result;
}
//根据 QueryString 参数名称获取值
export function getQueryStringByName(name) {

  let result = window.location.search.match(
    new RegExp('[?&]' + name + '=([^&]+)', 'i'),
  );
  if (result == null || result.length < 1) {
    return '';
  }
  // 解码
  return decodeURI(result[1]);
}

const VUE_APP_API_URL = process.env.VUE_APP_API_URL || `${location.origin}/api`;
const VUE_APP_WS_URL =
	process.env.VUE_APP_WS_URL || `ws:${location.hostname}:20003`;
export { VUE_APP_API_URL, VUE_APP_WS_URL };
