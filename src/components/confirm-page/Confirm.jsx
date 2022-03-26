import "./confirm.scss"

import {useState} from "react"
export default function Confirm(){
    const [Show, setModalShow] = useState(false);


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
                    style={{backgroundColor:"lightgray"}}>
                            <h1>item basket</h1>
                    </div>

                </div>               
            </div> 
        </>
    )
}


function Modal(props){

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
				    <button className="btn btn-success btn-block" data-dismiss="modal">OK</button>
			    </div>
		    </div>
	    </div>
    </div>     

)
}