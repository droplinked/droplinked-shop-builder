import {BrowserRouter as Router, Switch,Route,Link, useParams} from "react-router-dom";
import "./shipping.scss"

export default function Shipping(){

    return(
    <div className="container-fluid " style={{ height:'100vh'}}>
    
        <div className="p-3 p-lg-4">  
            <div className="row">
                <div className="col-12 col-lg-7">
                    <div className="bg-white rounded-2 shadow-sm p-3 p-lg-4">
                        <div className="mb-4">
                            <h2 className="mb-1"><strong>Shipping</strong></h2>
                            <span className="text-muted">Please select a shipping</span>
                        </div>
                        {/* loarding */}
                        {/* <div className="p-5 text-center text-muted">
                             <span>Loading ...</span>
                        </div> */}
                        {/* loarding */}
                        <div className="card-container" >   
                            <div className="card-box rounded-2 p-3 mb-3" tabindex="0" >
                                <div className="cursor-pointer d-flex flex-row align-items-center justify-content-between">
                                     <strong>First Class Package International</strong>
                                     <span>$15.34</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <Link to="/payment">
                            <button className="btn btn-dark px-4 rounded-5">
                                 Proceed to payment
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    )
}