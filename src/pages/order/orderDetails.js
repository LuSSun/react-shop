import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveDemo } from '../../store/action'

@connect(
  state => ({ data: state.app }),
  { saveDemo }
)
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
        <p>{this.props.data.userInfo}</p>
        待开发。。。。
      </div>
    );
  }
  componentDidMount() {
    console.log(this.props)
  }

}

export default OrderDetails



// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// class OrderDetails extends Component {
//   render() {
//     return (
//       <div style={{
//         lineHeight:'1.5rem',
//         marginLeft:'0.2rem'
//       }}>
//         待开发。。。。
//       </div>
//     );
//   }
// }
//  const mapStateToProps=({state})=> {
//   return {

//   };
// }
// export default connect(
//   mapStateToProps,
// )(OrderDetails);
