import React from 'react'
import { Link } from 'react-router-dom'
import oneImg from '@/assets/images/one.png'
import twoImg from '@/assets/images/two.png'
import threeImg from '@/assets/images/three.png'
import vipImg from '@/assets/images/vip.png'
const GoodList = ({ goodList, isSort }) => {
	return (
		<div className="goodList">
			{
			  goodList.length>0 &&	goodList.map((item, index) => (
					<Link className="item acea-row row-between-wrapper" key={index} to={`/detail/${item.id}`}>
						<div className="pictrue">
							<img src={item.image} className="image" alt="" />
							{
								(isSort === true && index === 0) && <img
									src={oneImg}
									className="numPic" alt="" />
							}
							{
								(isSort === true && index === 1) && <img
									src={twoImg}
									className="numPic" alt="" />
							}
							{
								(isSort === true && index === 2) && <img
									src={threeImg}
									className="numPic" alt="" />
							}

						</div>
						<div className="underline">
							<div className="text">
								<div className="line1">{item.store_name}</div>
								<div className="money font-color-red">
									￥<span className="num">{item.price}</span>
								</div>
								<div className="vip-money acea-row row-middle">
									{
										item.vip_price && item.vip_price > 0 && <div className="vip">
											￥{
												item.vip_price || 0
											}<img src={vipImg} className="image" alt="" />
										</div>
									}
									<span className="num">已售{item.sales}{item.unit_name}</span>
								</div>
							</div>
						</div>
						<div
							className="iconfont icon-gouwuche cart-color acea-row row-center-wrapper"
						></div>
					</Link>
				))
			}

		</div>
	)
}
export default GoodList
