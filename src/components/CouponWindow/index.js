import React from 'react'
import { connect } from 'react-redux'
import {toLogin} from "@/libs/login";
import { couponReceiveBatch } from "@/api/user";
import {Toast} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
class CouponWindow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: true
		}
	}
	render() {
		return (
			this.props.couponList.length > 0 && <div>
				<div className={`coupon-window ${this.state.value ? 'on' : ''}`}>
					<div className="couponWinList">
						{
							this.props.couponList.map((item, index) => (
								<div className="item acea-row row-between-wrapper" key={index}>
									<div className="money font-color-red">
										￥<span className="num">{item.coupon_price}</span>
									</div>
									<div className="text">
										<div className="name">
											购物买{item.use_min_price}减{item.coupon_price}
										</div>
										{
											item.end_time && <div>
												{
													item.start_time ? item.start_time + "-" : ""
												}{item.end_time}
											</div>
										}

									</div>
								</div>
							))
						}
						<div style={{ height: '1.2rem' }}></div>
					</div>
					<div className="lid">
						<div className="bnt font-color-red" onClick={this.checked}>立即领取</div>
						<div className="iconfont icon-guanbi3" onClick={this.close}></div>
					</div>
				</div>
				{
					this.state.value && <div className="mask"></div>
				}
			</div>
		)
	}

	checked=()=>{
		if(!this.props.token){
      toLogin({
        history:this.props.history,
        location:this.props.location})
			return
		}
		const ids = this.props.couponList.reduce((initial, coupon) => {
			initial.push(coupon.id);
			return initial;
		}, []);
		couponReceiveBatch(ids).then(res=>{
			Toast.info('领取成功', 1.5)

		}).catch(err=>{
			 Toast.info('已领取', 1.5)

		})

		this.close()
	}
	close=()=>{
		this.setState({
			value: false
		})
		this.props.close()
	}
}
const mapStateToProps = (state, ownProps) => {
  return {
    token: state.app.token
  }
}
export default connect(mapStateToProps)(withRouter(CouponWindow))
