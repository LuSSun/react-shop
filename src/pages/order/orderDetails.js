import React, { Component } from 'react';
import { connect } from 'react-redux';



class OrderDetails extends Component {
  render() {
    return (
      <div style={{
        lineHeight:'1.5rem',
        marginLeft:'0.2rem'
      }}>
        待开发。。。。
      </div>
    );
  }
}
 const mapStateToProps=({state})=> {
  return {

  };
}
export default connect(
  mapStateToProps,
)(OrderDetails);
