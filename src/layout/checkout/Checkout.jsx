import React , {useState} from 'react'
import './checkout.scss'
import add from './icons/add.png'
import minus from './icons/minus.png'
import remove from './icons/remove.png'
import {BrowserRouter as Router, Switch,Route,Link, useParams} from "react-router-dom";
import image1 from "../../assest/image/product/image1.jpg";
import { useCart } from "../../sevices/hooks/useCart"


export default function Checkout () {
	const {  cartItems ,total} = useCart();


	
		return (
			<div className='checkout-wrapper'>
				{/* head  */}
				<div className="checkout-header">
					<p>My Cart</p>
				</div>
				{/* head  */}
				{/* body  */}
				<div className="checkout-items-body d-flex flex-column justify-content-between mt-3">
					{cartItems.map((product)=>{
							return (<Item product={product} />)
					})}


				</div>
				{/* body  */}

				{/* cost */}
				<div className="checkout-footer col-12 col-md-4 col-sm-6">
					<div className='d-flex flex-row-reverse' style={{width:"100%" }}>
						<div className="total-cost"><p className='cost'>$ {total}</p></div>
						<div className="total-cost"><p className='name'>Total cost : </p></div>
					</div>

					<div className='d-flex flex-row-reverse' style={{width:"100%"}}>
						<div className="total-cost"><p className='cost'>$ 0</p></div>
						<div className="total-cost"><p className='name'>Shipping : </p></div>
					</div>

					<div className='d-flex flex-row-reverse' style={{width:"100%"}}>
						<div className="total-cost"><p className='cost' style={{color:"paleturquoise"}}>-$ 0</p></div>
						<div className="total-cost"><p className='name'>Discount : </p></div>
					</div>
				</div>
				{/* cost */}
				
				<Link to="/address" className='checkout-button col-12 col-md-4 col-sm-6 d-flex' style={{textDecoration:"none"}}>
					<div className="text col-8" style={{borderRight:"1px solid black"}}><p>CHECKOUT</p></div>
					<div className="text col-4"><p>$ {total}</p></div>
				</Link>

			</div>
		)

}


function Item({product}){
	const { increase , decrease, addProduct, cartItems , removeProduct} = useCart();
	const [quen , setQuen] = useState(product.quantity);


	const increaseItem = ()=>{
		increase({product:product , qun:1})
		setQuen(pre => pre+1)
	}

	const decreaseItem = ()=>{
			if(product.quantity>1){
				decrease(product)
				setQuen(pre => pre-1)
			}else if(product.quantity == 1){
				removeProduct(product)
			}
	}

	return(<>
	<div className="item-wrapper row d-flex mt-2" style={{marginBottom:"10px"}}>
						 <div className='col-12 col-md-6  d-flex' style={{ padding:"0px" , height:"70px"}}>
							 <img src={product && product.images[0].src} alt="" className='item-image rounded' />
							 <div className='item-name'>{product && product.title}</div>
						 </div>
						 <div className='col-12 col-md-6 d-flex justify-content-between' style={{ padding:"0px" , height:"70px"}}>
									<div className="counter-wrapper d-flex justify-content-between row">
											<div className='col-4 counter-btn left' 
											onClick={()=>{decreaseItem()}}
											><p style={{marginBottom:"5px"}}>-</p></div>
											<div className='col-4'><p>{product.quantity}</p></div>
											<div className='col-4 counter-btn right' 
											onClick={()=>{increaseItem()}}
											><p style={{marginBottom:"5px"}}>+</p></div>
									</div>

									<div className='price'><p>$ {product && product.variants[0].price}</p></div>

									<div className="delet-item">
										<button type="button" className="btn-close btn-close-white" ></button>
									</div>
									
						 </div>
					</div>
	</>)
}