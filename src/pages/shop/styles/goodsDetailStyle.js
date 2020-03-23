import styled from 'styled-components'
const PageStyle = styled.div`
  .geoPage {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 10000;
  }
  .product-con .store-info {
    margin-top: 0.2rem;
    background-color: #fff;
  }
  .product-con .store-info .title {
    padding: 0 0.3rem;
    font-size: 0.28rem;
    color: #282828;
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 0.01rem solid #f5f5f5;
  }
  .product-con .store-info .info {
    padding: 0 0.3rem;
    height: 1.26rem;
  }
  .product-con .store-info .info .picTxt {
    width: 6.15rem;
  }
  .product-con .store-info .info .picTxt .pictrue {
    width: 0.76rem;
    height: 0.76rem;
  }
  .product-con .store-info .info .picTxt .pictrue img {
    width: 100%;
    height: 100%;
    border-radius: 0.06rem;
  }
  .product-con .store-info .info .picTxt .text {
    width: 5.22rem;
  }
  .product-con .store-info .info .picTxt .text .name {
    font-size: 0.3rem;
    color: #282828;
  }
  .product-con .store-info .info .picTxt .text .address {
    font-size: 0.24rem;
    color: #666;
    margin-top: 0.03rem;
  }
  .product-con .store-info .info .picTxt .text .address .iconfont {
    color: #707070;
    font-size: 0.18rem;
    margin-left: 0.1rem;
  }
  .product-con .store-info .info .picTxt .text .address .addressTxt {
    max-width: 4.8rem;
    width: auto;
  }
  .product-con .store-info .info .iconfont {
    font-size: 0.4rem;
  }
  .product-con .superior {
    background-color: #fff;
    margin-top: 0.2rem;
  }
  .product-con .superior .title {
    height: 0.98rem;
  }
  .product-con .superior .title img {
    width: 0.3rem;
    height: 0.3rem;
  }
  .product-con .superior .title .titleTxt {
    margin: 0 0.2rem;
    font-size: 0.3rem;
    background-image: linear-gradient(to right, #f57a37 0%, #f21b07 100%);
    background-image: -webkit-linear-gradient(to right, #f57a37 0%, #f21b07 100%);
    background-image: -moz-linear-gradient(to right, #f57a37 0%, #f21b07 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .product-con .superior .slider-banner {
    width: 6.9rem;
    margin: 0 auto;
    padding-bottom: 0.2rem;
  }
  .product-con .superior .slider-banner .list {
    width: 100%;
    padding-bottom: 0.2rem;
  }
  .product-con .superior .slider-banner .list .item {
    width: 2.15rem;
    margin: 0 0.22rem 0.3rem 0;
    font-size: 0.26rem;
  }
  .product-con .superior .slider-banner .list .item:nth-of-type(3n) {
    margin-right: 0;
  }
  .product-con .superior .slider-banner .list .item .pictrue {
    width: 100%;
    height: 2.15rem;
  }
  .product-con .superior .slider-banner .list .item .pictrue img {
    width: 100%;
    height: 100%;
    border-radius: 0.06rem;
  }
  .product-con .superior .slider-banner .list .item .name {
    color: #282828;
    margin-top: 0.12rem;
  }
  .product-con .superior .slider-banner .swiper-pagination-bullet {
    background-color: #999;
  }
  .product-con .superior .slider-banner .swiper-pagination-bullet-active {
    background-color: #e93323;
  }

  .mask {
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
  }
  .footer .icon-shoucang1 {
    color: #e93323;
  }
  .product-con .product-intro .conter div {
    width: 100% !important;
  }
  .generate-posters {
    width: 100%;
    height: 1.7rem;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    transform: translate3d(0, 100%, 0);
    -webkit-transform: translate3d(0, 100%, 0);
    -ms-transform: translate3d(0, 100%, 0);
    -moz-transform: translate3d(0, 100%, 0);
    -o-transform: translate3d(0, 100%, 0);
    transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
    -webkit-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
    -moz-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
    -o-transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  }
  .generate-posters.on {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
  }
  .generate-posters .item {
    flex: 50%;
    -webkit-flex: 50%;
    -ms-flex: 50%;
    text-align: center;
  }
  .generate-posters .item .iconfont {
    font-size: 0.8rem;
    color: #5eae72;
  }
  .generate-posters .item .iconfont.icon-haibao {
    color: #5391f1;
  }
  .noscroll {
    height: 100%;
    overflow: hidden;
  }
`
export default PageStyle
