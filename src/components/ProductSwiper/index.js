import React, { Component } from 'react';
import 'swiper/css/swiper.css'
import Swiper from 'react-id-swiper';

class ProductConSwiper extends Component {
  constructor(props) {
    super(props)
    const _this = this
    this.state = {
      currents: 1,
      swiperOptions: {
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        speed: 1000,
        observer: true,
        observeParents: true,
        on: {
          slideChangeTransitionStart: function () {
            _this.setState({
              currents: this.realIndex + 1
            })
          }
        }
      }
    }
  }
  componentDidMount(){
  }
  render() {
    const  imgUrls = this.props.imgUrls || []

    return (
      imgUrls.length > 0 &&
      <div className="slider-banner product-bg">
        <Swiper {...this.state.swiperOptions}>
          {
            imgUrls.map((item, index) => (
              <div className="" key={index}>
                <img className="slide-image" src={item} alt="" />
              </div>
            ))
          }
        </Swiper>
        <div className="pages">{this.state.currents || 1}/{imgUrls.length || 1}</div>
      </div>
    );
  }
}

export default ProductConSwiper

