import React, { Component } from 'react'
import UserCss from './user-css'
import { Link } from 'react-router-dom'
import dfkImg from '../../assets/images/dfk.png'
import dfhImg from '../../assets/images/dfh.png'
import dshImg from '../../assets/images/dsh.png'
import dpjImg from '../../assets/images/dpj.png'
import shImg from '../../assets/images/sh.png'
import { Toast } from 'antd-mobile'

import { getUser, getMenuUser } from '@/api/user'
export default class User extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userInfo: {},
			// MyMenus: {
			// 	{name:2},
			// 	{name:5}
			// },
			MyMenus:[],
			orderStatusNum: {},
			switchActive: false,
			isWeixin: false
		}
	}

	componentDidMount() {
		this.userData()
		this.menuUser()

	}

	userData() {
		getUser().then(res => {
			this.setState({
				userInfo: res.data,
				orderStatusNum: res.data.orderStatusNum
			})

		})
	}

	menuUser() {
		getMenuUser().then(res => {
			const menu = res.data.routine_my_menus
			if(Array.isArray(res.data.routine_my_menus)){
				this.setState({
					MyMenus: menu
				})
			}else{
				this.setState({
					MyMenus: Object.values(menu)
				})
			}
		})
	}

	render() {
		return (
			<UserCss className="user">
				<div className="header bg-color-red acea-row row-between-wrapper">
					<div className="picTxt acea-row row-between-wrapper">
						<div className="pictrue"><img src={this.state.userInfo.avatar} alt="" /></div>
						<div className="text">
							<div className="acea-row row-middle">
								<div className="name line1">{this.state.userInfo.nickname}</div>
								{
									this.state.userInfo.vip && <div className="member acea-row row-middle">
										<img src={this.state.userInfo.vip_icon} alt="" />{this.state.userInfo.vip_name}
									</div>
								}

							</div>
							{
								this.state.userInfo.phone ? <Link to="/user/data" className="id">
									ID：{this.state.userInfo.uid || 0}
									<span className="iconfont icon-bianji1"></span>
								</Link>
									: <Link to="/user/binding" className="binding">
										<span>绑定手机号</span>
									</Link>
							}
						</div>
					</div>
					<span className="iconfont icon-shezhi"></span>
				</div>
				<div className="wrapper">
					<div className="nav acea-row row-middle">
						<Link className="item" to="/user/account">
							<div>我的余额</div>
							<div className="num">{this.state.userInfo.now_money || 0}</div>
						</Link>
						{
							this.state.userInfo.is_promoter === 1 || this.state.userInfo.statu === 2 ? <Link className="item" to="/user/user_promotion">
								<div>当前佣金</div>
								<div className="num">{this.state.userInfo.brokerage_price || 0}</div>
							</Link>
								: <Link className="item" to="/user/integral">
									<div>当前积分</div>
									<div className="num">{this.state.userInfo.integral || 0}</div>
								</Link>
						}
						<Link className="item" to="/user/user_coupon">
							<div>优惠券</div>
							<div className="num">{this.state.userInfo.couponCount || 0}</div>
						</Link>
					</div>
					<div className="myOrder">
						<div className="title acea-row row-between-wrapper">
							<div>我的订单</div>
							<Link to="/order/list/0" className="allOrder">
								全部订单<span className="iconfont icon-jiantou"></span>
							</Link>
						</div>
						<div className="orderState acea-row row-middle">
							<Link className="item" to="/order/list/0">
								<div className="pictrue">
									<img src={dfkImg} alt="" />
									{
										this.state.orderStatusNum.unpaid_count > 0 && <span
											className="order-status-num"
										>{this.state.orderStatusNum.unpaid_count}</span>
									}
								</div>
								<div>待付款</div>
							</Link>
							<Link className="item" to="/order/list/1">
								<div className="pictrue">
									<img src={dfhImg} alt="" />
									{
										this.state.orderStatusNum.unshipped_count > 0 && <span
											className="order-status-num"
										>{this.state.orderStatusNum.unshipped_count}</span>
									}
								</div>
								<div>待发货</div>
							</Link>
							<Link className="item" to="/order/list/2">
								<div className="pictrue">
									<img src={dshImg} alt="" />
									{
										this.state.orderStatusNum.received_count > 0 && <span
											className="order-status-num"
										>{this.state.orderStatusNum.received_count}</span>
									}
								</div>
								<div>待收货</div>
							</Link>
							<Link className="item" to="/order/list/3">
								<div className="pictrue">
									<img src={dpjImg} alt="" />
									{
										this.state.orderStatusNum.evaluated_count > 0 && <span
											className="order-status-num"
										>{this.state.orderStatusNum.evaluated_count}</span>
									}
								</div>
								<div>待评价</div>
							</Link>
							<Link className="item" to="/order/refund_list">
								<div className="pictrue">
									<img src={shImg} alt="" />
									{
										this.state.orderStatusNum.refund_count > 0 && <span
											className="order-status-num"
										>{this.state.orderStatusNum.refund_count}</span>
									}
								</div>
								<div>售后/退款</div>
							</Link>
						</div>
					</div>
					<div className="myService">
						<div className="title acea-row row-middle">我的服务</div>
						<div className="serviceList acea-row row-middle">
							{
								this.state.MyMenus.map((item, index) => (
								item.wap_url && <div className="item" key={index} onClick={() => { this.goPages(index) }}>
									<div className="pictrue">
										<img src={item.pic} alt="" />
									</div>
									<div>{item.name}</div>
								</div>
								))
							}
						</div>
					</div>
				</div>
			</UserCss>
		)
	}

	goPages(index) {
    let url = this.state.MyMenus[index].wap_url
    if(url ==='/user/user_promotion'){
      return Toast.offline('我的推广功能还没开发，请耐心等候', 1.5)
    }else if(url === '/user/account'){
      return Toast.offline('我的余额功能还没开发，请耐心等候', 1.5)
    }else if(url === '/user/add_manage'){
      return Toast.offline('地址信息功能还没开发，请耐心等候', 1.5)
    }else if(url === '/activity/bargain/record'){
      return Toast.offline('砍价记录功能还没开发，请耐心等候', 1.5)
    }else if(url === '/customer/list'){
      return Toast.offline('联系客服功能还没开发，请耐心等候', 1.5)
    }

		if (url === "/user/user_promotion" && this.state.userInfo.statu === 1) {
			if (!this.state.userInfo.is_promoter){
				return Toast.info('您还没有推广权限！！', 1.5)
			}
		}
		if (url === "/customer/index" && !this.state.userInfo.adminid) {
			return Toast.info('您还不是客服！！', 1.5)
		}
		this.props.history.push(url)
	}
}
