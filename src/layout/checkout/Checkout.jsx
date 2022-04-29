import React, { useState } from 'react'
import './checkout.scss'
import add from './icons/add.png'
import minus from './icons/minus.png'
import remove from './icons/remove.png'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import image1 from "../../assest/image/product/image1.jpg";
import { useCart } from "../../sevices/hooks/useCart"


export default function Checkout() {
	const { state, increase } = useCart();

	const total = () => {
		let totalCost;
		let arr = [];
		if (state != undefined) {
		arr = state.map((item)=>{
			 return parseFloat(item.variant.price)
		})
		}
		totalCost = arr.reduce((a,b)=>{return a+b} , 0)
		return totalCost;
	}



	return (
		<div className='checkout-wrapper'>
			{/* head  */}
			<div className="checkout-header">
				<p>My Cart</p>
			</div>
			{/* head  */}
			{/* body  */}
			<div className="checkout-items-body d-flex flex-column justify-content-between mt-3">
				{(state != undefined) && state.map((item) => {
					return (<Item product={item.product} variant={item.variant} amount={item.amount} />)
				})}


			</div>
			{/* body  */}

			{/* cost */}
			<div className="checkout-footer col-12 col-md-4 col-sm-6">
				<div className='d-flex flex-row-reverse' style={{ width: "100%" }}>
					<div className="total-cost"><p className='cost'>$ {total()}</p></div>
					<div className="total-cost"><p className='name'>Total cost : </p></div>
				</div>

				{/* <div className='d-flex flex-row-reverse' style={{ width: "100%" }}>
					<div className="total-cost"><p className='cost'>$ 0</p></div>
					<div className="total-cost"><p className='name'>Shipping : </p></div>
				</div> */}

				{/* <div className='d-flex flex-row-reverse' style={{ width: "100%" }}>
					<div className="total-cost"><p className='cost' style={{ color: "paleturquoise" }}>-$ 0</p></div>
					<div className="total-cost"><p className='name'>Discount : </p></div>
				</div> */}
			</div>
			{/* cost */}

			<Link to="/address" className='checkout-button col-12 col-md-4 col-sm-6 d-flex' style={{ textDecoration: "none" }}>
				<div className="text col-7" style={{ borderRight: "1px solid black" }}><p style={{ color: "black" }}>CHECKOUT</p></div>
				<div className="text col-5" ><p style={{ color: "black" }}>${total()}</p></div>
			</Link>

		</div>
	)

}


function Item({ product, variant, amount }) {
	//	const { increase , decrease, addProduct, cartItems , removeProduct} = useCart();
	const [quen, setQuen] = useState(amount);


	const increaseItem = () => {
		// increase({product:product , qun:1})
		setQuen(pre => pre + 1)
	}

	const decreaseItem = () => {
		if (amount > 1) {
			// decrease(product)
			setQuen(pre => pre - 1)
		} else if (amount == 1) {
			//removeProduct(product)
		}
	}

	return (<>
		<div className="item-wrapper row d-flex mt-2" style={{ marginBottom: "10px" }}>
			<div className='col-12 col-md-6  d-flex' style={{ padding: "0px", height: "70px" }}>
				<img src={product && product.images[0].src} alt="" className='item-image rounded' />
				<div className='item-name'>{product && product.title}</div>
			</div>
			<div className='col-12 col-md-6 d-flex justify-content-between' style={{ padding: "0px", height: "70px" }}>
				<div className="counter-wrapper d-flex justify-content-between row">
					<div className='col-4 counter-btn left'
						onClick={() => { decreaseItem() }}
					><p style={{ marginBottom: "5px" }}>-</p></div>
					<div className='col-4'><p>{amount}</p></div>
					<div className='col-4 counter-btn right'
						onClick={() => { increaseItem() }}
					><p style={{ marginBottom: "5px" }}>+</p></div>
				</div>

				<div className='price'><p>$ {variant.price}</p></div>

				<div className="delet-item">
					<button type="button" className="btn-close btn-close-white" ></button>
				</div>

			</div>
		</div>
	</>)
}