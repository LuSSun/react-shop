import React, { Component } from 'react';
import shareIcon from '@/assets/images/share-info.png'
import styled from 'styled-components'
const ShareCss = styled.div`
  &.poster-first {
    overscroll-behavior: contain;
    .mask-share {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10000;
      height: 100%;
    }
    .mask-share img {
      display:block;
      width: 100%;
      height:100%;
    }
  }

`
class ShareInfo extends Component {

  render() {
    return (
      this.props.shareInfoStatus && <ShareCss className="poster-first">
        <div className="mask-share">
          <img src={shareIcon} alt="" onClick={this.shareInfoClose} />
        </div>
      </ShareCss>

    );
  }

  shareInfoClose = () => {
    this.props.setShareInfoStatus()
  }
}

export default ShareInfo
