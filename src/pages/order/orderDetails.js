import React, { Component } from 'react';
import logHoc from './test'
import Form from './demo/Form'
// import Input from './demo/Input'
@logHoc

class OrderDetails extends Component {
  clickHandle = () => {
    this.props.saveDemo(323)
  }
  render() {
    return (
      <div style={{
        lineHeight: '1.5rem',
        marginLeft: '0.2rem'
      }}>
        <div onClick={this.clickHandle}>点击啊</div>
        <p>{this.props.data && this.props.data.userInfo}</p>
        <Form></Form>
        <Form></Form>
      </div>
    );
  }
  componentDidMount() {
    console.log('page', this.props)
  }
}

export default OrderDetails

