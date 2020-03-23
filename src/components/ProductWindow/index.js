import React, { Component } from 'react';


class ProductWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attr: this.props.attr
    }
  }
  // componentWillReceiveProps中将新的props更新到组件的state中
  // 解决 props改变了但是并没有触发state的更新。
  componentWillReceiveProps(nextProps) {
    this.setState({
      attr: nextProps.attr
    })
  }

  render() {
    const attr = this.state.attr
    return (
      <div>
        <div className={`product-window ${attr.cartAttr === true ? 'on' : ''}`}>
          <div className="textpic acea-row row-between-wrapper">
            <div className="pictrue">
              <img src={attr.productSelect.image} className="image" alt="" />
            </div>
            <div className="text">
              <div className="line1">
                {attr.productSelect.store_name}
              </div>
              <div className="money font-color-red">
                ￥<span className="num">{attr.productSelect.price}</span>
                <span className="stock">库存: {attr.productSelect.stock}</span>
              </div>
            </div>
            <div className="iconfont icon-guanbi" onClick={this.onClose}></div>
          </div>
          <div className="productWinList">
            {
              attr.productAttr.length > 0 && attr.productAttr.map((item, index) => (
                <div className="item" key={index}>
                  <div className="title">{item.attr_name}</div>
                  <div className="listn acea-row row-middle">
                    {
                      item.attr_value.map((childItem, childIndex) => (
                        <div className={`itemn ${item.index === childIndex ? 'on' : ''}`} key={childIndex} onClick={() => this.tapAttr(index, childIndex)}>
                          {childItem.attr}
                        </div>
                      ))
                    }
                  </div>

                </div>
              ))
            }
          </div>
          <div className="cart">
            <div className="title">数量</div>
            <div className="carnum acea-row row-left">
              <div
                className={`item reduce ${attr.productSelect.cart_num <= 1 ? 'on' : ''}`}
                onClick={this.cartNumDes}
              >-</div>
              <div className="item num">{attr.productSelect.stock > 0 ? attr.productSelect.cart_num : 0}</div>
              <div
                className={`item plus ${attr.productSelect.cart_num >= attr.productSelect.stock ? 'on' : ''}`}
                onClick={this.cartNumAdd}
              >+ </div>
            </div>
          </div>

        </div>
        {
          attr.cartAttr && <div
            className="mask"
            onTouchMove={(e) => { e.preventDefault() }}
            onClick={this.onClose}
          ></div>
        }

      </div>
    );
  }

  onClose = () => {
    this.props.selectProduct({
      action: 'selectClose',
      value: false
    })
  }
  tapAttr(index, childIndex) {
    const attr = this.state.attr
    attr.productAttr[index].index = childIndex
    this.setState({
      attr: attr
    }, () => {
      let value = this.getCheckedValue().sort().join(',')
      this.props.selectProduct({
        action: 'changeAttr',
        value: value
      })
    })
  }
  // 获取被选中属性；
  getCheckedValue() {
    const productAttr = this.state.attr.productAttr
    let value = []
    for (let i = 0; i < productAttr.length; i++) {
      for (let j = 0; j < productAttr[i].attr_values.length; j++) {
        if (productAttr[i].index === j) {
          value.push(productAttr[i].attr_values[j])
        }
      }
    }
    return value
  }
  cartNumDes = () => {
    this.props.selectProduct({
      action: 'changeCartNum',
      value: false
    })
  }
  cartNumAdd = () => {
    this.props.selectProduct({
      action: 'changeCartNum',
      value: 1
    })
  }
}

export default ProductWindow
