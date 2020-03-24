import React, { Component } from 'react';
import './App.css';
import Layouts from './components/Layouts'
import {
  BrowserRouter as Router,
  // Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import routers from './router/index'
import Tab from './components/Tab/index'
// 页面的标题
import DocumentTitle from 'react-document-title'
import NotDefined from './pages/NotDefined/index'
import { ActivityIndicator } from 'antd-mobile';
import history from '@/config/history'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  render() {
    const token = this.props.token
    return (
      <Layouts>
        <ActivityIndicator
          toast
          text=""
          animating={this.props.isLoading}
        />
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
      </Layouts >

    );
  }

}
const mapStateToProps = (state, ownProps) => {
  return {
    token: state.app.token,
    isLoading: state.app.isLoading,
    data: state.app
  }
}
export default connect(mapStateToProps)(App)
