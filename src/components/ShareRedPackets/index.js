import React, { Component } from 'react';
import packetsImg from '@/assets/images/red-packets.png'
class ShareRedPackets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  render() {
    return (
      this.props.priceName !== 0 &&
      <div className={`sharing-packets ${this.state.show ? 'on' : ''}`}>
        <div
          className="iconfont icon-guanbi acea-row row-center-wrapper"
          onClick={this.closeShare}
        ></div>
        <div className="line"></div>
        <div className="sharing-con" onClick={this.goShare}>
          <img src={packetsImg} className="image" alt="" />
          <div className="text font-color-red">
            <div>会员分享返</div>
            <div className="money"><span className="label">￥</span>{this.props.priceName}</div>
            <div className="tip">下单即返佣金</div>
            <div className="shareBut">立即分享</div>
          </div>
        </div>
      </div>
    );
  }
  closeShare = () => {
    this.setState({
      show: true
    })
  }
  goShare = () => {
    this.props.sharePackets(false)
  }
}

export default ShareRedPackets
