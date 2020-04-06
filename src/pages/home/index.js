import './index.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getHomeData } from "@/api/public";
import 'swiper/css/swiper.css'
import Swiper from 'react-id-swiper';
import cookie from '@/utils/store/cookie'
import newImg from '@/assets/images/news.png'
import oneImg from '@/assets/images/one.png'
import twoImg from '@/assets/images/two.png'
import threeImg from '@/assets/images/three.png'
import GoodList from '../../components/GoodList/index'
import PromotionGood from '../../components/PromotionGood/index'
import CouponWindow from '../../components/CouponWindow/index'

const HAS_COUPON_WINDOW = "has_coupon_window";

const BannerSwiper = ({ banner }) => {
  const swiperOption = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay。
      delay: 2000
    },
    loop: true,
    speed: 1000,
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true //修改swiper的父元素时，自动初始化swiper
  }
  return (
    banner.length > 0 &&
    <div className="slider-banner banner">
      <Swiper {...swiperOption}>
        {
          banner.map((item, index) => (
            <div key={index} >
              <Link style={{height:'100%'}} className="search acea-row row-middle" to={item.wap_url ? item.wap_url : ''}>
                <img src={item.pic} alt="" />
              </Link>
            </div>
          ))
        }
      </Swiper>
    </div>
  )
}

const RollSwiper = ({ roll }) => {
  const swiperRoll = {
    direction: "vertical",
    autoplay: {
      disableOnInteraction: false,
      delay: 2000
    },
    loop: true,
    speed: 1000,
    observer: true,
    observeParents: true
  }
  return (
    roll.length > 0 &&
    <div className="news acea-row row-between-wrapper">
      <div className="pictrue"><img src={newImg} alt="" /></div>
      <div className="swiper-no-swiping new-banner">

        <Swiper {...swiperRoll} containerClass="swiper-wrapper">
          {
            roll.map((item, index) => (
              <div key={index} style={{ height: '0.77rem' }}>
                <Link className="acea-row row-between-wrapper" to={item.wap_url ? item.wap_url : ''}>
                  <div className="text acea-row row-between-wrapper">
                    {item.show === '是' && <div className="label">最新</div>}
                    <div className="newsTitle line1">{item.info}</div>
                  </div>
                  <div className="iconfont icon-xiangyou"></div>
                </Link>
              </div>
            ))
          }
        </Swiper>

      </div>
    </div>
  )
}

