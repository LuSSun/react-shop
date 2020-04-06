import React, { Component } from 'react';


class UserEvaluation extends Component {
  render() {
    return (
      this.props.reply.length > 0 &&
      <div className="evaluateWtapper">
        {
          this.props.reply.map((item, index) => (
            <div className="evaluateItem" key={index}>
              <div className="pic-text acea-row row-middle">
                <div className="pictrue">
                  <img src={item.avatar} className="image" alt="" />
                </div>
                <div className="acea-row row-middle">
                  <div className="name line1">{item.nickname}</div>
                  <div className={`start star ${item.star}`}></div>
                </div>
              </div>
              <div className="time">{item.add_time} {item.suk}</div>
              <div className="evaluate-infor">{item.comment}</div>
              <div className="imgList acea-row">
                {
                  (item.pics !== null && item.pics.length > 0) && item.pics.map((childItem, childIdex) => (
                    <div className="pictrue" key={childIdex}>
                      <img src={childItem} className="image" alt="" />
                    </div>
                  ))
                }
              </div>
              {
                item.merchant_reply_content && <div className="reply">
                  <span className="font-color-red">店小二</span>：
                  {item.merchant_reply_content}
                </div>
              }
            </div>
          ))
        }
      </div>
    );
  }
}

export default UserEvaluation
