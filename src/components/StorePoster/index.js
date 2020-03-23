import React, { Component } from 'react';
import closeImg from '@/assets/images/poster-close.png'
import styled from 'styled-components'
import html2canvas from "html2canvas";
import { ActivityIndicator } from 'antd-mobile'
class StorePoster extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canvasStatus: false,
      posterImage: '',
      animating:false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.posterImageStatus) {
      if (!this.state.posterImage) {
        this.setState({
          animating:true
        })
      setTimeout(() => {
        this.setHtml2Canvas()
      }, 50);
      }
    }

  }
  render() {
    const { posterImageStatus, posterData } = this.props
    return (
      posterImageStatus &&
      <PosterStyle className="poster-first">
        <div className="poster-pop" >
          <img
            src={closeImg}
            className="close"
            onClick={this.posterImageClose}
            alt=""
          />
          <div className="canvas" id="posterApp" ref="posterDom">
            <img className="image" src={posterData.image} alt="商品图片" />
            <div className="text black"><span>{posterData.title}</span></div>
            <div className="text rad">
              <span>{'￥' + posterData.price}</span>
            </div>
            <div className="code" >
              <div className="code-img">
                <img src={posterData.code} alt="二维码" />
              </div>
              <div className="code-text"><span>长按识别二维码 立即购买</span></div>
            </div>
          </div>
        </div>
        <div className="poster-pop" style={{ display: (this.state.canvasStatus) ? 'block' : 'none' }}>

          <img id="shareImg" src={this.state.posterImage} alt="tp" className="poster-image" />
          <div className="keep">长按图片可以保存到手机</div>
        </div>
        <div className="mask"></div>
        <ActivityIndicator
                toast
                text="图片生成中"
                animating={this.state.animating}
              />
      </PosterStyle>
    );
  }
  posterImageClose = () => {
    this.setState({
      posterImageStatus: false,
    }, () => {
      this.props.setPosterImageStatus()
    })
  }
  getDpr() {
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
      return window.devicePixelRatio;
    } else {
      return 1;
    }
  }
  parseValue(value) {
    return parseInt(value, 10)
  }
  setHtml2Canvas = () => {
    let _this = this;
    let dom = document.getElementById('posterApp');
    let box = window.getComputedStyle(dom);

    //dom节点计算后宽高
    let width = _this.parseValue(box.width)
    let height = _this.parseValue(box.height)
    // 获取像素比
    let scaleBy = _this.getDpr();
    // 创建自定义的canvas元素
    let canvas = document.createElement('canvas');
    // 设置canvas元素属性宽高为 DOM 节点宽高 * 像素比
    canvas.width = width * scaleBy;
    canvas.height = height * scaleBy;

    // 设置canvas css 宽高为DOM节点宽高
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    let context = canvas.getContext('2d');
    // 将所有绘制内容放大像素比倍
    context.scale(scaleBy, scaleBy)

    // 设置需要生成的图片的大小，不限于可视区域（即可保存长图）
    let w = document.getElementById('posterApp').clientWidth;
    let h = document.getElementById('posterApp').clientHeight;

    html2canvas(dom, {
      allowTaint: true,
      width: w,
      height: h,
      useCORS: true
    }).then(function (canvas) {
      let url = canvas.toDataURL('image/png');// base64数据
      _this.setState({
        posterImage: url,
        canvasStatus: true,
        animating:false
      })
    })

  }

}
const PosterStyle = styled.div`
  &.poster-first {
    overscroll-behavior: contain;
    z-index: 1000;
    position: relative;
    .poster-pop {
      width: 4.5rem;
      height: 8rem;
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
      top: 50%;
      margin-top: -4.6rem;
    }
    .poster-pop .canvas {
      background-color: #ffffff;
      height: 8rem;
    }
    .poster-pop .poster-image {
      width: 100%;
    }
    .poster-pop .canvas .image {
      width: 4.5rem;
      height: 4.5rem;
      display: block;
    }
    .poster-pop .canvas .text {
      text-align: center;
      color: #000000;
      margin-top: 0.32rem;
    }
    .poster-pop .canvas .text.black {
      /* height: 0.68rem; */
    }
    .poster-pop .canvas .text.black >span {
          display: block;
          line-height: 0.4rem;
          height: 0.8rem;
          overflow: hidden;
          padding: 0 0.2rem;
        }
    .poster-pop .canvas .text.rad {
      color: #ff0000;
    }
    .poster-pop .canvas .code {
      height: 1.4rem;
      display: inline-flex;
    }
    .poster-pop .canvas .code .code-img {
      width: 40%;
      padding: 0.06rem;
    }
    .poster-pop .canvas .code .code-img img {
      width: 100%;
    }
    .poster-pop .canvas .code .code-text {
      width: 70%;
      font-size: 0.24rem;
      line-height: 1.8rem;
    }
    .poster-pop .close {
      width: 0.46rem;
      height: 0.75rem;
      position: fixed;
      right: 0;
      top: -0.73rem;
      display: block;
    }
    .poster-pop .save-poster {
      background-color: #df2d0a;
      font-size: 0.22rem;
      color: #fff;
      text-align: center;
      height: 0.76rem;
      line-height: 0.76rem;
      width: 100%;
      margin-top: -0.04rem;
    }
    .poster-pop .keep {
      color: #fff;
      text-align: center;
      font-size: 0.25rem;
      margin-top: 0.1rem;
    }
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 9;
    }
  }
`
export default StorePoster
