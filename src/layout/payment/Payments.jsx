import { useState, useRef, useEffect } from 'react'
import Creadit from "./Creadit"
import axios from 'axios';
import { useProfile } from "../../sevices/hooks/useProfile"
import StripContainer from './StripContainer';

import './payments.scss'

function Payments() {
	const { profile } = useProfile();
	const personId = profile.id;

	const [cards, setCard] = useState([]);
	const [showNewCard, setShowNewCard] = useState(false);


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
				console.log(res.data.customerID);
				localStorage.setItem('checkout-customerId', JSON.stringify(res.data.customerID));
			});

	}, [])

	const setCardData = (data) => {
		console.log(cards);
		setCard([...cards, data]);
	}

	const toggleShow = () => {
		setShowNewCard(pre => !pre)
	}



	return (
		<>
			<div className="main d-flex justify-content-center align-items-center">
				<div style={{ backgroundColor: "white" , width:"50%" , height:"auto" }}>
					<StripContainer />
				</div>
				{/* <Creadit /> */}
			</div>
		</>

	)

}



export default Payments
