import React, { Component } from 'react';
import { Modal, Toast } from 'antd-mobile'
import img from '@/assets/images/noCoupon.png'
import { getCouponReceive } from "@/api/user";

class CouponPop extends Component {
  render() {
    const list = this.props.coupon.list
    return (
      <div >
        <Modal
          popup
          visible={this.props.coupon.coupon}
          onClose={this.onClose}
          animationType="slide-up"
          className="my-popup"
        >
          <div className="coupon-list-window">
            <div className="title">
              优惠券
            <span className="iconfont icon-guanbi" onClick={this.onClose}></span>
            </div>
            {
              list.length > 0 ? <div className="coupon-list">
                {
                  list.map((item, index) => (
                    <div className="item acea-row row-center-wrapper" key={index} onClick={() => this.getCouponUser(index, item.id)}>
                      <div className="money">
                        ￥<span className="num">{item.coupon_price}</span>
                      </div>
                      <div className="text">
                        <div className="condition line1">
                          购物满{item.use_min_price}元可用
                      </div>
                        <div className="data acea-row row-between-wrapper">
                          <div>
                            {item.start_time ? item.start_time + "-" : ""
                            }{item.end_time}
                          </div>
                          <div
                            className={`bnt acea-row row-center-wrapper ${!item.is_use ? 'bg-color-red' : 'gray'}`}>
                            {!item.is_use ? "立即领取" : "已领取"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div> :
                <div className="pictrue" >
                  <img src={img} className="image" alt="" />
                </div>
            }
          </div>
        </Modal >
      </div>
    );
  }

  onClose = () => {
    this.props.changeFun({
      action: "changecoupon", value: false
    })
  }
  getCouponUser(index, id) {
    const list = this.props.coupon.list
    if (list[index].is_use) return
    getCouponReceive(id).then(res => {
      Toast.info('已领取', 1.5)
      list[index].is_use = true
      this.props.changeFun({
        action: "changecoupon",
        value: false,
        list: list
      })
    })
  }
}

export default CouponPop
