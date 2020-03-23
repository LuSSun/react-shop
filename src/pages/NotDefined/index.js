import React, { Component } from 'react'
import img404 from '../../assets/images/404.png'
import CurrentPage from './css.js'
export default class NotDefined extends Component {
	render() {
		return (
			<CurrentPage className="not-defined">
				{/* <div className="not-defined"> */}
					<img src={img404} alt="" />
					<div className="content">
						<h3 className="title">页面未找到</h3>
						<span>抱歉！您访问的页面不存在，请返回上一级或点击下方按钮返回首页...</span
						>
					</div>
					<div className="btn" onClick={this.back}>
						返回首页
				</div>
				{/* </div> */}
			</CurrentPage>

		)

	}
	back = () => {
		this.props.history.push('/')
	}
}
