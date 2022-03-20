import React, { Component } from 'react'
import './checkout.scss'

import add from './icons/add.png'
import minus from './icons/minus.png'
import remove from './icons/remove.png'
import {BrowserRouter as Router, Switch,Route,Link, useParams} from "react-router-dom";

export default class Checkout extends Component {
	render() {
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
						<CheckoutProduct />
						<CheckoutProduct />
						<CheckoutProduct />
					</tbody>
				</table>
				<div className='text-end p-3'>
					<span className='text-muted'>Total Cost:</span> $13.57
				</div>
				<div className='p-3 d-flex flex-row justify-content-between align-items-center'>
					<button className='btn btn-lg btn-light rounded-pill'>Continue Shopping</button>
					<button className='btn btn-dark btn-lg rounded-pill '>
						Checkout | <span>$13.57</span>
					</button>
				</div>
			</div>
		)
	}
}

class CheckoutProduct extends Component {
	render() {
		return (
			<tr>
				<td>
					<div className='d-flex flex-row align-items-center'>
						<img
							className='mr-2 cursor-pointer checkout__product-img'
							src='https://cdn.shopify.com/s/files/1/1857/6931/products/jIOxlFqFB7.jpg?v=1639708508'
							alt=''
						/>
						<div>
							<h2 className='m-0 cursor-pointer'>
								Sri Sri Tattva Turmeric Cardiac Care Tablets
							</h2>
							<p className='m-0 text-muted'>60 Tablets</p>
						</div>
					</div>
				</td>
				<td>
					<div className='checkout__product-counter d-flex flex-row justify-content-between align-items-center px-3'>
						<img className='checkout__product-counter-button' src={minus} alt='' />
						<input
							className='checkout__product-counter-input'
							type='text'
							readOnly
							value={1}
						/>
						<img className='checkout__product-counter-button' src={add} alt='' />
					</div>
				</td>
				<td className='m-0'>$6.11 USD</td>
				<td>
					<img className='checkout__product-remove' src={remove} alt='' />
				</td>
			</tr>
		)
	}
}
