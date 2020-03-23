import React, { Component } from 'react'
import logo2 from '../../assets/images/logo2.png'
import cookie from "../../utils/store/cookie";
import { registerVerify, registerReset } from '../../api/user'
import { checkPhone } from '../../utils/index'
// import { connect } from 'react-redux'

import { Toast } from 'antd-mobile'
class RetrievePassword extends Component {
	constructor(props) {
		super(props)
		this.state = {
			logoUrl: "",
			navList: ["账号登录", "快速登录"],
			current: 1,
			account: "",
			password: "",
			captcha: "",
			formItem: 1,
			type: "login",
			disabled: false,
			text: '获取验证码',
		}
	}

	render() {
		return (
			<div className="register absolute">
				<div className="shading">
					<div className="pictrue acea-row row-center-wrapper">
						{
							this.state.logoUrl ? <img src={this.state.logoUrl} alt="" />
								: <img src={logo2} alt="" />
						}
					</div>
				</div>

				<div className="whiteBg">
					<div className="title">找回密码</div>
					<div className="list">
						<div className="item">
							<div>
								<svg className="icon" id="icon-phone_" viewBox="0 0 1024 1024"><path d="M765.125 118.25c15.46875 0 28.125 12.65625 28.125 28.125v731.25c0 15.46875-12.65625 28.125-28.125 28.125H258.875c-15.46875 0-28.125-12.65625-28.125-28.125V146.375c0-15.46875 12.65625-28.125 28.125-28.125h506.25m0-56.25H258.875C212.1875 62 174.5 99.6875 174.5 146.375v731.25c0 46.6875 37.6875 84.375 84.375 84.375h506.25c46.6875 0 84.375-37.6875 84.375-84.375V146.375c0-46.6875-37.6875-84.375-84.375-84.375z" fill="#464F66"></path><path d="M793.25 652.625H230.75v56.25h562.5v-56.25z" fill="#464F66"></path><path d="M512 807.3125m-42.1875 0a42.1875 42.1875 0 1 0 84.375 0 42.1875 42.1875 0 1 0-84.375 0Z" fill="#F35749"></path></svg>
								<input type="text" placeholder="输入手机号码" value={this.state.account} onChange={this.accountChange} />
							</div>
						</div>
						<div className="item">
							<div className="align-left">
								<svg className="icon" id="icon-code_1" viewBox="0 0 1024 1024"><path d="M793.25 455.75c15.46875 0 28.125 12.65625 28.125 28.125v393.75c0 15.46875-12.65625 28.125-28.125 28.125H202.625c-15.46875 0-28.125-12.65625-28.125-28.125V483.875c0-15.46875 12.65625-28.125 28.125-28.125h590.625m0-56.25H202.625c-46.6875 0-84.375 37.6875-84.375 84.375v393.75c0 46.6875 37.6875 84.375 84.375 84.375h590.625c46.6875 0 84.375-37.6875 84.375-84.375V483.875c0-46.6875-37.6875-84.375-84.375-84.375z" fill="#464F66"></path><path d="M497.9375 794.65625c-15.46875 0-28.125-12.65625-28.125-28.125v-168.75c0-15.46875 12.65625-28.125 28.125-28.125s28.125 12.65625 28.125 28.125v168.75c0 15.75-12.65625 28.125-28.125 28.125z" fill="#F35749"></path><path d="M238.90625 346.34375c28.6875-116.4375 133.875-203.0625 259.03125-203.0625s230.34375 86.625 259.03125 203.0625h57.9375C785.09375 198.40625 654.59375 87.03125 497.9375 87.03125S210.5 198.40625 180.96875 346.34375h57.9375z" fill="#464F66"></path></svg>
								<input
									type="text"
									placeholder="填写验证码"
									className="codeIput"
									value={this.state.captcha}
									onChange={this.captchaChange}
								/>
								<button
									disabled={this.state.disabled}
									className={`code ${this.state.disabled === true ? 'on' : ''}`}
									onClick={this.code}
								>
									{this.state.text}
								</button>
							</div>
						</div>
						<div className="item">
							<div>
								<svg className="icon" id="icon-code_" viewBox="0 0 1024 1024"><path d="M793.25 455.75c15.46875 0 28.125 12.65625 28.125 28.125v393.75c0 15.46875-12.65625 28.125-28.125 28.125H202.625c-15.46875 0-28.125-12.65625-28.125-28.125V483.875c0-15.46875 12.65625-28.125 28.125-28.125h590.625m0-56.25H202.625c-46.6875 0-84.375 37.6875-84.375 84.375v393.75c0 46.6875 37.6875 84.375 84.375 84.375h590.625c46.6875 0 84.375-37.6875 84.375-84.375V483.875c0-46.6875-37.6875-84.375-84.375-84.375zM238.90625 346.34375c28.6875-116.4375 133.875-203.0625 259.03125-203.0625s230.34375 86.625 259.03125 203.0625h57.9375C785.09375 198.40625 654.59375 87.03125 497.9375 87.03125S210.5 198.40625 180.96875 346.34375h57.9375z" fill="#464F66"></path><path d="M301.34375 638h85.78125v85.78125H301.34375zM455.1875 638h85.78125v85.78125h-85.78125zM608.75 638h85.78125v85.78125h-85.78125z" fill="#F35749"></path></svg>
								<input type="text" placeholder="填写您的登录密码" value={this.state.password} onChange={this.passwordChange} />
							</div>
						</div>
					</div>
					<div className="logon" onClick={this.registerReset}>确认</div>
					<div className="tip"><span className="font-color-red" onClick={() => { this.props.history.push('/login') }}>立即登录</span></div>
				</div>
				<div className="bottom"></div>
			</div >
		)
	}

