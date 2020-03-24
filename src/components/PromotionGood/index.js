import React from 'react'
import { Link } from 'react-router-dom'

const PromotionGood = ({ benefit }) => {

  return (
    benefit.length > 0 &&
    <div className="promotionGood">
      {
        benefit.map((item, index) => (
          <Link className="item acea-row row-between-wrapper" key={index} to={'detail/' + item.id}>
            <div className="pictrue">
              <img src={item.image} className="image" alt="" />
            </div>
            <div className="text">
              <div className="name line1">{item.store_name}</div>
              <div className="sp-money acea-row">
                <div className="moneyCon">
                  促销价: ￥<span className="num">{item.price}</span>
                </div>
              </div>
              <div className="acea-row row-between-wrapper">
                <div className="money">日常价：￥{item.ot_price}</div>
                <div>仅剩：{item.stock}{item.unit_name}</div>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default PromotionGood
