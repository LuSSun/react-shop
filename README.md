## 简介
此项目是基于 react全家桶 + Ant Design Mobile 技术栈仿CRMEB的h5商城网站。
模仿CRMEB vue版H5前端页面。
## 效果

## 已经完成的功能
- [x] 登陆
- [x] 注册
- [x] 首页
- [x] 分类
- [x] 购物车
- [x] 我的
- [x] 优惠券列表
- [x] 签到
- [x] 行业资讯
- [x] 我的收藏
- [x] 商品搜索
- [x] 商品详情
- [x] 移动端适配

## 前端主要技术
- react: "^16.13.0"
- react-router-dom: "^5.1.2"
- react-redux: "^7.2.0"
- redux: "^4.0.5"
- redux-thunk: "^2.3.0"
- styled-components: "^5.0.1"
- react-id-swiper: "^3.0.0"
- html2canvas: "^1.0.0-rc.5"

## 项目搭建
项目是按 antd-mobile 推荐的教程来搭建的：antd-mobile [在 create-react-app](https://mobile.ant.design/docs/react/use-with-create-react-app-cn) 中使用 , 实现了 按需加载组件代码和样式。
## 主要项目结构

```
- src
  - api 
    - public.js 公共api
    - store.js  商品api
    - user.js  用户api
  - assets
    - css  样式
    - iconfont 引入的字体
    - images 图片
    - js js文件
  - components 
    - AsyncComponent 路由引入的懒加载组件
      - index.js
    - CouponWindow 弹出组件
    - GoodList 商品列表
    - Layouts 布局组件
    - ProductConSwiper 商品详情的轮播图组件
    - StorePoster 生成海报组件
    - Tab tab组件（首页，分类，购物车，我的）
  - config
    - history.js 获取history对象
    - index.js 配置
  - libs
    - login.js 登录跳转逻辑
  - pages
    - home
      - index.js 首页
      - index.less less样式
    - login
      - index.js 登录页面
      - retrievePassword.js 注册页面
    - NotDefined
      - index.js 未找到的页面（404页面）
      - css.js styled-components设置当前页面样式
    - order
      - myOrder.js 订单页面
      - orderDetails.js 订单详情页面
    - shop
      - news
        - newList.js 资讯列表页面
        - newDetail.js 资讯详情页面
      - GoodsClass.js 产品分类页面
      - goodsCollection.js 收藏商品页面
      - goodsDetails.js 商品详情页面
      - goodsList.js 商品搜索列表页面
      - goodsPromotion.js 促销单品页面
      - hotNewGoods.js 热门商品页面
      - location.js 地图页面
      - shoppimgCart.js 购物车页面
    - user
      - signIn
        - sign.js 签到页面
        - signRecord.js 签到记录页面
      - use.js 我的页面
      - userCoupon.js 我的优惠券页面
      - userVip.js 会员中心页面
  - router
    - index.js 路由集中管理
  - store redux 的状态管理
  - utils 常用的方法
  - App.js
```

## 注意
react登录拦截实现 在App.js里面如下代码。


```
<Router history={history}>
  <Switch>
    {
      routers.map((route, key) => {
        return (
          <Route
            exact={!!route.exact}
            key={key}
            path={route.path}
            render={(renderHistory) => {
              if (route.meta.backgroundColor) {
                document.body.style.backgroundColor = route.meta.backgroundColor
              } else {
                document.body.style.backgroundColor = '#f5f5f5'
              }
              return (
                <DocumentTitle title={route.meta.title}>
                  <div className={route.isTab ? 'tabPageContent' : 'noTabPageContent'}>
                    {
                      !route.meta.auth ? <route.component {...renderHistory} routeMeta={route.meta} />
                        : (token ? <route.component {...renderHistory} routeMeta={route.meta} />
                          : <Redirect to={{
                            pathname: '/login',
                            state: { from: renderHistory.location }
                          }}></Redirect>
                        )
                    }
                  </div>
                </DocumentTitle>
              )
            }}
          >
          </Route>
        )
      })
    }
    {/* 匹配404页面 */}
    <Route path="*" component={NotDefined}>
    </Route>
  </Switch>
  <Tab></Tab>
</Router>

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.app.token,
    isLoading: state.app.isLoading,
    data: state.app
  }
}
export default connect(mapStateToProps)(App)
```
其中 DocumentTitle第三方组件 设置document.title。


## 安装


```
# install dependencies
npm install
```


```
# Compiles and hot-reloads for development
npm start
```


```
# Compiles and minifies for production
npm run build
```
