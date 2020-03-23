import React, { Component } from 'react';
import 'swiper/css/swiper.css'
import noNewsImg from '@/assets/images/noNews.png'
import Swiper from 'react-id-swiper';
import { Tabs, ListView, ActivityIndicator } from 'antd-mobile';

import { Link } from 'react-router-dom'
import {
  getArticleBanner,
  getArticleCategory,
  getArticleHotList,
  getArticleList
} from "@/api/public";



const SwiperBanner = ({ imgUrls }) => {
  const swiperOption = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      disableOnInteraction: false,
      delay: 2000
    },
    loop: true,
    speed: 1000,
    observer: true,
    observeParents: true
  }

  return (
    imgUrls.length > 0 && <div className="slider-banner swiperNews">
      <Swiper {...swiperOption}>
        {
          imgUrls.map((item, index) => (
            <div key={index}>
              <img className="slide-image" src={item.image_input[0]} alt="" />
            </div>
          ))
        }
      </Swiper>
    </div>
  )
}
class NewsList extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      page: 1,
      limit: 10,
      loadTitle: "",
      loading: false,
      loadend: false,
      imgUrls: [],
      navLsit: [],
      articleList: [],
      active: 0,
      cid: 0,
    }
  }

  componentDidMount() {
    this.articleData()
    this.articleHotList()
  }

  async articleData() {
    const res = await getArticleBanner()
    this.setState({ imgUrls: res.data })

    const resCategory = await getArticleCategory()
    this.setState({ navLsit: resCategory.data })


  }

  async articleHotList() {
    const resList = await getArticleHotList()
    this.setState({
      articleList: resList.data, page: this.state.page + 1, loading: false,
      loadend: resList.data.length < this.state.limit
    })
  }

  async getArticleLists() {
    const params = {
      page: this.state.page,
      limit: this.state.limit
    }
    const res = await getArticleList(params, this.state.cid)
    const articleList = this.state.articleList.concat(res.data)
    this.setState({
      articleList: articleList,
      page: this.state.page + 1,
      loading: res.data.length < this.state.limit ? false : true,
      loadend: res.data.length < this.state.limit
    })
  }

  onEndReached = () => {
    if (!this.state.loadend) {
      if (this.state.active === 0) return
      this.setState({ loading: true })
      this.getArticleLists()
    }
  }


  render() {
    const { dataSource } = this.state
    const rowList = (item, sectionID, index) => {
      return (
        <div className="list" key={index}>
          {
            item.image_input.length === 1 && <Link className="item acea-row row-between-wrapper" to={`/news_detail/${item.id}`}>
              <div className="text acea-row row-column-between">
                <div className="name line2">{item.title}</div>
                <div>{item.add_time}</div>
              </div>
              <div className="pictrue"><img src={item.image_input[0]} alt="" /></div>
            </Link>
          }
          {
            item.image_input.length === 2 && <Link className="item" to={`/news_detail/+${item.id}`}>
              <div className="title line1">
                {item.title}
              </div>
              <div className="picList acea-row row-between-wrapper">
                {
                  item.image_input.length > 0 && item.image_input.map((itemImg, childIndex) => (
                    <div className="pictrue" key={childIndex}>
                      <img src={itemImg} alt="" />
                    </div>
                  ))
                }

              </div>
              <div className="time">{item.add_time}</div>
            </Link>
          }
          {
            item.image_input.length === 3 && <Link className="item" to={`/news_detail/+${item.id}`}>
              <div className="title line1">
                {item.title}
              </div>
              <div className="picList on acea-row row-between-wrapper">
                {
                  item.image_input.length > 0 && item.image_input.map((itemImg, childIndex) => (
                    <div className="pictrue" key={childIndex}>
                      <img src={itemImg} alt="" />
                    </div>
                  ))
                }
              </div>
              <div className="time">{item.add_time}</div>
            </Link>
          }
        </div>
      )
    }
    return (
      <div className="newsList">
        <SwiperBanner imgUrls={this.state.imgUrls}></SwiperBanner>
        <Tabs tabs={this.state.navLsit}
          initialPage={this.state.active}
          swipeable={false}
          tabBarUnderlineStyle={{
            height: "0.04rem",
            width: '0.5rem',
            marginLeft: '0.68rem',
            backgroundColor: 'rgb(233, 51, 35)',
            borderColor: 'rgb(233, 51, 35)',
            borderRadius: '0.4rem'
          }}
          onTabClick={(tab, index) => this.tabClick(tab, index)}
        >

        </Tabs>
        <div>
          {
           this.state.articleList.length > 0 && <ListView
              dataSource={dataSource.cloneWithRows(this.state.articleList)}
              renderFooter={() => (<div style={{ padding: '0.2rem 0.6rem', width: '2.7rem', margin: '0 auto' }}>
                {this.state.loading ? <ActivityIndicator style={{ justifyContent: 'center' }}
                  text="加载中"
                /> : '没有数据了'}
              </div>)}
              renderRow={rowList}
              pageSize={this.state.limit}
              useBodyScroll
              scrollRenderAheadDistance={1000}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          }

          {/* 暂无新闻 */}
          {
            (this.state.articleList.length === 0 && this.state.page > 1) && <div className="noCommodity" >
              <div className="noPictrue">
                <img src={noNewsImg} className="image" alt="" />
              </div>
            </div>
          }
        </div>
      </div >
    );
  }
  tabClick(tab, index) {
    if (this.state.active === index) return
    this.setState({
      active: index,
      page: 1
    })
    if (index === 0) {
      this.articleHotList()
    } else {
      const cid = tab.id
      this.setState({
        cid: cid,
        articleList: [],
      }, () => {
        this.getArticleLists()
      })
    }
  }
}

export default NewsList;
