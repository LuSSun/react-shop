// import Loadable from 'react-loadable'
// import User from '@/pages/user/index.js'
// import Bar from '@/pages/bar/index.js'
import AsyncComponent from '../components/AsyncComponent/index'
// const loadingComponent = ({ error, pastDelay }) => {
// 	// if(error) {
// 	// 	return <div>Error!</div>
// 	// }else if(pastDelay) {
// 	// 	return <div></div>
// 	// }else{
// 	// 	return null
// 	// }
// }
// 路由懒加载
// const loadingComponent = ()=>{
// 	return (
// 		<p></p>
// 	)
// }
const routers = [
	{
		name: '/',
		path: '/',
		exact: true,
		isTab: true,
		meta: {
			title: "首页",
			keepAlive: true,
			backgroundColor: "#fff"
		},
		component: AsyncComponent(() => import('@/pages/home/index.js'))

		// component: Loadable({
		// 	loader: ()=> import ('@/pages/home/index.js'),
		// 	loading:loadingComponent,
		// 	delay: 300
		// })
	},
	{
		name: 'Category',
		path: '/category/:pid?',
		exact: true,
		isTab: true,
		meta: {
			title: "产品分类",
			keepAlive: true,
			footer: true,
			backgroundColor: "#fff"
		},
		component: AsyncComponent(() => import('@/pages/shop/GoodsClass.js'))
	},
	{
		name: 'Cart',
		path: '/cart',
		exact: true,
		isTab: true,
		meta: {
			title: "购物车",
			keepAlive: true,
			footer: true,
			auth: true
		},
		component: AsyncComponent(() => import('@/pages/shop/ShoppingCart.js'))
	},
	{
		name: 'User',
		path: '/user',
		exact: true,
		isTab: true,
		meta: {
			title: "个人中心",
			keepAlive: true,
			footer: true,
			auth: true
		},
		component: AsyncComponent(() => import('@/pages/user/user.js'))
	},
	{
		path: "/user/data",
		name: "PersonalData",
		meta: {
			title: "个人资料",
			keepAlive: true,
			auth: true
		},
		component: AsyncComponent(() => import("@/pages/user/personalData.js"))
	},
	{
    path: "/user/binding",
    name: "BindingPhone",
    meta: {
      title: "绑定手机",
      keepAlive: true,
      backgroundColor: "#fff",
      auth: true
    },
    component: AsyncComponent(() => import("@/pages/user/bindingPhone.js"))
	},
	{
    path: "/user/account",
    name: "UserAccount",
    meta: {
      title: "我的账户",
      keepAlive: true,
      auth: true
    },
    component: AsyncComponent(() => import("@/pages/user/userAccount.js"))
	},
	{
    path: "/user/integral",
    name: "Integral",
    meta: {
      title: "积分详情",
      keepAlive: true,
      auth: true
    },
    component: AsyncComponent(() => import("@/pages/user/signIn/integral.js"))
	},
	{
    path: "/user/user_coupon",
    name: "UserCoupon",
    meta: {
      title: "我的优惠券",
      keepAlive: true,
      auth: true
    },
    component: AsyncComponent(() => import("@/pages/user/userCoupon.js"))
	},
	{
    path: "/user/vip",
    name: "UserVip",
    meta: {
      title: "会员中心",
      keepAlive: true,
      auth: true
    },
    component: AsyncComponent(() => import("@/pages/user/userVip.js"))
	},
	{
    path: "/user/vip",
    name: "UserVip",
    meta: {
      title: "会员中心",
      keepAlive: true,
      auth: true
    },
    component: AsyncComponent(() => import("@/pages/user/userVip.js"))
	},
	{
    path: "/user/user_promotion",
    name: "UserPromotion",
    meta: {
      title: "我的推广",
      keepAlive: true,
      auth: true
    },
    component: AsyncComponent(() => import("@/pages/user/promotion/userPromotion.js"))
	},
	{
    path: "/user/add_manage",
    name: "AddressManagement",
    meta: {
      title: "地址管理",
      keepAlive: true,
      auth: true
    },
    component: AsyncComponent(() => import("@/pages/user/addressManagement.js"))
  },

	{
    path: "/order/list/:type",
    name: "MyOrder",
    meta: {
      title: "我的订单",
      keepAlive: false,
      auth: true
    },
    component: AsyncComponent(() => import("@/pages/order/myOrder.js"))
	},
	{
    path: "/order/refund_list",
    name: "ReturnList",
    meta: {
      title: "退货列表",
      keepAlive: false,
      auth: true
    },
    component: AsyncComponent(() => import("@/pages/order/returnList.js"))
	},

	{
		name: 'bar',
		path: '/bar',
		exact: true,
		meta: {
			title: "bar页面",
			keepAlive: true,
			backgroundColor: "#fff"
		},
		component: AsyncComponent(() => import('@/pages/bar/index.js'))
	},
	{
		name: 'Login',
		path: '/login',
		exact: true,
		meta: {
			title: "登录",
		},
		component: AsyncComponent(() => import('@/pages/login/index.js'))
	},
	{
		name: 'RetrievePassword',
		path: '/retrieve_password',
		exact: true,
		meta: {
			title: "登录",
		},
		component: AsyncComponent(() => import('@/pages/login/retrievePassword.js'))
	},
	{
		name: 'NotDefined',
		path: '*',
		exact: true,
		meta: {
			title: "页面找不到",
			keepAlive: true,
			home: false,
			backgroundColor: "#F4F6FB"
		},
		component: AsyncComponent(() => import('@/pages/NotDefined/index.js'))
	}
]
export default routers
