import React from 'react'
import './checkout.scss'
import add from './icons/add.png'
import minus from './icons/minus.png'
import remove from './icons/remove.png'
import {BrowserRouter as Router, Switch,Route,Link, useParams} from "react-router-dom";
import image1 from "../../assest/image/product/image1.jpg";
import { useCart } from "../../sevices/hooks/useCart"


export default function Checkout () {
	const { addProduct, cartItems ,total} = useCart();


	
		return (
			<div className='checkout-wrapper'>
				{/* head  */}
				<div className="checkout-header">
					<p>My Cart</p>
				</div>
				{/* head  */}
				{/* body  */}
				<div className="checkout-items-body d-flex flex-column justify-content-between mt-3">

					{Item()}
					{Item()}
					{Item()}
					{Item()}

				</div>
				{/* body  */}

				{/* cost */}
				<div className="checkout-footer col-12 col-md-4 col-sm-6">
					<div className='d-flex flex-row-reverse' style={{width:"100%" }}>
						<div className="total-cost"><p className='cost'>$159.99</p></div>
						<div className="total-cost"><p className='name'>Total cost : </p></div>
					</div>

					<div className='d-flex flex-row-reverse' style={{width:"100%"}}>
						<div className="total-cost"><p className='cost'>$15.98</p></div>
						<div className="total-cost"><p className='name'>Shipping : </p></div>
					</div>

					<div className='d-flex flex-row-reverse' style={{width:"100%"}}>
						<div className="total-cost"><p className='cost' style={{color:"paleturquoise"}}>-$15.98</p></div>
						<div className="total-cost"><p className='name'>Discount : </p></div>
					</div>
				</div>
				{/* cost */}

				<div className='checkout-button col-12 col-md-4 col-sm-6 d-flex'>
					<div className="text col-8" style={{borderRight:"1px solid black"}}><p>CHECKOUT</p></div>
					<div className="text col-4"><p>$170.98</p></div>
				</div>

			</div>
		)

}


function Item(){


	return(<>
	<div className="item-wrapper row d-flex mt-2" style={{marginBottom:"10px"}}>
						 <div className='col-12 col-md-6  d-flex' style={{ padding:"0px" , height:"70px"}}>
							 <img src={image1} alt="" className='item-image rounded' />
							 <div className='item-name'>T-Shirt Summer Vibes</div>
						 </div>
						 <div className='col-12 col-md-6 d-flex justify-content-between' style={{ padding:"0px" , height:"70px"}}>
									<div className="counter-wrapper d-flex justify-content-between row">
											<div className='col-4' ><p style={{marginBottom:"5px"}}>-</p></div>
											<div className='col-4'><p>12</p></div>
											<div className='col-4' ><p style={{marginBottom:"5px"}}>+</p></div>
									</div>

									<div className='price'><p>$89.99</p></div>

									<div className="delet-item">
										<button type="button" className="btn-close btn-close-white" ></button>
									</div>
									
						 </div>
					</div>
	</>)
}