import "./confirm.scss"
import { useState  } from "react"
import {Link } from "react-router-dom";
import { useCart } from "../hooks/useCart"


export default function Confirm(){
    const [Show, setModalShow] = useState(false);
    const { clearCart , cartItems , total} = useCart();

    const showModal=()=>{setModalShow(true)}
    const hideModal=()=>{setModalShow(false)}

    return(
        <>
            <Modal show={Show} />
            <div className="p-3 p-lg-4">
                <div className="row">
                    <div className="col-12 col-lg-7">
                        <div className="bg-white rounded-2 shadow-sm p-3 p-lg-4">
                            <div>
                                <div className="mb-4">
                                    <h2 class="mb-2"><strong>My address</strong></h2>
                                    <div className="box rounded-2 p-3 mb-3">
                                        <h3 className="mb-2">
                                         <strong>iran -ahwaz</strong>
                                        </h3>
                                        <p className="text-muted mb-1">address line 1 here</p>
                                        <p className="text-muted mb-1">khozestan|1334|behdad|mansouri</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                        <h2 className="mb-2"><strong>Shipping</strong></h2>
                                        <div className="box rounded-2 p-3 mb-3">
                                            <div className="d-flex flex-row align-items-center justify-content-between">
                                                <strong>First Class Package International</strong>
                                                <span>$15.34</span>
                                            </div>
                                        </div>
                                  </div>
                                
                                <div className="mb-4">
                                    <h2 className="mb-2"><strong>Payment method</strong></h2>
                                    <div class="box rounded-2 p-3 mb-3">
                                            <img src="" alt=""
                                             style={{height:"40px" , width:"60px" , objectFit:"contain" , borderRadius:"5px" }}
                                              className="mr-2"/>
                                              <strong>credit card ending with **1752</strong>
                                    </div>
                                </div>
                                 
                            </div>

                            <div className="text-center mt-4">
                                
                                <button className="btn btn-dark px-4 rounded-5 "
                                    onClick={()=>{showModal()}}
                                >Place order</button>
                               
                            </div>
                            <div className="text-center mt-2">
                                <button className="btn px-4 rounded-5">Back to payment</button>
                            </div>

                        </div>
                    </div>

                    <div className="col-12 col-lg-5 mt-4 mt-lg-0"
                    style={{border:"1px solid black"}}>
                        <div className="basket-item-title"><p>basket item</p></div>
                        <div className="items container">
                            {cartItems.map((item)=>{
                                return <Item detail={item} />
                            })}
                        </div>

                    </div>

                </div>               
            </div> 
        </>
    )
}


function Modal(props){
   // const history = useHistory();
    const showHideClassName = props.show ? "modal d-block" : "modal d-none";
    return(

    <div id="myModal" className={`${showHideClassName}`}>
	    <div className="modal-dialog modal-confirm">
		    <div className="modal-content">
			    <div className="modal-header">
				    <div className="icon-box">
					    
                    <i class="bi bi-check-lg"></i>
				    </div>				
				    <h4 className="modal-title w-100">Confirm!</h4>	
			    </div>
			    <div className="modal-body">
				    <p className="text-center">The purchase was successful.</p>
			    </div>
			    <div className="modal-footer">
                <Link to="/">
				    <button className="btn btn-success btn-block" data-dismiss="modal"
                        onClick={()=>{
                            return 
                        }}
                    >OK</button>
                    </Link>
			    </div>
		    </div>
	    </div>
    </div>     

)
}


function Item(props){
    let color = props.detail.options[0].values[0];

    return(
        <div className="basket-container ">
            <img src={props.detail.images[0].src} alt="" className="basket-item-image col3"/>
            <div className="item-detail col-9">
                <div className="item-quantity">quantity :{props.detail.quantity}</div>
                <div className="item-basket-name">{props.detail.title}</div>
                <div className="cost"> {props.detail.variants[0].formatted_price} </div>
                <div className="item-color">
                    <div style={{marginRight:'2px'}}>Color</div>
                    <div style={{width:"50%" , height:"25px" , border:'1px solid' , align:'center' , right:'0px' , borderRadius:'5px'}}>
                        <div style={{backgroundColor:color , width:"90%" , height:"90%" , margin:"auto" , top:'1px' , borderRadius:'5px'}}></div>
                    </div>
                </div>
                <div className="item-size">
                    <div style={{color:"gray" , fontSize:"12px" , left:'2px'}}>Size</div>
                    <div style={{color:"black" , fontSize:"15px" , left:'2px'}}>XXL</div>
                </div>
            </div>
        </div>
    )
}