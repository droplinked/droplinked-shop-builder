import {useState} from 'react'
import {BrowserRouter as Router, Switch,Route,Link, useParams} from "react-router-dom";
import info from './icons/info.png'
import add from './icons/add.png'
import credit from './icons/credit-card.png'

import './payments.scss'

function Payments () {
	console.log("123456789101112".replace(/(\d{4}(?!\s))/g, "$1 "));

	
		return (
			<div className='payments d-flex flex-column mb-4 px-4'>
				<h2 className='text-center'>payments</h2>
				<p className='text text-center'>
					keep cards on file to easily make one-click purchases
				</p>
				<div className='m-3'>
					<div className='p5 text-center text-muted'>
						<img src={info} alt='info' width='24px' height='24px' />
						<p>there is no card</p>
					</div>
				</div>
				<div className='text-center p-3'>
					<button className='btn'>
						<img src={add} alt='add' width='18px' height='18px' />
						<span className='ms-2'>add new card</span>
					</button>
				</div>
				{<NewPayment />}
				<Link to="/confirm">
					<button>
						proceed to confirm
					</button>
				</Link>
			</div>
		)
	
}

function NewPayment () {
	const[cardNumber , setCardNumber]=useState("")
	function change(event){
		setCardNumber(event.target.value.toString());
	}
		return (
			<div className='card payments-new p-3 rounded-2'>
				<p className='text-center'>new card</p>
				<div>
					<div className='bg-white rounded my-4 p-2 d-flex flex-row flex-nowrap'>
						<img src={credit} alt='card' height='24px' />
						<input type='text' placeholder='card number' className='ms-3 flex-grow-1'
						onChange={change}
						value={cardNumber.replace(/(\d{4}(?!\s))/g, "$1 ")}
						maxLength="19"
						/>
						<input type='text' placeholder='mm / yy' className='ms-3' />
						<input type='text' placeholder='cvc' className='ms-3' />
					</div>
				</div>
				<div class='d-flex align-items-end justify-content-end'>
					<button class='btn btn-dark btn-sm rounded-pill px-4' type='submit'>
						save
					</button>
					<button class='btn btn-sm ml-3' type='button'>
						cancel
					</button>
				</div>
			</div>
		)
	
}

export default Payments
