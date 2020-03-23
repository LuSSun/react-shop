import React, { Component } from 'react';
import './newsDetailStyle.less'
import { Link } from 'react-router-dom'
import ShareInfo from '../../../components/ShareInfo'
import { isWeixin } from "@/utils/index";
import { getArticleDetails } from "@/api/public";

class NewsDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleInfo: {},
      storeInfo: {},
      show: false,
      isWeixin: isWeixin()
    }
  }
  render() {
    return (
      this.state.articleInfo &&
      <div className="newsDetail" style={{paddingBottom:'0.4rem'}}>
        <div className="title">{this.state.articleInfo.title}</div>
        {
          (this.state.articleInfo.cart_name
            || this.state.articleInfo.add_time
            || this.state.articleInfo.visit
          ) && <div className="list acea-row row-middle">
            <div className="label cart-color line1">{this.state.articleInfo.cart_name}</div>
            <div className="item">
              <span className="iconfont icon-shenhezhong"></span
              >{this.state.articleInfo.add_time}
            </div>
            <div className="item">
              <span className="iconfont icon-liulan"></span>{this.state.articleInfo.visit}
            </div>
          </div>
        }

        <div className="conter" dangerouslySetInnerHTML={{__html:this.state.articleInfo.content}}></div>
        {
          this.state.storeInfo.id && <div className="picTxt acea-row row-between-wrapper">
            <div className="pictrue"><img src={this.state.storeInfo.image} alt="" /></div>
            <div className="text">
              <div className="name line1">{this.state.storeInfo.store_name}</div>
              <div className="money font-color-red">
                ￥<span className="num">{this.state.storeInfo.ot_price}</span>
              </div>
              <div className="y_money">￥{this.state.storeInfo.price}</div>
            </div>
            <Link to={'/detail/' + this.state.storeInfo.id}>
              <div className="label"><span className="span">查看商品</span></div>
            </Link>
          </div>
        }
        {
          (this.state.isWeixin && this.state.articleInfo.cart_name) && <div className="bnt bg-color-red" onClick={this.setShareInfoStatus}>
            和好友一起分享
          </div>
        }

        <ShareInfo shareInfoStatus={this.state.show} setShareInfoStatus={this.setShareInfoStatus} ></ShareInfo>

      </div>
    );
  }

  componentDidMount() {
    this.articleDetails()
  }

  async articleDetails() {
    const id = this.props.match.params.id
    const res = await getArticleDetails(id)
    this.setState({
      articleInfo: res.data,
      storeInfo: res.data.store_info || {}
    })
    if (this.state.articleInfo.title) {
      document.title = this.state.articleInfo.title
    }
  }

  setShareInfoStatus = () => {
    this.setState({
      show: !this.state.show
    })
  }
}

export default NewsDetail
