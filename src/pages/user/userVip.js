
import React, { Component } from 'react'
import 'swiper/css/swiper.css'
import Swiper from 'react-id-swiper';
import { getVipInfo, getVipTask } from "@/api/user";
import { Toast } from 'antd-mobile'

class SwiperTop extends Component {
  constructor(props) {
    super(props)
    const _this = this
    this.state = {
      options: {
        speed: 1000,
        effect: "coverflow",
        slidesPerView: "auto",
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0, // 旋转的角度
          stretch: -20, // 拉伸   图片间左右的间距和密集度
          depth: 100, // 深度   切换图片间上下的间距和密集度
          modifier: 2, // 修正值 该值越大前面的效果越明显
          slideShadows: false // 页面阴影效果
        },
        observer: true,
        observeParents: true,
        on: {
          slideChange: function () {
            _this.props.swiperChange(this.activeIndex)
          }

        },
        // 获取swiper实例
        getSwiper: obj => {
          if (this.state && !this.state.swiper) {
            this.setState({
              swiper: obj
            }, () => {
              this.changeGrade()
            });
          }
        },
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      grade: nextProps.grade
    })
  }

  changeGrade() {

    const vipList = this.props.vipList
    if (vipList.length > 0) {
      vipList.forEach((item, index) => {
        if (item.i_clear === false) {
          this.state.swiper.slideTo(index)
          this.props.changeData({
            activeIndex: index,
            grade: item.grade
          })
        }
      })
    }
  }

  render() {
    const { vipList, vipComplete, grade } = this.props
    return (
      vipList.length > 0 &&
      <Swiper {...this.state.options} >
        {
          vipList.map((item, index) => (
            <div className="memberBg" key={index} >
              <div style={{
                backgroundImage: 'url(' + item.image + ')',
                height: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%'
              }}>
                <div className="name" >{item.name}</div>
                <div className="discount">
                  可享受商品折扣: {item.discount / 10}折
                <span
                    className="iconfont icon-zhekou"></span>
                </div>
                {
                  item.grade === grade && <div className="nav acea-row">
                    {
                      vipComplete.length > 0 && vipComplete.map((val, i) => (
                        <div className="item" key={i}>
                          <div className="num">{val.number}</div>
                          <div>{val.real_name}</div>
                        </div>
                      ))
                    }
                  </div>
                }
                {
                  item.grade > grade && <div className="lock">
                    <span className="iconfont icon-quanxianguanlisuozi"></span>该会员等级尚未解锁
                </div>
                }
                {
                  item.grade < grade && <div className="lock">
                    <span className="iconfont icon-xuanzhong1"></span>已解锁更高等级
                </div>
                }
              </div>
            </div>
          ))
        }
      </Swiper>
    )
  }
}
export default class UserVip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vipList: [], //等级列表
      vipRequire: [], //等级要求
      vipComplete: [], //完成情况
      taskCount: 0, //任务数
      grade: 0, //当前会员等级
      loading: false,
      growthValue: true,
      illustrate: "",
      activeIndex: 0
    }
  }
  componentDidMount() {
    this.getInfo()
  }
  render() {
    return (
      <div className="member-center">
        <div className="header">
          <div className="slider-banner banner" >
            <SwiperTop vipList={this.state.vipList} vipComplete={this.state.vipComplete}
              grade={this.state.grade}
              swiperChange={this.swiperChange}
              changeData={this.changeData}
            ></SwiperTop>
          </div>
        </div>
        <section className="wrapper">
          <div className="title acea-row row-between-wrapper">
            <div><span className="iconfont icon-jingyanzhi"></span>会员升级要求</div>
            <div className="num">
              <span className="current">{this.state.taskCount}</span>/{this.state.vipRequire.length}
            </div>
          </div>
          <div className="list">
            {
              this.state.vipComplete.length > 0 && this.state.vipComplete.map((item, index) => (
                <div className="item" key={index}>
                  <div className="top acea-row row-between-wrapper">
                    <div className="name">
                      {item.name}
                      {
                        item.illustrate && <span
                          className="iconfont icon-wenti"
                          onClick={() => this.showGrow(item)}
                        ></span>
                      }
                    </div>
                    <div>{item.finish ? "已满足条件" : "未满足条件"}</div>
                  </div>
                  <div className="cu-progress">
                    <div className="bg-red" style={{ width: item.speed + '%' }}></div>
                  </div>
                  <div className="experience acea-row row-between-wrapper">
                    <div>{item.task_type_title}</div>
                    <div>
                      <span className="num">{item.new_number}</span>/{item.number}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </section>
      </div>

    )
  }
  async getInfo() {
    try {
      const res = await getVipInfo()
      this.setState({
        vipList: res.data.list,
        vipRequire: res.data.task.list,
        vipComplete: res.data.task.task,
        taskCount: res.data.task.reach_count
      })
    } catch (err) {
      Toast.info(err.msg, 1.5)
    }
  }
  async getTask() {
    try {
      const res = await getVipTask(this.state.vipList[this.state.activeIndex].id)
      if (this.state.vipList[this.state.activeIndex].id === 4) {

      }
      this.setState({
        vipRequire: res.data.list,
        vipComplete: res.data.task,
        taskCount: res.data.reach_count
      })
    } catch (err) {
      Toast.info(err.msg, 1.5)
    }

  }
  showGrow = (index) => {

  }
  swiperChange = (index) => {
    this.setState({
      activeIndex: index
    }, () => {
      this.getTask()
    })
  }
  changeData = (obj) => {
    this.setState({
      activeIndex: obj.index,
      grade: obj.grade
    })
  }
}
