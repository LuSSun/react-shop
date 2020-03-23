import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import {
  postSignUser,
  getSignConfig,
  postSignIntegral,
  getSignList
} from "@/api/user";
import { add } from "@/utils/bc";

class Sign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
      integral: 0,
      signCount: [],
      sign_index: 0,
      signSystemList: [],
      signList: [],
      page: 1,
      limit: 3,
      active: false,
      day: ""
    }
  }
  render() {
    return (
      <div className="sign">
        <div className="header bg-color-red">
          <div className="headerCon acea-row row-between-wrapper">
            <div className="left acea-row row-between-wrapper">
              <div className="pictrue"><img src={this.state.userInfo.avatar} alt="" /></div>
              <div className="text">
                <div className="line1">{this.state.userInfo.nickname}</div>
                <div className="integral acea-row">
                  <span>积分: {this.state.userInfo.integral}</span>
                </div>
              </div>
            </div>
            <Link
              to='/user/sign_record'
              className="right acea-row row-middle"
            >
              <div className="iconfont icon-caidan"></div>
              <div>明细</div>
            </Link>
          </div>
        </div>
        <div className="wrapper">
          <div className="list acea-row row-between-wrapper">
            {
              this.state.signSystemList.length > 0 && this.state.signSystemList.map((item, index) => (
                <div className="item" key={index} >
                  <div className={`index + 1 === signSystemList.length ? 'rewardTxt' : ''`}>
                    {item.day}
                  </div>
                  <div
                    className={`venus ${(index + 1 === this.state.signSystemList.length ? 'reward' : '') +
                      ' ' +
                      (this.state.sign_index >= index + 1 ? 'venusSelect' : '')}`}
                  ></div>
                  <div className={`num ${(this.state.sign_index >= index + 1) ? 'on' : ''}`}>
                    +{item.sign_num}
                  </div>
                </div>
              ))
            }
          </div>
          <div
            className={`but bg-color-red ${this.state.userInfo.is_day_sgin ? 'on' : ''}`}
            onClick={this.goSign}
          >
            {this.state.userInfo.is_day_sgin ? "已签到" : "立即签到"}
          </div>
          <div className="lock"></div>
        </div>
        <div className="wrapper wrapper2">
          <div className="tip">已累计签到</div>
          <div className="list2 acea-row row-center row-bottom">
            {
              this.state.signCount.map((item, index) => (
                <div className="item" key={index}>
                  {item || 0}
                </div>
              ))
            }
            <div className="data">天</div>
          </div>
          <div className="tip2">
            据说连续签到第{this.state.day}天可获得超额积分，一定要坚持签到哦~~~
          </div>
          <div className="list3">
            {
              this.state.signList.length > 0 && this.state.signList.map((item, index) => (
                <div className="item acea-row row-between-wrapper" key={index}>
                  <div>
                    <div className="name line1">{item.title}</div>
                    <div className="data">{item.add_time}</div>
                  </div>
                  <div className="num font-color-red">+{item.number}</div>
                </div>
              ))
            }
            {
              this.state.signList.length > 0 && <Link className="Loads acea-row row-center-wrapper" to="/user/sign_record">
                点击加载更多
                <div className="iconfont icon-xiangyou acea-row row-center-wrapper"
                  style={{
                    fontSize:'0.25rem',
                    margin:'0.02rem 0 0 0.1rem'
                  }}
                ></div>

              </Link>
            }

          </div>

        </div>
        <div
          className={`signTip acea-row row-center-wrapper ${this.state.active === true ? 'on' : ''}`}
        >
          <div className="signTipLight loadingpic"></div>
          <div className="signTipCon">
            <div className="state">签到成功</div>
            <div className="integral">获得{this.state.integral}积分</div>
            <div className="signTipBnt" onClick={this.close}>好的</div>
          </div>
        </div>
        {
          this.state.active && <div className="mask" onTouchMove={this.handletouchmove}></div>
        }

      </div>
    );
  }

  componentDidMount() {
    this.signUser()
    this.signConfig()
    this.getSignList()
  }
  PrefixInteger(num, length) {
    return (Array(length).join("0") + num).slice(-length).split("");
  }
  //数字转中文
  Rp(n) {
    var cnum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var s = "";
    n = "" + n; // 数字转为字符串
    for (var i = 0; i < n.length; i++) {
      s += cnum[parseInt(n.charAt(i))];
    }
    return s;
  }
//   data: {integral: "10"}
// integral: "10"
// msg: "签到获得10积分"
// status: 200

  // 获取用户信息
  async signUser() {
    const res = await postSignUser({ sign: 1 })
    res.data.integral = parseInt(res.data.integral);
    var sumSginDay = res.data.sum_sgin_day;
    this.setState({
      userInfo: res.data,
      signCount: this.PrefixInteger(sumSginDay, 4),
      sign_index: parseInt(res.data.sign_num)
    })
  }
  // 签到配置
  async signConfig() {
    const res = await getSignConfig()
    this.setState({
      signSystemList: res.data,
      day: this.Rp(res.data.length)
    })
  }

  // 用户签到
  goSign = () => {
    const sumSginDay = this.state.userInfo.sum_sgin_day
    if (this.state.userInfo.is_day_sgin)
      return Toast.info('您今日已签到!', 1.5);
    postSignIntegral().then(res => {
      let sign_index = parseInt(this.state.sign_index + 1);
      this.setState({
        active: true,
        integral: res.data.integral,
        sign_index: (sign_index > this.state.signSystemList.length) ? 1 : sign_index,
        signCount: this.PrefixInteger(sumSginDay + 1, 4),
        userInfo: {
          ...this.state.userInfo,
          is_day_sgin: true,
          integral: add(this.state.userInfo.integral, res.data.integral)
        }
      })
      this.getSignList();
    });
  }

  async getSignList() {
    const res = await getSignList(this.state.page, this.state.limit)
    this.setState({
      signList: res.data
    })
  }

  close = () => {
    this.setState({
      active: false
    })
  }
  handletouchmove=(e)=>{
    e.preventDefault()
  }
}

export default Sign