const SwiperBoutique = ({ info }) => {
  const swiperBoutique = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      disableOnInteraction: false,
      delay: 2000
    },
    loop: true,
    speed: 1000,
    observer: true,
    observeParents: true
  }
  return (
    (info.bastList.length > 0 || info.bastBanner.length > 0) && <section className="wrapper">
      <div className="title acea-row row-between-wrapper">
        <div className="text">
          <div className="name line1">精品推荐</div>
          <div className="line1">{info.bastInfo}</div>
        </div>
        <Link to='/hot_new_goods/1' className="more"
        >更多<span className="iconfont icon-jiantou"></span>
        </Link>
      </div>
      <div className="slider-banner boutique">
        <Swiper {...swiperBoutique} containerClass="swiper-wrapper" wrapperClass="swiper-wrapper">
          {
            info.bastBanner.map((item, index) => (
              <div key={index}>
                <Link to={item.wap_link ? item.wap_link : ''}>
                  <img src={item.img} alt="" />
                </Link>
              </div>
            ))
          }
        </Swiper>
      </div>
    </section>

  )
}
const mapStateToProps = (state, ownProps) => {

  return {
    userInfo: state.userInfo,
    a: state
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startLoading: () => {
      dispatch({ type: 'LOADING_START' })
    },
    endLoading: () => {
      dispatch({ type: 'LOADING_END' })
    }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCoupon: false,
      logoUrl: "",
      banner: [],
      menus: [],
      roll: [],
      activity: [],
      activityOne: {},
      info: {
        fastList: [],
        bastBanner: [],
        firstList: [],
        bastList: []
      },
      likeInfo: [],
      lovely: [],
      benefit: [],
      couponList: [],
    }
  }

  render() {

    return (
      <div className="index" style={{ background: '#fff', paddingBottom: '0.2rem' }}>
        {
          this.state.logoUrl && <div className="header acea-row row-center-wrapper">
            <div className="logo">
              <img src={this.state.logoUrl} alt="" />
            </div>
            <Link className="search acea-row row-middle" to="/search">
              <span className="iconfont icon-xiazai5"></span>
              搜索商品
					</Link>
          </div>
        }
        <BannerSwiper banner={this.state.banner}></BannerSwiper>
        <div className="nav acea-row">
          {
            this.state.menus.map((item, index) => (
              <Link className="item" key={index} to={item.wap_url ? item.wap_url : ''}>
                <div className="pictrue">
                  <img src={item.pic} alt="" />
                </div>
                <div style={{ lineHeight: '0.36rem' }}>{item.name}</div>
              </Link>
            ))
          }
        </div>
        <RollSwiper roll={this.state.roll}></RollSwiper>
        {
          (this.state.activityOne.wap_link !== undefined || this.state.activity.length > 0) &&
          <div className="specialArea acea-row row-between-wrapper">
            {
              this.state.activityOne.wap_link && <Link className="assemble" to={this.state.activityOne.wap_link ? this.state.activityOne.wap_link : ''}>
                <img src={this.state.activityOne.pic} alt="" />
                <div className="text">
                  <div className="name">{this.state.activityOne.title}</div>
                  <div className="infor">{this.state.activityOne.info}</div>
                </div>
              </Link>
            }
            <div className="list acea-row row-column-between">
              {
                this.state.activity.length > 0 && this.state.activity.map((item, index) => (
                  <Link className="item" key={index} to={item.wap_link ? item.wap_link : ''}>
                    <img src={item.pic} alt="" />
                    <div className="text">
                      <div className="name">{item.title}</div>
                      <div className="infor">{item.info}</div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        }
        {/* 快速选择 */}
        {
          this.state.info.fastList.length > 0 && <section className="wrapper">
            <div className="title acea-row row-between-wrapper">
              <div className="text">
                <div className="name line1">快速选择</div>
                <div className="line1">{this.state.info.fastInfo}</div>
              </div>
              <Link className="more" to="/category">
                更多
								<span className="iconfont icon-jiantou"></span>
              </Link>
            </div>
            <div className="scroll-product">
              {this.state.info.fastList.map((item, index) => (
                <div className="swiper-slide" key={index}>
                  <Link className="" to={`/goods_list?id=${item.id}&title=${item.cate_name}`}>
                    <div className="img-box">
                      <img src={item.pic} alt="" />
                    </div>
                    <div className="pro-info line1">{item.cate_name}</div>

                  </Link>
                </div>
              ))}
            </div>
          </section>
        }
        <SwiperBoutique info={this.state.info}></SwiperBoutique>
        <GoodList goodList={this.state.info.bastList} isSort={false}></GoodList>
        {/* 热门榜单 */}
        {
          this.state.likeInfo.length > 0 && <section className="hotList">
            <div className="hot-bg">
              <div className="title acea-row row-between-wrapper">
                <div className="text line1">
                  <span className="label">热门榜单</span>根据销量、搜索、好评等综合得出
          			</div>
                <Link to={'/hot_new_goods/' + 2} className="more">
                  更多<span className="iconfont icon-jiantou"></span>
                </Link>
              </div>
            </div>
            <div className="list acea-row row-middle">
              {
                this.state.likeInfo.map((item, index) => (
                  <Link className="item" key={index} to={`/detail/${item.id}`}>
                    <div className="pictrue">
                      <img src={item.image} alt="" />
                      {index === 0 && <img className="numPic" src={oneImg} alt="" />}
                      {index === 1 && <img className="numPic" src={twoImg} alt="" />}
                      {index === 2 && <img className="numPic" src={threeImg} alt="" />}
                    </div>
                    <div className="name line1">{item.store_name}</div>
                    <div className="money font-color-red">
                      ￥<span className="num">{item.price}</span>
                    </div>
                  </Link>
                ))
              }
            </div>
          </section>
        }
        {
          this.state.lovely.img && <div>
            <div className="adver">
              <img src={this.state.lovely.img} alt="" />
            </div>
          </div>
        }
        {/* 首发新品 */}
        {
          this.state.info.firstList.length > 0 && <section className="wrapper">
            <div className="title acea-row row-between-wrapper">
              <div className="text">
                <div className="name line1">
                  首发新品<span className="new font-color-red">NEW~</span>
                </div>
                <div className="line1">{this.state.info.firstInfo}</div>
              </div>
              <Link to={'/hot_new_goods/' + 3} className="more">更多<span className="iconfont icon-jiantou"></span>
              </Link>
            </div>
            <div className="newProducts">
              {
                this.state.info.firstList.map((item, index) => (
                  <div className="swiper-slide" key={index}>
                    <Link to={'/detail/' + item.id}>
                      <div className="img-box">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="pro-info line1">{item.store_name}</div>
                      <div className="money font-color-red">￥{item.price}</div>
                    </Link>
                  </div>
                ))
              }
            </div>
          </section>
        }
        {/* 促销单品 */}
        {
          this.state.benefit.length > 0 && <section className="wrapper">
            <div className="title acea-row row-between-wrapper">
              <div className="text">
                <div className="name line1">促销单品</div>
                <div className="line1">{this.state.info.salesInfo}</div>
              </div>
              <Link to="/promotion" className="more">更多<span className="iconfont icon-jiantou"></span></Link>
            </div>
          </section>
        }
        <PromotionGood benefit={this.state.benefit}></PromotionGood>
        {this.state.showCoupon &&
          <CouponWindow couponList={this.state.couponList} close={this.couponClose}>
          </CouponWindow>}
      </div>
    )
  }
  componentDidMount() {
    console.log(this.props)
    this.getHomeData()
  }

  getHomeData() {
    this.props.startLoading()
    getHomeData().then(res => {
      this.setState({
        logoUrl: res.data.logoUrl,
        banner: res.data.banner,
        menus: res.data.menus,
        roll: res.data.roll,
        activity: res.data.activity,
        info: res.data.info,
        likeInfo: res.data.likeInfo,
        lovely: res.data.lovely.length ? res.data.lovely[0] : {},
        benefit: res.data.benefit,
        couponList: res.data.couponList,
      })
      if (res.data.activity.length) {
        var activityOne = res.data.activity.shift();
        this.setState({
          activityOne: activityOne
        })
      }
      this.setOpenShare()

      let showCoupon = !cookie.get(HAS_COUPON_WINDOW) && res.data.couponList.some(coupon => coupon.is_use)
      this.setState({
        showCoupon: showCoupon
      })
      this.props.endLoading()
    })
  }

  setOpenShare() {

  }

  couponClose() {
    cookie.set(HAS_COUPON_WINDOW, 1);
  }
}

export default Home