	sendCode() {
		let countDown = 60
		countDown = cookie.get('secondsremained') || countDown
		const timer = setInterval(() => {
			if (countDown <= 0) {
				clearInterval(timer)
				this.setState({
					disabled: false,
					text: '重新获取'
				})
			} else {
				this.setState({
					disabled: true,
					text: `剩余 ${countDown}s`
				})
				countDown--
			}
			cookie.set('secondsremained', countDown, 1)
		}, 1000)
	}

	code = () => {
		if (!this.state.account) {
			Toast.info('请输入手机号码', 1.5)
			return
		} else if (checkPhone(this.state.account)) {
			Toast.info('请输入正确手机号码', 1.5)
			return
		}
		if (this.state.formItem === 2) {
			this.setState({
				type: 'register'
			})
		}
		registerVerify({ phone: this.state.account, type: this.state.type }).then(res => {
			Toast.info(res.msg, 1.5)
			this.sendCode();
		}).catch(err => {
			Toast.info(err.msg, 1.5)
		})

	}

	accountChange = (e) => {
		this.setState({
			account: e.target.value
		})
	}

	captchaChange = (e) => {
		this.setState({
			captcha: e.target.value
		})
	}
	passwordChange = (e) => {
		this.setState({
			password: e.target.value
		})
	}

	submitBtn(e) {
		e.preventDefault()
	}

	loginMobile = () => {
	}

	registerReset = () => {
		if (!this.state.account) {
			Toast.info('请输入手机号码', 1.5)
			return
		} else if (checkPhone(this.state.account)) {
			Toast.info('请输入正确手机号码', 1.5)
			return
		}
		if (!this.state.captcha) {
			Toast.info('请输入验证码', 1.5)
			return
		}
		if (!this.state.password) {
			Toast.info('请输入登录密码', 1.5)
			return
		}
		registerReset({
			account: this.state.account,
			captcha: this.state.captcha,
			password: this.state.password
		}).then(res => {
			cookie.remove('secondsremained')
			Toast.info(res.msg, 1.5, () => {
				this.props.history.push('/login')
			})
		}).catch(err => {
			Toast.info(err.msg, 1.5)
		})
	}
}
export default RetrievePassword
