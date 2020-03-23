import React from 'react'
import { getSearchKeyword } from "@/api/store";

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      keywords: []
    }
  }
  componentDidMount(){
    this.getData()
  }

  render() {
    return (
      <div className="searchGood">
        <div className="search acea-row row-between-wrapper">
          <div className="input acea-row row-between-wrapper">
            <span className="iconfont icon-sousuo2"></span>
            <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="点击搜索商品" value={this.state.search} onChange={this.handleChange} />
            </form>
          </div>
          <div className="bnt" onClick={this.handleSubmit}>搜索</div>
        </div>
        {
          this.state.keywords.length > 0 && <div>
            <div className="title">热门搜索</div>
            <div className="list acea-row">
              {
                this.state.keywords.map((item, index) => (
                  <div className="item" key={index} onClick={()=>this.toSearch(item)}>
                    {item}
                  </div>
                ))
              }
            </div>

          </div>
        }
        <div className="line"></div>
      </div>
    )
  }
  getData(){
    getSearchKeyword().then(res=>{
      this.setState({
        keywords:res.data
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const search = this.state.search.trim() || ''
    if(!search) return
    this.toSearch(search)
  }
  toSearch = (val)=>{
    this.props.history.push('/goods_list?s='+val)
  }
  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }
}
export default Search
