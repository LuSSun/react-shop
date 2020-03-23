import React, { Component } from 'react';
import 'swiper/css/swiper.css'
import Swiper from 'react-id-swiper';
import GoodList from '../../components/GoodList'
import { getGroomList } from "@/api/store";
import { Toast } from 'antd-mobile'
class HotNewGoods extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        speed: 1000,
        observer: true,
        observerParents: true
      },
      imgUrls: [],
      goodList: [],
      name: "",
      icon: "",
    }
  }

  componentDidMount() {
    this.titleInfo()
    this.getData()
  }

  titleInfo() {
    const type = this.props.match.params.type
    if (type === '1') {
      this.setState({
        name: '精品推荐',
        icon: 'icon-jingpintuijian'
      })
      document.title = '精品推荐'
    } else if (type === '2') {
      this.setState({
        name: '热门榜单',
        icon: 'icon-remen'
      })
      document.title = '热门榜单'
    } else if (type === '3') {
      this.setState({
        name: '首发新品',
        icon: 'icon-xinpin'
      })
      document.title = '首发新品'
    }
  }

  async getData() {
    const type = this.props.match.params.type
    try {
      const res = await getGroomList(type)
      this.setState({
        imgUrls: res.data.banner,
        goodList: res.data.list,

      })
    } catch (err) {
      Toast.info(err.msg, 1.5)
    }

  }

  render() {
    return (
      <div className="quality-recommend">
        {
          this.state.imgUrls.length > 0 && <div className="slider-banner swiper">
            <Swiper {...this.state.swiperOption}>
              {
                this.state.imgUrls.map((item, index) => (
                  <div className="" key={index}>
                    <img className="slide-image" src={item.img} alt="" />
                  </div>
                ))
              }
            </Swiper>
          </div>
        }
        <div className="title acea-row row-center-wrapper">
          <div className="line"></div>
          <div className="name">
            <span className={`iconfont ${this.state.icon}`}></span>{this.state.name}
          </div>
          <div className="line"></div>
        </div>
        <GoodList goodList={this.state.goodList} isSort={false}></GoodList>
      </div>
    );
  }
}

export default HotNewGoods
