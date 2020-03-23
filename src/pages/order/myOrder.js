import React, { Component } from 'react'
import { isWeixin } from "@/utils";
import orderTimeImg from '@/assets/images/orderTime.png'
import noOrderImg from '@/assets/images/noOrder.png'
import { getOrderData, getOrderList } from "@/api/public";
import styled from 'styled-components'
import { ListView, ActivityIndicator } from 'antd-mobile'
const NoDataCss = styled.div`
  &.noCart {
    margin-top: 0.17rem;
    padding-top: 0.1rem;
    .pictrue {
      width: 4rem;
      height: 3rem;
      margin: 0.7rem auto 0.5rem auto;
      img {
      width: 100%;
      height: 100%;
      }
    }
  }
`

const STATUS = [
  "待付款",
  "待发货",
  "待收货",
  "待评价",
  "已完成",
  "",
  "",
  "",
  "",
  "待付款"
];

export default class myOrder extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      offlinePayStatus: 2,
      orderData: {},
      type: parseInt(this.props.match.params.type) || 0,
      page: 1,
      limit: 20,
      loaded: false,
      loading: false,
      orderList: [],
      pay: false,
      payType: ["yue", "weixin"],
      from: isWeixin() ? "weixin" : "weixinh5"
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.type !== this.props.match.params.type) {
      this.setState({
        ...this.state,
        type: parseInt(nextProps.match.params.type) || 0,
        page: 1,
        limit: 20,
        loaded: false,
        loading: false,
        orderList: [],
      }, () => {
        this.getOrderData();
        this.getOrderList();
      })
    }
  }

  componentDidMount() {
    this.getOrderData();
    this.getOrderList();
  }
  onEndReached=()=>{
    if (!this.state.loadend) {
      this.setState({ loading: true })
      this.getOrderList()
    }
  }
  render() {
    const rowList = (order) => {
      return (
        <div className="item" key={order.id}>
          <div className="title acea-row row-between-wrapper">
            <div className="acea-row row-middle">
              {
                order.combination_id > 0 &&
                <span className="sign cart-color acea-row row-center-wrapper">拼团</span>

              }
              {
                order.seckill_id > 0 &&
                <span className="sign cart-color acea-row row-center-wrapper">秒杀</span>
              }
              {
                order.bargain_id > 0 &&
                <span className="sign cart-color acea-row row-center-wrapper">砍价</span>
              }
              {order._add_time}
            </div>
            <div className="font-color-red">{this.getStatus(order)}</div>
          </div>
          <div onClick={() => this.props.history.push(`/order/detail/${order.order_id}`)}>
            {
              order.cartInfo.length && order.cartInfo.map(cart => (
                <div className="item-info acea-row row-between row-top" key={cart.id}>
                  <div className="pictrue">
                    {this.getImg(cart)}
                  </div>
                  <div className="text acea-row row-between">
                    <div className="name line2">
                      {cart.productInfo.store_name}
                    </div>
                    <div className="money">
                      <div>
                        ￥{
                          cart.productInfo.attrInfo
                            ? cart.productInfo.attrInfo.price
                            : cart.productInfo.price
                        }
                      </div>
                      <div>x{cart.cart_num}</div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="totalPrice">
            共{order.cartInfo.length || 0}件商品，总金额
            <span className="money font-color-red">￥{order.pay_price}</span>
          </div>
        </div>
      )
    }
    return (
      <div className="my-order">
        <div className="header bg-color-red">
          <div className="picTxt acea-row row-between-wrapper">
            <div className="text">
              <div className="name">订单信息</div>
              <div>
                累计订单：{this.state.orderData.order_count || 0} 总消费：￥{this.state.orderData.sum_price || 0}
              </div>
            </div>
            <div className="pictrue"><img src={orderTimeImg} alt="" /></div>
          </div>
        </div>
        <div className="nav acea-row row-around">
          <div className={`item ${this.state.type === 0 ? 'on' : ''}`}
            onClick={() => this.props.history.replace('/order/list/0')}
          >
            <div>待付款</div>
            <div className="num"> {this.state.orderData.unpaid_count || 0}</div>
          </div>
          <div className={`item ${this.state.type === 1 ? 'on' : ''}`}
            onClick={() => this.props.history.replace('/order/list/1')}
          >
            <div>待发货</div>
            <div className="num"> {this.state.orderData.unshipped_count || 0}</div>
          </div>
          <div className={`item ${this.state.type === 2 ? 'on' : ''}`}
            onClick={() => this.props.history.replace('/order/list/2')}
          >
            <div>待收货</div>
            <div className="num"> {this.state.orderData.received_count || 0}</div>
          </div>
          <div className={`item ${this.state.type === 3 ? 'on' : ''}`}
            onClick={() => this.props.history.replace('/order/list/3')}
          >
            <div>待评价</div>
            <div className="num"> {this.state.orderData.evaluated_count || 0}</div>
          </div>
          <div className={`item ${this.state.type === 4 ? 'on' : ''}`}
            onClick={() => this.props.history.replace('/order/list/4')}
          >
            <div>已完成</div>
            <div className="num"> {this.state.orderData.complete_count || 0}</div>
          </div>
        </div>
        {
          this.state.orderList.length > 0 && <div className="list">
            <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.orderList)}
              renderFooter={() => (<div style={{ padding: '0.2rem 0.6rem', width: '2.7rem', margin: '0 auto' }}>
                {this.state.loading ? <ActivityIndicator style={{ justifyContent: 'center' }}
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
        }
        {
          (this.state.orderList.length === 0 && this.state.page > 1) && <NoDataCss className="noCart">
            <div className="pictrue"><img src={noOrderImg} alt="" /></div>
          </NoDataCss>
        }
      </div>
    )
  }

  async getOrderData() {
    const res = await getOrderData()
    this.setState({
      orderData: res.data
    })
  }
  async getOrderList() {
    if (this.loading || this.loaded) return;
    const res = await getOrderList({
      page: this.state.page,
      limit: this.state.limit,
      type: this.state.type
    })
    let orderList = this.state.orderList.concat(res.data);
    this.setState({
      orderList: orderList,
      page: this.state.page + 1,
      loading: false,
      loadend: res.data.length < this.state.limit
    })
  }
  getStatus(order) {
    return STATUS[order._status._type];
  }
  getImg(cart) {
    if (cart.combination_id === 0 &&
      cart.bargain_id === 0 &&
      cart.seckill_id === 0) {
      return <img
        src={cart.productInfo.image}
        onClick={(e) => { e.stopPropagation(); this.props.history.push('/detail/' + cart.productInfo.id) }}
        alt=""
      />
    } else if (cart.bargain_id === 0) {
      return <img
        src={cart.productInfo.image}
        onClick={(e) => { e.stopPropagation(); this.props.history.push('/activity/group_detail/' + cart.combination_id) }}
        alt=""
      />
    } else if (cart.bargain_id === 0) {
      return <img
        src={cart.productInfo.image}
        onClick={(e) => { e.stopPropagation(); this.props.history.push('/activity/dargain_detail/' + cart.bargain_id) }}
        alt=""
      />
    } else if (cart.seckill_id === 0) {
      return <img
        src={cart.productInfo.image}
        onClick={(e) => { e.stopPropagation(); this.props.history.push('/activity/seckill_detail/' + cart.seckill_id) }}
        alt=""
      />
    }
  }
}
