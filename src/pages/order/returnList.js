import React, { Component } from 'react'
import img from '@/assets/images/noOrder.png'
import styled from 'styled-components'
const NoDataCss = styled.div`
  &.noCart{
    margin-top: 0.17rem;
    padding-top: 0.1rem;
    .pictrue{
      width: 4rem;
      height: 3rem;
      margin: 0.7rem auto 0.5rem auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
`
export default class refundList extends Component {
  render() {
    return (
      <NoDataCss className="noCart">
        <div class="pictrue"><img src={img} alt="" /></div>
      </NoDataCss>
    )
  }
}
