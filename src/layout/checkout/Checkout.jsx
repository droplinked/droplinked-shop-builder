import React from 'react'
import './checkout.scss'
import add from './icons/add.png'
import minus from './icons/minus.png'
import remove from './icons/remove.png'
import {BrowserRouter as Router, Switch,Route,Link, useParams} from "react-router-dom";
import { useCart } from "../../components/hooks/useCart"


export default function Checkout () {
	const { addProduct, cartItems ,total} = useCart();


	
		return (
			<div className='p-3 rounded bg-white shadow-sm checkout'>
				<h1>Shopping List</h1>
				<table className='table'>
					<tbody>
						<tr className='text-muted'>
							<td>Product</td>
							<td>Amount</td>
							<td>Price</td>
							<td></td>
						</tr>
						{cartItems.length > 0
							?
							
							cartItems.map((item)=>{
								return <CheckoutProduct detail={item} />
							})
							
							:
							<>
							<h1>no</h1>
							</>

						}
						
						
					</tbody>
				</table>
				<div className='text-end p-3'>
					<span className='text-muted'>Total Cost:</span> ${total}
				</div>
				<div className='p-3 d-flex flex-row justify-content-between align-items-center'>
					<button className='btn btn-lg btn-light rounded-pill'>Continue Shopping</button>
					<Link to="/address">
					<button className='btn btn-dark btn-lg rounded-pill '>
						Checkout | <span>${total}</span>
					</button>
					</Link>
				</div>
			</div>
		)
	
}

function CheckoutProduct (props) {
	const { increase , decrease } = useCart();
	
		return (
			<tr>
				<td>
					<div className='d-flex flex-row align-items-center'>
						<img
							className='mr-2 cursor-pointer checkout__product-img '
							src={props.detail.images[0].src}
							alt=''
						/>
						<div className=''>
							<h2 className='m-0 cursor-pointer title ' style={{}}>
							{props.detail.title} 
							</h2>
							<p className='m-0 text-muted'>60 Tablets</p>
							
						</div>
					</div>
				</td>
				<td>
					<div className='checkout__product-counter d-flex flex-row justify-content-between align-items-center px-3'>
						<img className='checkout__product-counter-button' src={minus} alt='' 
							onClick={()=>{decrease(props.detail)}}
						/>
						<input
							className='checkout__product-counter-input'
							type='text'
							readOnly
							value={props.detail.quantity}
						/>
						<img className='checkout__product-counter-button' src={add} alt=''
							onClick={()=>{increase(props.detail)}}
						/>
					</div>
				</td>
				<td className='m-0'>{props.detail.variants[0].formatted_price}</td>
				<td>
					<img className='checkout__product-remove' src={remove} alt='' />
				</td>
			</tr>
		)
	
}
