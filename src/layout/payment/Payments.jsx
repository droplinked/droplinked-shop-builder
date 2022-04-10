import {useState , useRef} from 'react'
import Creadit from "./Creadit"

import './payments.scss'

function Payments () {
	
	const[cards , setCard]=useState([]);
	const[showNewCard , setShowNewCard]=useState(false);

		const setCardData = (data) => {
			console.log(cards);
			setCard([...cards, data]);
		}

		const toggleShow = () =>{
			setShowNewCard(pre => !pre)
		}



		return (
			<div className="main">
				<Creadit />
			</div>
			
		)
	
}

// function NewPayment (props) {
// 	const { register, handleSubmit , formState : {errors}  } = useForm()
// 	const[cardNumber , setCardNumber]=useState("")
// 	const[cardExpire , setCardExpire]=useState("")
// 	const[cardCvc , setCardCvc]=useState("")

// 	function change(event){
// 		setCardNumber(event.target.value.toString());
// 		if(cardNumber.length>17)document.getElementById("expire").focus();
// 	}


// 	function changeExpire(event){
// 		if(event.target.value.length==2){
// 			setCardExpire(event.target.value.toString()+"/")
// 		}else{
// 			setCardExpire(event.target.value.toString())
// 		}
// 		if(event.target.value.length==5)document.getElementById("cvc").focus();
// 	}


// 	const changeCvc= (event) => {
// 		setCardCvc(event.target.value);
// 	}



// 	const addNewCard =()=>{
// 		return {
// 			CardNumber : cardNumber ,
// 			cardExpiratioin : cardExpire , 
// 			cardCvc : cardCvc
// 		}
// 	}


// 	const clearAll = () =>{
// 		setCardNumber("");
// 		setCardExpire("");
// 		setCardCvc("");
// 	}

// 		return (
// 			<div className='card payments-new p-3 rounded-2'>
// 				<p className='text-center'>new card</p>
// 				<div>
// 					<div className='bg-white rounded my-4 p-2 d-flex flex-row flex-nowrap'>
// 						<img src={credit} alt='card' height='24px' />
// 						<input type='text' placeholder='card number' className='ms-3 flex-grow-1'
// 						onChange={change}
// 						value={cardNumber.replace(/(\d{4}(?!\s))/g, "$1 ")}
// 						maxLength="19"
// 						/>

// 						<input type='text' placeholder='mm / yy' className='ms-3' id="expire"
// 							onChange={changeExpire}
// 							value={cardExpire}
// 							maxLength="5"
// 						/>

// 						<input type='text' placeholder='cvc' className='ms-3' 
// 							maxLength="3"
// 							id="cvc"
// 							onChange={changeCvc}
// 							value={cardCvc}
// 						/>
// 					</div>
// 				</div>
// 				<div class='d-flex align-items-end justify-content-end'>
// 					<button class='btn btn-dark btn-sm rounded-pill px-4' type='submit'
// 						onClick={()=>{
// 							props.add(addNewCard());
// 							clearAll();
// 							props.toggleFunc();
// 						}}
// 					>
// 						save
// 					</button>
// 					<button class='btn btn-sm ml-3' type='button'>
// 						cancel
// 					</button>
// 				</div>
// 			</div>
// 		)
	
// }

export default Payments
