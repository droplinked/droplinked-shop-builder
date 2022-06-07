import { useState, useRef, useEffect } from 'react'
import Creadit from "./Creadit"
import axios from 'axios';
import { useProfile } from "../../../sevices/hooks/useProfile"
import StripContainer from './StripContainer';
import { Link } from "react-router-dom";

import './payments.scss'

function Payments() {
	const { profile } = useProfile();
	const personId = profile.id;

	const [cards, setCard] = useState(null);
	const [showbtn, setShowBtn] = useState(false);


	useEffect(() => {
		axios.post('https://dev.flatlay.io/stripe/customer',
			{

			},
			{
				headers: {
					"Content-Type": "application/json",
					authorization: personId,
				}
			}).then((res) => {
				//console.log(res.data.customerID);
				localStorage.setItem('checkout-customerId', JSON.stringify(res.data.customerID));
			});


	}, [])

	const addcart = (cr)=>{
		setCard(cr);
	}



	return (
		<>
			<div className="main d-flex flex-column justify-content-center align-items-center">
				<div style={{ padding: "0px", backgroundColor: "#222", width: "100%", height: "auto" }}>
					<StripContainer add={addcart}/>
				</div>
				{(cards != null) &&
					<Link to="/confirm">
						<button className='payment-page-con-btn' >continue to confirm</button>
					</Link>
				}

				{/* <Creadit /> */}
			</div>
		</>

	)

}



export default Payments
