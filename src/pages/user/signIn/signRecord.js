import React, { Component } from 'react';
import { getSignMonth } from "@/api/user";
import { ListView, ActivityIndicator } from 'antd-mobile';
import noCouponIcon from '@/assets/images/noCoupon.png'


class SignRecord extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      page: 1,
      limit: 3,
      signList: [],
      loading: false,
      loadend: false,
    }
  }
  componentDidMount() {
    this.getData()
  }
  async getData() {
    const res = await getSignMonth(this.state.page, this.state.limit)
    const signList = this.state.signList.concat(res.data)
    this.setState({
      signList: signList,
      page: this.state.page + 1,
      loading: false,
      loadend: res.data.length < this.state.limit
    })
  }
  onEndReached = () => {
    if (!this.state.loadend) {
      this.setState({ loading: true })
      this.getData()
    }
  }

  render() {
    const { dataSource } = this.state
    const rowList = (item, sectionId, index) => {
      return (
        <div className="item" key={index}>
          <div className="data">{item.month}</div>
          <div className="listn">
            {
              item.list.length > 0 && item.list.map((childItem, childIndex) => (
                <div className="itemn acea-row row-between-wrapper" key={childIndex}>
                  <div>
                    <div className="name line1">{childItem.title}</div>
                    <div>{childItem.add_time}</div>
                  </div>
                  <div className="num font-color-red">+{childItem.number}</div>
                </div>
              ))
            }
          </div>
        </div>
      )
    }
    return (
      <div className="sign-record">
        <div className="list">
          {
            this.state.signList.length>0 && <ListView
            dataSource={dataSource.cloneWithRows(this.state.signList)}
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
        </div>

        {
          (this.state.signList.length === 0 && this.state.page > 1) &&
          <div className="noCommodity" >
            <div className="noPictrue">
              <img src={noCouponIcon} className="image" alt="" />
            </div>
          </div>
        }
      </div>

    );
  }
}

export default SignRecord
