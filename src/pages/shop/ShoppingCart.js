

import React from 'react'
import { Link } from 'react-router-dom'
import noCartImg from '@/assets/images/noCart.png'
import Recommend from '../../components/Recommend'

import {
  getCartList,
  postCartDel,
  changeCartNum,
  getCartCount
} from "@/api/store";
import { postCollectAll } from "@/api/user";
import cookie from '../../utils/store/cookie'
import { mul, add } from "@/utils/bc";
import debounce from "lodash.debounce";
import { Toast } from 'antd-mobile'
const CHECKED_IDS = "cart_checked";

class GoodValid extends React.Component {

  switchSelect(e, index) {
    this.props.switchSelect(index)
  }
  reduce(e, index) {
    e.preventDefault()
    this.props.reduce(index)
  }
  plus(e, index) {
    e.preventDefault()
    this.props.plus(index)
  }
  goodsOpen = () => {

  }
  delInvalidGoods = () => {

  }

  render() {
    const { cartList, goodsHidden } = this.props
    return (
      <section>
        <div className="list">
          {
            cartList.valid.map((item, index) => (
              <div className="item acea-row row-between-wrapper" key={index}>
                <div className="select-btn">
                  <div className="checkbox-wrapper">
                    <label className="well-check">
                      <input
                        type="checkbox"
                        name=""
                        value=""
                        checked={item.checked}
                        onChange={(e) => this.switchSelect(e, index)}
                      />
                      <i className="icon"></i>
                    </label>
                  </div>
                </div>
                <div className="picTxt acea-row row-between-wrapper">
                  <Link className="pictrue" to={`/detail/${item.product_id}`}>
                    {
                      item.productInfo.attrInfo ?
                        <img src={item.productInfo.attrInfo.image} alt="" />
                        : <img src={item.productInfo.image} alt="" />
                    }
                  </Link>
                  <div className="text">
                    <div className="line1">{item.productInfo.store_name}</div>
                    {
                      item.productInfo.attrInfo && <div className="infor line1">
                        属性：{item.productInfo.attrInfo.suk}
                      </div>
                    }
                    <div className="money">￥{item.truePrice}</div>
                  </div>
                  <div className="carnum acea-row row-center-wrapper">
                    <div className={`reduce ${cartList.valid[index].cart_num <= 1 ? 'on' : ''}`} onClick={(e) => { this.reduce(e, index) }}>-</div>
                    <div className="num">{item.cart_num}</div>
                    {
                      cartList.valid[index].attrInfo ?
                        <div className={`plus ${cartList.valid[index].cart_num >=
                          cartList.valid[index].attrInfo.stock
                          ? 'on'
                          : ''}`} onClick={(e) => this.plus(e, index)}>+

                      </div>
                        : <div className={`plus ${cartList.valid[index].cart_num >= cartList.valid[index].stock ? 'on' : ''}`} onClick={(e) => this.plus(e, index)}>+</div>
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {
          cartList.invalid.length.length > 0 && <div className="invalidGoods">
            <div className="goodsNav acea-row row-between-wrapper">
              <div onClick={this.goodsOpen}>
                <span
                  className={`iconfont ${goodsHidden === true ? 'icon-xiangyou' : 'icon-xiangxia'}`}></span>失效商品
              </div>
              <div className="del" onClick={this.delInvalidGoods}>
                <span className="iconfont icon-shanchu1"></span>清空
              </div>
            </div>
            <div className="goodsList" style={{ display: goodsHidden ? 'none' : 'block' }}>
              {
                cartList.invalid.map((item, index) => (
                  <Link className="item acea-row row-between-wrapper"
                    to={`detail/${item.product_id}`}
                    key={index}
                  >
                    <div className="invalid acea-row row-center-wrapper">失效</div>
                    <div className="pictrue">
                      {
                        item.productInfo.attrInfo ? <img src="item.productInfo.attrInfo.image" alt="" />
                          : <img src="item.productInfo.image" alt="" />
                      }
                    </div>
                    <div className="text acea-row row-column-between">
                      <div className="line1">{item.productInfo.store_name}</div>
                      {
                        item.productInfo.attrInfo && <div className="infor line1">
                          属性：{item.productInfo.attrInfo.suk}
                        </div>
                      }
                      <div className="acea-row row-between-wrapper">
                        <div className="end">该商品已下架</div>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        }
      </section>
    )
  }
}


class ShoppingCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartList: { invalid: [], valid: [] },
      isAllSelect: false,
      cartCount: 0,
      countmoney: 0,
      goodsHidden: true,
      footerswitch: false,
      count: 0,
      checkedIds: [],
      loaded: false
    }
  }

  componentDidMount() {
    this.carnum();
    this.gainCount()
    this.getCartList()

  }

  render() {
    const { cartList, footerswitch, count, countmoney, goodsHidden, isAllSelect, cartCount } = this.state
    return (
      <div className="shoppingCart">
        <div className="labelNav acea-row row-around row-middle">
          <div className="item">
            <span className="iconfont icon-xuanzhong"></span>100%正品保证
          </div>
          <div className="item">
            <span className="iconfont icon-xuanzhong"></span>所有商品精挑细选
          </div>
          <div className="item">
            <span className="iconfont icon-xuanzhong"></span>售后无忧
           </div>
        </div>
        <div className="nav acea-row row-between-wrapper">
          <div>
            购物数量 <span className="num font-color-red">{count}</span>
          </div>
          {
            cartList.valid.length > 0 && <div
              className="administrate acea-row row-center-wrapper"
              onClick={this.manage}
            >
              {footerswitch ? "取消" : "管理"}
            </div>
          }
        </div>
        {
          (cartList.valid.length > 0 || cartList.invalid.length > 0) &&
          <GoodValid
            cartList={cartList}
            goodsHidden={goodsHidden}
            switchSelect={this.switchSelect}
            reduce={this.reduce}
            plus={this.plus}

          ></GoodValid>
        }
        {/* 购物车暂无商品 */}
        {
          (cartList.valid.length === 0 && cartList.invalid.length === 0) &&
          <div className="noCart">
            <div className="pictrue"><img src={noCartImg} alt="" /></div>
            <Recommend></Recommend>
          </div>
        }
        <div style={{ height: '1rem' }}></div>
        {
          cartList.valid.length > 0 && <div className="footer acea-row row-between-wrapper">
            <div>
              <div className="select-btn">
                <div className="checkbox-wrapper">
                  <label className="well-check">
                    <input
                      type="checkbox"
                      name=""
                      value=""
                      checked={isAllSelect && cartCount > 0}
                      onChange={this.allChecked}
                    />
                    <i className="icon"></i>
                    <span className="checkAll">全选 ({cartCount})</span>
                  </label>
                </div>
              </div>
            </div>
            {
              footerswitch === false ? <div className="money acea-row row-middle">
                <span className="font-color-red">￥{countmoney}</span>
                <div className="placeOrder bg-color-red" onClick={this.placeOrder}>立即下单</div>
              </div>
                : <div className="button acea-row row-middle">
                  <div className="bnt cart-color" onClick={this.collectAll}>收藏</div>
                  <div className="bnt" onClick={this.delgoods}>删除</div>
                </div>
            }
          </div>
        }
      </div>
    )
  }

  async getCartList() {
    try {
      const res = await getCartList()
      let cartList = res.data
      let checkedIds = cookie.get(CHECKED_IDS) || [];
      if (!Array.isArray(checkedIds)) checkedIds = [];
      cartList.valid.forEach(cart => {
        if (checkedIds.length) {
          if (checkedIds.indexOf(cart.id) !== -1) cart.checked = true;
          else cart.checked = false;
        } else {
          cart.checked = true;
          this.setState({
            checkedIds: [
              ...this.state.checkedIds,
              cart.id
            ]
          })
        }
      });
      if (checkedIds.length) {
        this.setState({
          checkedIds: checkedIds
        })
      }
      setTimeout(() => {
        let isAllSelect = this.state.checkedIds.length === cartList.valid.length
        this.setState({
          cartList: cartList,
          isAllSelect: isAllSelect
        }, () => {
          this.carnum()
          this.countMoney()
        })
      }, 0);
    } catch (err) {

    }


  }
  carnum() {
    let carnum = 0;
    var array = this.state.cartList.valid;
    for (let i = 0; i < array.length; i++) {
      if (array[i].checked === true) {
        carnum += parseInt(array[i].cart_num);
      }
    }
    this.setState({
      cartCount: carnum
    })
  }
  placeOrder = () => {
    let id = [], list = this.state.cartList.valid
    list.forEach(function (val) {
      if (val.checked === true) {
        id.push(val.id);
      }
    });
    if (id.length === 0) {
      Toast.info('请选择产品', 1.5)
      return
    }
    Toast.success('正在下单', 1.5)
  }
  // 收藏
  collectAll = () => {
    let data = { id: [], category: "" },
      list = this.state.cartList.valid;
    list.forEach(val => {
      if (val.checked === true) {
        data.id.push(val.product_id)
        data.category = val.type
      }
    })
    if (data.id.length === 0) {
      Toast.info('请选择产品', 1.5)
      return;
    }
    postCollectAll(data).then(() => {
      Toast.info('收藏成功', 1.5)
    })
  }
  // 删除
  delgoods = () => {
    let id = [], valid = [], list = this.state.cartList.valid
    list.forEach(function (val) {
      if (val.checked === true) {
        id.push(val.id);
      }
    });
    if (id.length === 0) {
      Toast.info('请选择产品', 1.5)
      return
    }
    postCartDel(id).then(res => {
      list.forEach((val, i) => {
        if (val.checked === false || val.checked === undefined) {
          valid.push(val)
        }
        this.setState({
          cartList: {
            ...this.state.cartList,
            valid: valid
          }
        }, () => {
          Toast.info('删除成功', 1.5)

          this.carnum();
          this.countMoney();
          this.gainCount();
        })
      })
    }).catch(err => {
      Toast.info(err.msg, 1.5)
    })
  }
  // 全选
  allChecked = () => {
    let list = this.state.cartList.valid
    let selectAllStatus = this.state.isAllSelect;
    selectAllStatus = !selectAllStatus;
    let checkedIds = [];
    list.forEach(cart => {
      cart.checked = selectAllStatus;
      if (selectAllStatus) {
        checkedIds.push(cart.id)
      }
    })
    this.setState({
      cartList: {
        ...this.state.cartList,
        valid: list
      },
      isAllSelect: selectAllStatus,
      checkedIds: checkedIds
    }, () => {
      this.carnum();
      this.countMoney();
    })
  }
  switchSelect = (index) => {
    let list = this.state.cartList.valid
    list[index].checked = !list[index].checked
    let cart = list[index],
      i = this.state.checkedIds.indexOf(cart.id),
      checkedIds = this.state.checkedIds
    if (i !== -1) {
      checkedIds.splice(index, 1)
      this.setState({ checkedIds: checkedIds })
    }
    if (cart.checked) {
      this.setState({
        checkedIds: [
          ...this.state.checkedIds,
          cart.id
        ]
      })
    }
    // 出现异步数据
    setTimeout(() => {
      let len = list.length
      let selectnum = []
      for (let i = 0; i < len; i++) {
        if (list[i].checked === true) {
          selectnum.push(true);
        }
      }
      let isAllSelect = selectnum.length === len
      this.setState({
        cartList: {
          ...this.state.cartList,
          valid: list
        },
        isAllSelect: isAllSelect
      }, () => {
        cookie.set(CHECKED_IDS, this.state.checkedIds);
        this.carnum();
        this.countMoney();
      })
    }, 500);

  }
  // 减
  reduce = (index) => {
    let list = this.state.cartList.valid,
      obj = list[index]
    obj.cart_num--
    if (obj.cart_num < 1) {
      obj.cart_num = 1
      this.setState({
        cartList: {
          ...this.state.cartList,
          valid: list
        }
      })
    }
    setTimeout(() => {
      this.carnum();
      this.countMoney();
      this.syncCartNum(obj);
    }, 0);
  }
  // 加
  plus = (index) => {
    let list = this.state.cartList.valid,
      obj = list[index]
    obj.cart_num++
    if (obj.attrInfo) {
      if (obj.cart_num >= obj.attrInfo.stock) {
        obj.cart_num = obj.attrInfo.stock
        this.setState({
          cartList: {
            ...this.state.cartList,
            valid: list
          }
        })
      }
    } else {
      if (obj.cart_num >= obj.stock) {
        obj.cart_num = obj.stock
        this.setState({
          cartList: {
            ...this.state.cartList,
            valid: list
          }
        })
      }
    }

    setTimeout(() => {
      this.carnum();
      this.countMoney();
      this.syncCartNum(obj);
    }, 0);
  }
  // 管理
  manage = () => {
    this.setState({
      footerswitch: !this.state.footerswitch
    })
  }
  async gainCount() {
    const res = await getCartCount()
    this.setState({
      count: res.data.count
    })
  }
  countMoney() {
    let carmoney = 0;
    let array = this.state.cartList.valid;
    for (let i = 0; i < array.length; i++) {
      if (array[i].checked === true) {
        carmoney = add(carmoney, mul(array[i].cart_num, array[i].truePrice));
      }
    }
    this.setState({ countmoney: carmoney })
  }
  syncCartNum(cart) {
    if (!cart.sync) {
      cart.sync = debounce(() => {
        changeCartNum(cart.id, Math.max(cart.cart_num, 1) || 1)
      }, 500)
    }
    cart.sync()
  }
}

export default ShoppingCart;
