import React, { Component } from 'react';
import noCouponIcon from '@/assets/images/noCoupon.png'
import { getCoupon, getCouponReceive } from "@/api/user";
import cookie from '../../utils/store/cookie'
import { ListView, ActivityIndicator, Toast } from 'antd-mobile';
import { toLogin } from '../../libs/login'
class GetCoupon extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      page: 1,
      limit: 10,
      couponsList: [],
      isLoading: true,
      loadend: false
    }
  }

  componentDidMount() {
    this.getUseCoupons();
  }

  onEndReached = (e) => {

    if (!this.state.loadend) {
      this.setState({ isLoading: true })
      this.getUseCoupons()
    }

  }

  render() {
    const { dataSource } = this.state
    const rowList = (item, sectionID, index) => {
      const dom = (item) => {
        if (item.is_use === true) {
          return <div className="bnt gray">已领取</div>
        } else if (item.is_use === 2) {
          return <div className="bnt gray" >已领完</div>
        } else {
          return <div className="bnt bg-color-red"
            onClick={() => this.getCoupon(item.id, index)}
          >
            立即领取
             </div>
        }
      }
      return (
        <div className="item acea-row row-center-wrapper" key={index}>
          <div className={`money ${item.is_use ? 'moneyGray' : ''}`}>
            ￥<span className="num">{item.coupon_price}</span>
          </div>
          <div className="text">
            <div className="condition line1">
              购物满{item.use_min_price}元可用
                </div>
            <div className="data acea-row row-between-wrapper">
              {
                item.end_time !== 0 ? <div>
                  {item.start_time ? item.start_time + "-" : ""
                  }{item.end_time}
                </div>
                  : <div>不限时</div>
              }
              {dom(item)}
            </div>
          </div>
        </div>
      )
    }
    return (
      <section>
        <div className="coupon-list">
          <ListView
            dataSource={dataSource.cloneWithRows(this.state.couponsList)}
            renderFooter={() => (<div style={{ padding: '0.2rem 0.6rem', width: '2.7rem', margin: '0 auto' }}>
              {this.state.isLoading ? <ActivityIndicator style={{ justifyContent: 'center' }}
                text="加载中"
              /> : '没有数据了'}
            </div>)}
            renderRow={rowList}
            pageSize={this.state.limit}
            useBodyScroll
            scrollRenderAheadDistance={1000}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
          />
        </div>
        {
          (this.state.couponsList.length === 0 && this.state.page > 1) &&
          <div className="noCommodity" >
            <div className="noPictrue">
              <img src={noCouponIcon} className="image" alt="" />
            </div>
          </div>
        }
      </section>
    );
  }

  getUseCoupons() {
    const params = { page: this.state.page, limit: this.state.limit }
    getCoupon(params).then(res => {
      const couponsList = this.state.couponsList.concat(res.data)
      this.setState({
        couponsList: couponsList,
        page: this.state.page + 1,
        isLoading: false,
        loadend: res.data.length < this.state.limit
      })

    })
  }
  getCoupon(id, index) {
    if (!cookie.has('login_status')) {
      toLogin({ history: this.props.history, location: this.props.location })
      return
    }
    getCouponReceive(id).then(res => {
      const list = this.state.couponsList
      list[index].is_use = true

      this.setState({
        couponsList: list
      })
      Toast.info('领取成功', 1.5)
    })
  }
}

export default GetCoupon
