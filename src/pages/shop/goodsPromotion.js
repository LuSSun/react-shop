import React, { Component } from 'react';
import 'swiper/css/swiper.css'
import Swiper from 'react-id-swiper';
import PromotionGood from '../../components/PromotionGood'
import { getGroomList } from "@/api/store";
import { Toast } from 'antd-mobile'
class GoodsPromotion extends Component {
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
      goodList: []
    }
  }
  componentDidMount() {
    this.getData()
  }

  async getData() {
    try {
      const res = await getGroomList(4)
      this.setState({
        imgUrls: res.data.banner,
        goodList: res.data.list
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
        <PromotionGood benefit={this.state.goodList}></PromotionGood>
      </div>
    );
  }
}

export default GoodsPromotion
