import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveDemo } from '../../store/action'

function logHoc(WrappedComponent) {
  @connect(
    state => ({ data: state.app }),
    { saveDemo }
  )
  class Page extends Component {
    static displayName ='ABC'

    componentWillMount() {
      this.start = Date.now()
    }
    componentDidMount() {
      this.end = Date.now()
      console.log(WrappedComponent)
      console.log(`${WrappedComponent.dispalyName} 渲染时间：${this.end - this.start} ms`);
      console.log(`进入${WrappedComponent.dispalyName}`);
      console.log('wrapper',this.props)
    }

    componentWillUnmount() {
      console.log('退出')
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return Page
}


export default logHoc
