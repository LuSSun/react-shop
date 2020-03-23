import React, { Component } from 'react';
import { getHostProducts } from "@/api/store";
import { Link } from 'react-router-dom'


class Recommend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hostProduct: [],
      page: 1,
      limit: 20,
      loadTitle: "",
      loading: false,
      loadend: false
    }
  }

  componentDidMount(){
    this.hostProducts()
  }

  render() {
    return (
      this.state.hostProduct.length > 0 && <div className="recommend">
        <div className="title acea-row row-center-wrapper">
          <span className="iconfont icon-zhuangshixian"></span>
          <span className="name">为你推荐</span>
          <span className="iconfont icon-zhuangshixian lefticon"></span>
        </div>
        <div className="recommendList acea-row row-between-wrapper">
          {
            this.state.hostProduct.map((item, index) => (
              <Link className="item" key={index} to={`/detail/${item.id}`}>
                <div className="pictrue">
                  <img src={item.image} className="image" alt="" />
                </div>
                <div className="name line1">{item.store_name}</div>
                <div className="money font-color-red">
                  ￥<span className="num">{item.price}</span>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    );
  }

  hostProducts(){
    getHostProducts(this.state.page, this.state.limit).then(res => {
      //apply();js将一个数组插入另一个数组;
      // this.state.hostProduct.push.apply(that.hostProduct, res.data);
      // that.loadend = res.data.length < that.limit; //判断所有数据是否加载完成；
      // that.page = that.page + 1;
      const hostProduct = this.state.hostProduct.concat(res.data)
      this.setState({
        hostProduct:hostProduct,
        page:this.state.page + 1
      })
    });
  }
}

export default Recommend;
