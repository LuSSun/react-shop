import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getCategory } from '../../api/store'
import debounce from "lodash.debounce";

export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: [],
      navActive: 0,
      search: "",
      lock: false
    }
  }
  componentDidMount() {
    document.addEventListener("scroll", this.scrollHandle, false);
    this.getData()
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollHandle, false)
  }
  getData() {
    getCategory().then(res => {
      this.setState({
        category: res.data
      })
    })
  }
  render() {
    return (
      <div className="productSort">
        <form onSubmit={this.submitForm}>
          <div className="header acea-row row-center-wrapper" ref={(headerDom) => { this.headerDom = headerDom }}>
            <div className="acea-row row-between-wrapper input">
              <span className="iconfont icon-sousuo"></span>
              <input type="text" placeholder="搜索商品信息" value={this.state.search} onChange={this.searchChange} />
            </div>
          </div>
        </form>
        <div className="aside">
          {
            this.state.category.map((item, index) => (
              <div key={index}
                className={`item acea-row row-center-wrapper ${index === this.state.navActive ? 'on' : ''}`}
                onClick={() => { this.asideTap(index) }}
              >
                <span>{item.cate_name}</span>
              </div>
            ))
          }
        </div>
        <div className="conter" style={{ paddingBottom: '0.2rem' }} onScroll={this.scrollHandle}>
          {
            this.state.category.map((item, index) => (
              <div className="listw" key={index} ref="titleDom1">
                {/* ref={(titleDom) => { this.titleDom = titleDom }}  获取不了数组dom元素 */}
                <div className="title acea-row row-center-wrapper" >
                  <div className="line"></div>
                  <div className="name">{item.cate_name}</div>
                  <div className="line"></div>
                </div>
                <div className="list acea-row">
                  {
                    item.children.map((child, childIndex) => (
                      <Link className="item acea-row row-column row-middle"
                        key={childIndex}
                        to={`/goods_list?id=${child.id}&title=${child.cate_name}`}
                      >
                        <div className="picture"><img src={child.pic} alt="" /></div>
                        <div className="name line1">{child.cate_name}</div>
                      </Link>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  submitForm = (e) => {
    e.preventDefault()
    const val = this.state.search.trim()
    if (val) {
      this.props.history.push(`/goods_list?s=${val}`)
    }
    setTimeout(() => (this.search = ""), 500);
  }
  searchChange = (e) => {
    this.setState({ search: e.target.value })
  }
  asideTap(index) {
    const domArr = document.querySelectorAll('.productSort .listw')
    const top = domArr[index].offsetTop - this.headerDom.offsetHeight - window.scrollY
    this.setState({ lock: true })

    window.scrollBy({ top, left: 0, behavior: "smooth" });
    this.setState({
      navActive: index
    })
  }
  scrollHandle = (e) => {
    // 使用debounce节流函数
    debounce(() => {
      if (this.state.lock) {
        this.setState({
          lock: false
        })
        return;
      }

      const headerHeight = this.headerDom.offsetHeight,
        { scrollY } = window, domArr = [];
      const titleDom = document.querySelectorAll('.productSort .listw .title')
      // document.querySelectorAll(".title")是一个NodeList数组，不是一般js数组！
      // NodeList数组转化为js数组
      for (var i = 0; i < titleDom.length; i++) {
        domArr.push(titleDom[i])
      }

      domArr.reduce((initial, title, index) => {
        if (initial) return initial;
        const parent = title.parentNode || title.parentElement;
        if (
          scrollY + headerHeight + 15 <
          title.offsetTop + parent.offsetHeight
        ) {
          initial = true;
          this.setState({
            navActive: index
          })
        }
        // else if (innerHeight + scrollY + 15 > offsetHeight) {
        //   this.navActive = titles.length - 1;
        //   initial = true;
        // }
        return initial;
      }, false);
    }, 500)()

  }
}


