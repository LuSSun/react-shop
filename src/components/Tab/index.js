import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
const footerList = [
	{
		name: "首页",
		icon1: "icon-shouye-xianxing",
		icon2: "icon-shouye",
		url: "/"
	},
	{
		name: "分类",
		icon1: "icon-yingyongchengxu-xianxing",
		icon2: "icon-yingyongchengxu",
		url: "/category"
	},
	{
		name: "购物车",
		icon1: "icon-caigou-xianxing",
		icon2: "icon-caigou",
		url: "/cart"
	},
	{
		name: "我的",
		icon1: "icon-yonghu-xianxing",
		icon2: "icon-yonghu",
		url: "/user"
	}
]
class Tab extends Component {
	changeIndex(item) {
		this.props.history.push(item.url)
	}

	render() {
		const location = this.props.location
		let showTab = false
		footerList.forEach((item, index) => {
			if (item.url === location.pathname) {
				showTab = true
			}
		})

		return (
			showTab ? <div id="footer" className="acea-row row-middle">
				{
					footerList.map((item, index) => {
						return (
							<div

								className={`item ${item.url === location.pathname ? 'on' : ''}`}
								key={index}
								onClick={this.changeIndex.bind(this, item)}
							>
								<div
									className={`iconfont ${item.icon1} ${item.url === location.pathname ? item.icon2 : ''}`}
								></div>
								<div>{item.name}</div>
							</div>
						)
					})
				}
			</div >
				: null

		)
	}
}
export default withRouter(Tab)
