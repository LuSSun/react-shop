import React, { Component } from 'react';
import noCouponIcon from '@/assets/images/noCoupon.png'
import { getCouponsUser } from "@/api/user";

class UserCoupon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      couponsList: [],
      loading: false
    }
  }
  componentDidMount(){
    this.getUseCoupons()
  }

  render() {
    return (
      this.state.couponsList.length > 0 && <div className="coupon-list">
        {
          this.state.couponsList.map((item, index) => (
            <div className="item acea-row row-center-wrapper" key={index}>
              <div className={`money ${item._type === 0 ? 'moneyGray' : ''}`}>
                ￥<span className="num" style={{fontSize:'0.4rem'}}>{item.coupon_price}</span>
              </div>
              <div className="text">
                <div className="condition line1">{item.coupon_title}</div>
                <div className="data acea-row row-between-wrapper">
                  {
                    item._end_time === 0 ? <div>不限时</div>
                      : <div>{item._add_time}-{item._end_time}</div>
                  }
                  {
                    item._type === 0 ? <div className="bnt gray" >{item._msg}</div>
                      : <div className="bnt bg-color-red">{item._msg}</div>
                  }
                </div>
              </div>
            </div>
          ))
        }
        {
          (this.state.couponsList.length === 0 && this.state.loading === true) && <div className="noCommodity">
            <div className="noPictrue">
              <img src={noCouponIcon} className="image" alt="" />
            </div>
          </div>
        }
      </div>

    )
  }
  async getUseCoupons() {
    const type = 0
    const res = await getCouponsUser(type)
    this.setState({
      couponsList: res.data,
      loading: true
    })
  }
  getData() {
    return
  }
}

export default UserCoupon
