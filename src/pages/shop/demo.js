import React, { Component } from 'react';
import { getQueryStringByName } from '@/utils/index'
import hornIcon from '@/assets/images/horn.png'
import upIcon from '@/assets/images/up.png'
import downIcon from '@/assets/images/down.png'
import vipIcon from '@/assets/images/vip.png'
import { getProducts } from "@/api/store"
import { Link } from 'react-router-dom'

class goodsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // hostProduct: [],
      // productList: [],
      // Switch: true,
      // where: {
      //   page: 1,
      //   limit: 8,
      //   keyword: getQueryStringByName('s'),
      //   sid: getQueryStringByName('id') || 0, //二级分类id
      //   news: 0,
      //   priceOrder: "",
      //   salesOrder: ""
      // },
      // title: getQueryStringByName("title") && getQueryStringByName("id") ? getQueryStringByName("title") : "",
      // loadTitle: "",
      // loading: false,
      loadend: false,
      price: 0,
      stock: 0,
      nows: false
    }
  }


  render() {
    return (
      <div>
        <section className="productList">
          {/* <form onSubmit={this.handleSubmit}>
            <div className="search bg-color-red acea-row row-between-wrapper">
              <div className="input acea-row row-between-wrapper">
                <span className="iconfont icon-sousuo"></span>
                <input placeholder="搜索商品信息" value={this.state.where.keyword} onChange={this.handleChange} />
              </div>
              <div
                className={`iconfont ${this.state.Switch ? 'icon-pailie' : 'icon-tupianpailie'}`}
                onClick={this.switchTap}></div>
            </div>
          </form> */}
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
            <div className={`item ${this.state.nows ? 'font-color-red' : ''}`} onClick={this.set_where.bind(this,3)}>新品</div>
          </div>

        </section>
      </div>
    );
  }


  handleSubmit = (e) => {
    e.preventDefault()
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
    this.setState({ price: 5 })
    console.log(this.state)
  }

  set_where(index) {
 // })
 this.setState({
  loadend:45
})
console.log('h6666',this.state)
return
    switch (index) {
      case 0:
        return this.props.history.push('/category')
      case 1:
        if (this.state.price === 0) {
          this.setState(() => {
            return { price: 1 }
          })
        }
        else if (this.state.price === 1) this.setState({ price: 2 });
        else if (this.state.price === 2) this.setState({ price: 0 });
        this.setState({ stock: 0 })
        break;
      case 2:
        if (this.state.stock === 0) this.setState({ stock: 1 });
        else if (this.state.stock === 1) this.setState({ stock: 2 });
        else if (this.state.stock === 2) this.setState({ stock: 0 });
        this.setState({ price: 0 })
        break;
      case 3:
        // this.setState({ nows: !this.state.nows })
        // this.setState({
        //   where: {
        //     ...this.state.where,
        //     news: this.state.nows ? 1 : 0
        //   }
        // })
        // this.setState(state=>{
        //   return{
        //     nows:!this.state.nows,
        //     stock:2
        //   }
        // })
        this.setState({
          loadend:45
        })
        console.log('h6666',this.state)

        // this.setState({
        //   where:{
        //     news:4
        //   }
        // })
        break
      default:
        break;
    }
    this.setState({
      productList: [],
      where: {
        ...this.state.where,
        page: 1
      }
    })

    this.get_product_list()
  }

  setWhere() {
    console.log('set',this.state)
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

  }
}

export default goodsList
