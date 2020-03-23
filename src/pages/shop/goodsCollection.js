import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import noCollection from '@/assets/images/noCollection.png'
import Recommend from '@/components/Recommend'
import { getCollectUser, getCollectDel } from "@/api/user";
import { Modal, Toast, ListView, ActivityIndicator } from 'antd-mobile'

class GoodsCollection extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      page: 1,
      limit: 20,
      collectProductList: [],
      loadTitle: "",
      loading: false,
      loadend: false
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    getCollectUser(this.state.page, this.state.limit).then(res => {
      const collectProductList = this.state.collectProductList.concat(res.data)
      this.setState({
        collectProductList: collectProductList,
        page: this.state.page + 1,
        loading: false,
        loadend: res.data.length < this.state.limit
      })

    })
  }

  onEndReached = () => {
    if (!this.state.loadend) {
      this.setState({ loading: true })
      this.getData()
    }
  }

  render() {
    const rowList = (item, sectionID, index) => {
      return (
        <Link className="item acea-row row-between-wrapper" key={index} to={`/detail/${item.pid}`}>
          <div className="pictrue"><img src={item.image} alt="" /></div>
          <div className="text acea-row row-column-between">
            <div className="infor line1">{item.store_name}</div>
            <div className="acea-row row-between-wrapper">
              <div className="money font-color-red">￥{item.price}</div>
              <div className="delete" onClick={(e) => this.delCollection(e, index)}>删除</div>
            </div>
          </div>
        </Link>
      )
    }
    return (
      <div>
        {
          this.state.collectProductList.length > 0 &&
          <div className="collectionGoods">
            <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.collectProductList)}
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

          </div>
        }
        {
          (this.state.collectProductList.length === 0 && this.state.page > 1) && <div
            className="noCommodity"
            style={{ backgroundColor: '#fff' }}
          >
            <div className="noPictrue">
              <img src={noCollection} className="image" alt="" />
            </div>
            <Recommend></Recommend>
          </div>
        }
      </div>

    );
  }

  delCollection(e, index) {
    e.preventDefault()
    Modal.alert('提示', '你确定要删除吗', [
      { text: '取消', onPress: () => { } },
      {
        text: '确定', onPress: () => {
          const id = this.state.collectProductList[index].pid,
            category = this.state.collectProductList[index].category;
          getCollectDel(id, category).then(res => {
            Toast.info('删除成功', 1, () => {
              this.state.collectProductList.splice(index, 1)
              this.setState({
                collectProductList: this.state.collectProductList
              })
            })
          })
        }
      }
    ])
  }
}

export default GoodsCollection
