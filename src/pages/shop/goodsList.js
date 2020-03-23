import React, { Component } from 'react';
import { getQueryStringByName } from '@/utils/index'
import hornIcon from '@/assets/images/horn.png'
import upIcon from '@/assets/images/up.png'
import downIcon from '@/assets/images/down.png'
import vipIcon from '@/assets/images/vip.png'
import noGoodImg from '@/assets/images/noGood.png'
import { getProducts } from "@/api/store"
import { Link } from 'react-router-dom'
import Recommend from '../../components/Recommend'
class goodsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hostProduct: [],
      productList: [],
      Switch: true,
      where: {
        page: 1,
        limit: 8,
        keyword: getQueryStringByName('s'),
        sid: getQueryStringByName('id') || 0, //二级分类id
        news: 0,
        priceOrder: "",
        salesOrder: ""
      },
      title: getQueryStringByName("title") && getQueryStringByName("id") ? getQueryStringByName("title") : "",
      loadTitle: "",
      loading: false,
      loadend: false,
      price: 0,
      stock: 0,
      nows: false
    }
  }

  componentDidMount() {

    this.get_product_list()
  }
  list = () => {
    return (
      this.state.productList.length > 0 && this.state.productList.map((item, index) => (
        <Link
          to={`/detail/${item.id}`}
          className={`item ${this.state.Switch === true ? '' : 'on'}`}
          key={index}
          title={item.store_name}
        >
          <div className={`pictrue ${this.state.Switch === true ? '' : 'on'}`}>
            <img src={item.image} className={`${this.state.Switch === true ? '' : 'on'}`} alt="" />
          </div>
          <div className={`text ${this.state.Switch === true ? '' : 'on'}`}>
            <div className="name line1">{item.store_name}</div>
            <div
              className={`money font-color-red ${this.state.Switch === true ? '' : 'on'}`}
            >
              ￥<span className="num">{item.price}</span>
            </div>
            <div
              className={`vip acea-row row-between-wrapper ${this.state.Switch === true ? '' : 'on'}`}
            >
              {
                item.vip_price && item.vip_price > 0 && <div className="vip-money">
                  ￥{item.vip_price}<img src={vipIcon} alt="" />
                </div>
              }
              <div>已售{item.sales}件</div>
            </div>
          </div>
        </Link>
      ))
    )
  }

  render() {
    return (
      <div>
        <section className="productList">
          <form onSubmit={this.handleSubmit}>
            <div className="search bg-color-red acea-row row-between-wrapper">
              <div className="input acea-row row-between-wrapper">
                <span className="iconfont icon-sousuo"></span>
                <input placeholder="搜索商品信息" value={this.state.where.keyword} onChange={this.handleChange} />
              </div>
              <div
                className={`iconfont ${this.state.Switch ? 'icon-pailie' : 'icon-tupianpailie'}`}
                onClick={this.switchTap}></div>
            </div>
          </form>
          <div className="nav acea-row row-middle">
            <div className={`item ${this.state.title ? 'font-color-red' : ''}`} onClick={() => this.set_where(0)}>{this.state.title ? this.state.title : '默认'}</div>
            <div className="item" onClick={() => this.set_where(1)}>
              价格
              {this.state.price === 0 && <img src={hornIcon} alt="" />}
              {this.state.price === 1 && <img src={upIcon} alt="" />}
              {this.state.price === 2 && <img src={downIcon} alt="" />}
            </div>
            <div className="item" onClick={() => this.set_where(2)}>
              销量
              {this.state.stock === 0 && <img src={hornIcon} alt="" />}
              {this.state.stock === 1 && <img src={upIcon} alt="" />}
              {this.state.stock === 2 && <img src={downIcon} alt="" />}
            </div>
            <div className={`item ${this.state.nows ? 'font-color-red' : ''}`} onClick={this.set_where.bind(this, 3)}>新品</div>
          </div>
          <div className={`list acea-row row-between-wrapper ${this.state.Switch === true ? '' : 'on'}`}>
            {this.list()}
          </div>
          {
            (this.state.productList.length === 0 && this.state.where.page > 1) && <div
              className="noCommodity"
              style={{ background: '#fff', borderTop: '3px solid #f5f5f5', paddingBottom: '1px' }}
            >
              <div className="noPictrue">
                <img src={noGoodImg} className="image" alt="" />
              </div>
            </div>
          }
          {
            (this.state.productList.length === 0 && this.state.where.page > 1) && <Recommend></Recommend>
          }

        </section>
      </div>
    );
  }

  get_product_list() {

    getProducts(this.state.where).then(res => {
      const productList = this.state.productList.concat(res.data)
      let num = this.state.where.page;
      this.setState({
        productList: productList,
        where: {
          ...this.state.where,
          page: ++num
        }
      })

    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      productList: [],
      where: {
        ...this.state.where,
        page: 1
      }
    },()=>{
      this.get_product_list()
    })
  }

  handleChange = (e) => {
    this.setState({
      where: {
        ...this.state.where,
        keyword: e.target.value
      }
    })
  }

  switchTap = () => {
    this.setState({ Switch: !this.state.Switch })
  }

  set_where(index) {
    // 这一部分放到前面，setState会出现异步问题
    // this.setState({
    //   where: {
    //     ...this.state.where,
    //     page: 1
    //   }
    // })
    switch (index) {
      case 0:
        return this.props.history.push('/category')
      case 1:
        if (this.state.price === 0) {
          this.setState({
            price: 1,
            where: {
              ...this.state.where,
              priceOrder: "asc",
              page:1,
            }
          })
        }
        else if (this.state.price === 1) {
          this.setState({
            price: 2,
            where: {
              ...this.state.where,
              priceOrder: "desc",
              page:1,
            }
          })
        }
        else if (this.state.price === 2) {
          // this.setState({ price: 0 })
          this.setState({
            price: 0,
            where: {
              ...this.state.where,
              priceOrder: "",
              page:1,
            }
          })
        }
        this.setState({ stock: 0 })
        break;
      case 2:
        if (this.state.stock === 0) {
          // this.setState({ stock: 1 })
          this.setState({
            stock: 1,
            where: {
              ...this.state.where,
              salesOrder: "asc",
              page:1,
            }
          })
        } else if (this.state.stock === 1) {
          this.setState({
            stock: 2,
            where: {
              ...this.state.where,
              salesOrder: "desc",
              page:1,
            }
          })
        }
        else if (this.state.stock === 2) {
          this.setState({
            stock: 0,
            where: {
              ...this.state.where,
              salesOrder: "",
              page:1,
            }
          })
        }
        this.setState({ price: 0 })
        break;
      case 3:
        this.setState((prevState) => {
          return {
            nows: !prevState.nows,
            where: {
              ...prevState.where,
              page:1,
              news: prevState.nows ? 0 : 1
            }

          }
        })
        break
      default:
        break;
    }
    this.setState({
      productList: [],
    }, () => {
      this.get_product_list()
    })


  }

  setWhere() {
    if (this.state.price === 0) {
      this.setState({
        where: {
          ...this.state.where,
          priceOrder: ""
        }
      })
    } else if (this.state.price === 1) {
      this.setState({
        where: {
          ...this.state.where,
          priceOrder: "asc"
        }
      })
    } else if (this.state.price === 2) {
      this.setState({
        where: {
          ...this.state.where,
          priceOrder: "desc"
        }
      })
    }
    if (this.state.stock === 0) {
      this.setState({
        where: {
          ...this.state.where,
          salesOrder: ""
        }
      })
    } else if (this.state.stock === 1) {
      this.setState({
        where: {
          ...this.state.where,
          salesOrder: "asc"
        }
      })
    } else if (this.state.stock === 2) {
      this.setState({
        where: {
          ...this.state.where,
          salesOrder: "desc"
        }
      })
    }
    this.setState((state) => (
      {
        where: {
          ...state.where,
          news: state.nows ? 1 : 0
        }
      }
    ))

  }
}

export default goodsList
