import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import ProductConSwiper from '../../components/ProductSwiper'
import UserEvaluation from '../../components/UserEvaluation'
import CouponPop from '../../components/CouponPop'
import ProductWindow from '../../components/ProductWindow'
import ShareRedPackets from '../../components/ShareRedPackets'
import StorePoster from '../../components/StorePoster'

import vipImg from '@/assets/images/vip.png'
import lingImg from '@/assets/images/ling.png'
import { Link } from 'react-router-dom'
import 'swiper/css/swiper.css'
import Swiper from 'react-id-swiper';
import PageStyle from './styles/goodsDetailStyle'

import {
  getProductDetail,
  postCartAdd,
  getCartCount,
  getProductCode
} from "@/api/store";
import {
  getCoupon,
  getCollectAdd,
  getCollectDel
} from "@/api/user";
import { imageBase64 } from "@/api/public";

import { Toast } from 'antd-mobile'
// 优品推荐
const GoodList = ({ goodList }) => {
  const swpierOptions = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: false,
    loop: false,
    speed: 1000,
    observer: true,
    observeParents: true
  }
  return (
    goodList.length > 0 && <section className="superior">
      <div className="title acea-row row-center-wrapper">
        <img src={lingImg} alt="" />
        <div className="titleTxt">优品推荐</div>
        <img src={lingImg} alt="" />
      </div>
      <div className="slider-banner banner">
        <Swiper {...swpierOptions}>
          {
            goodList.map((item, index) => (
              <div className="list acea-row row-middle" key={index}>
                {
                  item.list.map((val) => (
                    <Link className="item" key={val.image} to={`/detail/${val.id}`}>
                      <div className="pictrue">
                        <img src={val.image} alt="" />
                      </div>
                      <div className="name line1">{val.store_name}</div>
                      <div className="money font-color-red">¥{val.price}</div>

                    </Link>
                  ))
                }
              </div>
            ))
          }
        </Swiper>
      </div>
    </section>
  )
}

class GoodsDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shareInfoStatus: false,
      weixinStatus: false,
      mapShow: false,
      mapKey: "",
      posterData: {
        image: "",
        title: "",
        price: "",
        code: ""
      },
      posterImageStatus: false,
      animated: false,
      coupon: {
        coupon: false,
        list: []
      },
      attr: {
        cartAttr: false,
        productAttr: [],
        productSelect: {}
      },
      isOpen: false, //是否打开属性组件
      productValue: [],
      id: 0,
      storeInfo: {},
      couponList: [],
      attrTxt: "请选择",
      attrValue: "",
      cart_num: 1, //购买数量
      replyCount: "",
      replyChance: "",
      reply: [],
      priceName: 0,
      CartCount: 0,
      posters: false,
      banner: [{}, {}],
      goodList: [],
      system_store: {},
      qqmapsdk: null
    }
  }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    }, () => {
      this.getDetail()
      this.coupons()
    })
  }
  // 新版本 要getDerivedStateFromProps和componentDidUpdate以前使用  替代 componentWillReceiveProps
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.id !== prevState.id) {
      return {
        id: nextProps.match.params.id
      }
    }
    return null
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.id !== prevState.id) {
      this.setState({
        id: this.state.id
      }, () => {
        this.getDetail()
        this.coupons()
        window.scroll(0, 0)
      })
    }
  }

  // react计划17.0 componentWillReceiveProps
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.match.params.id !== this.props.match.params.id) {
  //     this.setState({
  //       id: nextProps.match.params.id
  //     }, () => {
  //       window.scroll(0, 0)
  //       this.getDetail()
  //       this.coupons()
  //     })
  //   }
  // }

  async getDetail() {

    try {
      const res = await getProductDetail(this.state.id)
      let good_list = res.data.good_list || []
      let goodArray = [];
      let count = Math.ceil(good_list.length / 6);
      for (let i = 0; i < count; i++) {
        var list = good_list.slice(i * 6, 6);
        if (list.length) goodArray.push({ list: list });
      }
      let title = '', store_name = res.data.storeInfo.store_name
      if (store_name.length > 30) {
        title = store_name.substring(0, 30) + '...'
      } else {
        title = store_name
      }

      this.setState({
        storeInfo: res.data.storeInfo,
        attr: {
          ...this.state.attr,
          productAttr: res.data.productAttr
        },
        productValue: res.data.productValue,
        replyCount: res.data.replyCount,
        replyChance: res.data.replyChance,
        reply: res.data.reply ? [res.data.reply] : [],
        priceName: res.data.priceName,
        system_store: res.data.system_store,
        mapKey: res.data.mapKey,
        goodList: goodArray,
        posterData: {
          image: res.data.storeInfo.image_base,
          title: title,
          price: res.data.storeInfo.price,
          code: res.data.storeInfo.code_base
        }
      }, () => {
        this.defaultSelect()
        this.getCartCount()
        this.getImageBase64()
      })

      if (res.data.storeInfo.store_name) {
        document.title = res.data.storeInfo.store_name
      }


    } catch (err) {
      Toast.info(err.msg, 1.5)
      this.props.history.go('-1')
    }
  }
  async coupons() {

    const res = await getCoupon({ page: 1, limit: 20 })
    this.setState({
      couponList: res.data || [],
      coupon: {
        ...this.state.coupon,
        list: res.data || []
      }
    })
  }
  getImageBase64() {
    imageBase64(this.state.posterData.image, this.state.posterData.code).then(res => {
      this.setState({
        posterData: {
          ...this.state.posterData,
          image: res.data.image,
          code: res.data.code
        }
      }, () => {
        this.props.token && this.shareCode()
      })
    }).catch(() => {
      this.props.token && this.shareCode()
    })
  }

  render() {
    return (

      <PageStyle>
        <div className={this.state.posterImageStatus ? 'noscroll product-con' : 'product-con'}>
          <ProductConSwiper imgUrls={this.state.storeInfo.slider_image}></ProductConSwiper>
          {
            (this.state.storeInfo && this.state.storeInfo.store_name) && <Fragment>
              <div className="wrapper">
                <div className="share acea-row row-between row-bottom">
                  <div className="money font-color-red">
                    ￥<span className="num">{this.state.storeInfo.price}</span>
                    {
                      (this.state.storeInfo.vip_price && this.state.storeInfo.vip_price > 0) && <span className="vip-money" >￥{this.state.storeInfo.vip_price}</span>
                    }
                    {
                      (this.state.storeInfo.vip_price && this.state.storeInfo.vip_price > 0) && <img
                        src={vipImg}
                        className="image"
                        alt=""
                      />
                    }
                  </div>
                  <div className="iconfont icon-fenxiang" onClick={this.listenerActionSheet}></div>
                </div>
                <div className="introduce">{this.state.storeInfo.store_name}</div>
                <div className="label acea-row row-between-wrapper">
                  <div>原价:￥{this.state.storeInfo.ot_price}</div>
                  <div>库存:{this.state.storeInfo.stock}{this.state.storeInfo.unit_name}</div>
                  <div>销量:{this.state.storeInfo.fsales}{this.state.storeInfo.unit_name}</div>
                </div>
                {
                  this.state.couponList.length > 0 && <div
                    className="coupon acea-row row-between-wrapper"
                    onClick={this.couponTap}
                  >
                    <div className="hide line1 acea-row">
                      优惠券：
                {
                        this.state.couponList.map((item, index) => (
                          <div className="activity" key={index} >
                            满{item.use_min_price}减{item.coupon_price}
                          </div>
                        ))
                      }
                    </div>
                    <div className="iconfont icon-jiantou"></div>
                  </div>
                }
              </div>
              <div className="attribute acea-row row-between-wrapper" onClick={this.selecAttrTap}>
                <div>
                  {this.state.attrTxt}：<span className="atterTxt">{this.state.attrValue}</span>
                </div>
                <div className="iconfont icon-jiantou"></div>
              </div>
            </Fragment>
          }

          {
            (this.state.system_store && this.state.system_store.id) ? <div className="store-info">
              <div className="title">门店信息</div>
              <div className="info acea-row row-between-wrapper">
                <div className="picTxt acea-row row-between-wrapper">
                  <div className="pictrue"><img src={this.state.system_store.image} alt='' /></div>
                  <div className="text">
                    <div className="name line1">
                      {this.state.system_store.name}
                    </div>
                    <div className="address acea-row row-middle" onClick={this.showChang}>
                      <span className="addressTxt line1">
                        {this.state.system_store._detailed_address}
                      </span>
                      <span className="iconfont icon-youjian"></span>
                    </div>
                  </div>
                </div>
                <a className="iconfont icon-dadianhua01 font-color-red"
                  href={`tel: ${this.state.system_store.phone}`}
                >
                </a>
              </div>
            </div> : null
          }
          {/* 用户评价 */}
          {
            this.state.replyCount > 0 && <div className="userEvaluation">
              <div className="title acea-row row-between-wrapper">
                <div>用户评价({this.state.replyCount})</div>
                <Link to={'/evaluate_list/' + this.state.id} className="praise">
                  <span className="font-color-red">{this.state.replyChance}%</span>
                  好评率
                 <span className="iconfont icon-jiantou"></span>
                </Link>
              </div>
              <UserEvaluation reply={this.state.reply}></UserEvaluation>
            </div>
          }
          {/* 优品推荐 */}
          <GoodList goodList={this.state.goodList}></GoodList>
          {
            this.state.storeInfo.description &&
            <div className="product-intro">
              <div className="title">产品介绍</div>
              <div className="conter" dangerouslySetInnerHTML={{ __html: this.state.storeInfo.description }}></div>
            </div>
          }
          <div style={{ height: '1.2rem' }}></div>
          {/* 底部 */}
          <section className="footer acea-row row-between-wrapper">
            <div className="item" onClick={() => { Toast.info('待开发中...', 1.5) }}>
              <div className="iconfont icon-kefu"></div>
              <div>客服</div>
            </div>
            <div className="item" onClick={this.setCollect}>
              <div
                className={`iconfont ${this.state.storeInfo.userCollect ? 'icon-shoucang1' : 'icon-shoucang'}`}
              ></div>
              <div>收藏</div>
            </div>
            <Link
              className={`item animated ${this.state.animated === true ? 'bounceIn' : ''}`}
              to='/cart'
            >
              <div className="iconfont icon-gouwuche1">
                {this.state.CartCount > 0 && <span className="num bg-color-red" >{this.state.CartCount}</span>}
              </div>
              <div>购物车</div>
            </Link>
            <div className="bnt acea-row">
              <div className="joinCart" onClick={this.joinCart}>加入购物车</div>
              <div className="buy" onClick={this.tapBuy}>立即购买</div>
            </div>
          </section>
          <CouponPop coupon={this.state.coupon} changeFun={this.changeFun} ></CouponPop>
          <ProductWindow attr={this.state.attr} selectProduct={this.selectProduct}></ProductWindow>
          <ShareRedPackets priceName={this.state.priceName} sharePackets={this.sharePackets}></ShareRedPackets>
          <StorePoster
            posterImageStatus={this.state.posterImageStatus}
            posterData={this.state.posterData}
            setPosterImageStatus={this.setPosterImageStatus}
          ></StorePoster>
          <div className={`generate-posters acea-row row-middle ${this.state.posters ? 'on' : ''}`}
          >

            <div className="item" onClick={this.setPosterImageStatus}>
              <div className="iconfont icon-haibao"></div>
              <div className="">生成海报</div>
            </div>
          </div>
          {
            this.state.posters &&
            <div
              className="mask"
              onTouchMove={(e) => { e.preventDefault() }}
              onClick={() => { this.setState({ posters: false }) }}
            ></div>
          }
        </div>

      </PageStyle>

    );
  }

  defaultSelect() {
    let productAttr = this.state.attr.productAttr;
    let value = []
    for (let i = 0; i < productAttr.length; i++) {
      productAttr[i].index = 0
      value.push(productAttr[i].attr_values[0])
    }
    this.setState({
      attr: {
        ...this.state.arr,
        productAttr: productAttr
      }
    })
    //sort();排序函数:数字-英文-汉字；
    let productSelect = this.state.productValue[value.sort().join(",")];
    if (productSelect && productAttr.length > 0) {
      this.setState({
        attr: {
          ...this.state.attr,
          productSelect: {
            ...this.state.attr.productSelect,
            store_name: this.state.storeInfo.store_name,
            image: productSelect.image,
            price: productSelect.price,
            stock: productSelect.stock,
            unique: productSelect.unique,
            cart_num: 1
          }
        },
        attrValue: value.sort().join(","),
        attrTxt: '已选择'
      })
    } else if (!productSelect && productAttr.length > 0) {
      this.setState({
        attr: {
          ...this.state.attr,
          productSelect: {
            ...this.state.attr.productSelect,
            store_name: this.state.storeInfo.store_name,
            image: this.state.storeInfo.image,
            price: this.state.storeInfo.price,
            stock: 0,
            unique: '',
            cart_num: 0
          }
        },
        attrValue: '',
        attrTxt: '请选择'
      })
    } else if (!productSelect && productAttr.length <= 0) {
      this.setState({
        attr: {
          ...this.state.attr,
          productSelect: {
            ...this.state.attr.productSelect,
            store_name: this.state.storeInfo.store_name,
            image: this.state.storeInfo.image,
            price: this.state.storeInfo.price,
            stock: this.state.storeInfo.stock,
            unique: this.state.storeInfo.unique || '',
            cart_num: 1
          }
        },
        attrValue: '',
        attrTxt: '请选择'
      })
    }
  }
  async getCartCount(isAnima) {
    if (this.props.token) {
      const res = await getCartCount({ numType: 0 })
      this.setState({
        CartCount: res.data.count
      })
      if (isAnima) {
        this.setState({
          animated: true
        })
        setTimeout(() => {
          this.setState({
            animated: false
          })
        }, 500);
      }
    }

  }

  shareCode(value) {
    getProductCode(this.state.id).then(res => {
      if (res.data.code) {
        this.setState({
          posterData: {
            ...this.state.posterData,
            code: res.data.code
          }
        }, () => {
          value === false && this.listenerActionSheet()
        })
      }
    })

  }

  // 分享
  listenerActionSheet = () => {
    this.setState({
      posters: true
    })
  }
  // 优惠券
  couponTap = () => {
    // this.coupons()
    this.setState({
      coupon: {
        ...this.state.coupon,
        coupon: true
      }
    })
  }
  // 已选择
  selecAttrTap = () => {
    this.setState({
      attr: {
        ...this.state.attr,
        cartAttr: true
      },
      isOpen: true
    })
  }
  // 显示门店地图
  showChang = () => {
    this.props.history.push(`/location?lat=${this.state.system_store.latitude}&lon=${this.state.system_store.longitude}&mapKey=${this.state.mapKey}`)
  }
  // 收藏
  setCollect = () => {

    let id = this.state.storeInfo.id,
      category = "product";
    if (this.state.storeInfo.userCollect) {
      getCollectDel(id, category).then(() => {
        this.setState({
          storeInfo: {
            ...this.state.storeInfo,
            userCollect: !this.state.storeInfo.userCollect
          }
        })
        Toast.info('取消收藏', 1.5)
      })
    } else {
      getCollectAdd(id, category).then(() => {
        this.setState({
          storeInfo: {
            ...this.state.storeInfo,
            userCollect: !this.state.storeInfo.userCollect
          }
        })
        Toast.info('收藏成功', 1.5)
      })
    }
  }
  // 加入购物车
  joinCart = () => {
    //0=加入购物车
    this.goCat(0);
  }
  goCat(news) {

    // debugger
    let productSelect = this.state.productValue[this.state.attrValue]
    if (this.state.attrValue) {
      const cartAttr = !this.state.isOpen ? true : false
      this.setState({
        attr: {
          ...this.state.attr,
          cartAttr: cartAttr
        }
      })
    } else {
      if (this.state.isOpen) {
        this.setState({
          attr: {
            ...this.state.attr,
            cartAttr: true
          }
        })
      } else {
        const cartAttr = !this.state.attr.cartAttr
        this.setState({
          attr: {
            ...this.state.attr,
            cartAttr: cartAttr
          }
        })
      }
    }
    //只有关闭属性弹窗时进行加入购物车
    if (!this.state.attr.cartAttr === true && this.state.isOpen === false) {
      this.setState({
        isOpen: true
      })
      return
    }
    //如果有属性,没有选择,提示用户选择
    if (this.state.attr.productAttr.length > 0 &&
      productSelect === undefined &&
      this.state.isOpen === true) {
      Toast.info('产品库存不足，请选择其它', 1.5)
      return
    }
    let q = {
      productId: this.state.id,
      cartNum: this.state.attr.productSelect.cart_num,
      new: news,
      uniqueId:
        this.state.attr.productSelect !== undefined
          ? this.state.attr.productSelect.unique
          : ""
    };
    postCartAdd(q).then(res => {
      this.setState({
        attr: {
          ...this.state.attr,
          cartAttr: false
        },
        isOpen: false
      })
      if (news) {
        this.props.history.push("/order/submit/" + res.data.cartId)
      } else {
        Toast.info('添加购物车成功', 1.5, () => {
          this.getCartCount(true);
        })
      }
    }).catch(err => {
      this.setState({
        isOpen: false
      })
      Toast.info(err.msg)
    })
  }
  // 立即购买
  tapBuy = () => {
    this.goCat(1)
  }
  changeFun = (data) => {
    this.setState({
      coupon: {
        ...this.state.coupon,
        coupon: data.value,
        list: data.list ? data.list : this.state.coupon.list
      }
    })
  }
  selectProduct = (obj) => {

    if (typeof obj !== 'object') obj = {}
    let action = obj.action || ''
    let value = obj.value === undefined ? '' : obj.value
    this[action] && this[action](value)
  }
  selectClose(value) {
    this.setState({
      attr: {
        ...this.state.attr,
        cartAttr: value
      },
      isOpen: false
    })
  }
  changeAttr(res) {
    let productSelect = this.state.productValue[res];
    if (productSelect) {
      this.setState({
        attr: {
          ...this.state.attr,
          productSelect: {
            ...this.state.attr.productSelect,
            image: productSelect.image,
            price: productSelect.price,
            stock: productSelect.stock,
            unique: productSelect.unique,
            cart_num: 1
          }
        },
        attrValue: res,
        attrTxt: '已选择'
      })
    } else {
      this.setState({
        attr: {
          ...this.state.attr,
          productSelect: {
            ...this.state.attr.productSelect,
            image: this.state.storeInfo.image,
            price: this.state.storeInfo.price,
            stock: 0,
            unique: "",
            cart_num: 0
          }
        },
        attrValue: "",
        attrTxt: '请选择'
      })
    }
  }
  changeCartNum(changeValue) {
    //获取当前变动属性
    let productSelect = this.state.productValue[this.state.attrValue];
    if (productSelect === undefined && !this.state.attr.productAttr.length) {
      productSelect = this.state.attr.productSelect
    }
    //无属性值即库存为0；不存在加减；
    if (productSelect === undefined) return;
    let stock = productSelect.stock || 0;
    let num = this.state.attr.productSelect;
    const attr = this.state.attr
    if (changeValue) {
      attr.productSelect.cart_num += 1
      this.setState({
        attr: attr
      })
      if (num.cart_num > stock) {
        attr.productSelect.cart_num = stock
        this.setState({
          attr: attr,
          cart_num: stock
        })
      }
    } else {
      attr.productSelect.cart_num--
      this.setState({
        attr: attr
      })
      if (num.cart_num < 1) {
        attr.productSelect.cart_num = 1
        this.setState({
          attr: attr,
          cart_num: 1
        })
      }
    }
  }

  sharePackets = (value) => {
    this.shareCode(value)
  }
  // 生成海报
  setPosterImageStatus = () => {
    this.setState({
      posterImageStatus: !this.state.posterImageStatus,
      posters: false
    })
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.app.token
  }
}

export default connect(mapStateToProps)(GoodsDetail)
