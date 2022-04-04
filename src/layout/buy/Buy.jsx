
import React from "react";
import {BrowserRouter as Router, Switch,Route,Link, useParams} from "react-router-dom";
  import { UseWalletInfo } from "../../components/context/context";
import axios from "axios";
import { useEffect, useState , useRef ,useContext } from "react";
import Header from "../../components/creator-component/Header"
import Item from "../../components/features/basket item/Item"
import {CartContext} from "../../components/context/CartContext"
import {useCart} from "../../components/hooks/useCart"


export default function Buy(){

   const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();
   const { addProduct, cartItems, increase , decrease ,total} = useCart();
   let { buyId } = useParams();
   const [products, setProducts] = useState();

    function getData() {
      axios
        .post(
          "https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search",
          {
            keyword: "nike",
            page: 1,
          }
        )
        .then((response) => {
         setProducts(response.data.shopify[buyId].product_listing);
        });
    }
  
    useEffect(() => {
      getData();
    }, []);

    

    

    return (<>
    <Header />

    {(products!= undefined && products!= []) &&
           <div className="container-fluid" style={{maxWidth:'100vw' , height:'100vh'}}>
               <div className="row">
                   <div className="col-1 d-hide" style={{ height:"100vh"}}></div>
                   <div className="col-8 " style={{ height:"100vh" }}>
                       <div className="main-shop">
                           <img src={products.images[0].src} alt="" className="main-image" />
                           <div className="brand-name">{products.product_type}</div>
                           <div className="product-detail">{products.title}</div>
                           <div className="product-price">{products.variants[0].formatted_price}</div>
                           {/* options */}
                           <div className="options-main"> 
                                        {/* row1 */}
                                <div className="option-row option-row-1">
                                
                                </div>
                                 {/* row1 */}

                              {/* row2 */}
                                <div className="option-row option-row-2">
                                    {products.options[1] ? <>
                                            <select className="option-item" style={{left: "138px" , order:'1'}} >
                                            <option value="volvo">{products.options[1].values[0]}</option>
                                            <option value="saab">{products.options[1].values[1]}</option>
                                            <option value="fiat">{products.options[1].values[2]}</option>
                                            <option value="audi">{products.options[1].values[3]}</option>
                                        </select>
                                        </>
                                    :
                                    <select className="option-item" style={{left: "138px" , order:'1'}} >
                                       <option value="volvo">option</option>
                                        <option value="saab">Saab</option>
                                         <option value="fiat">Fiat</option>
                                         <option value="audi">Audi</option>
                                     </select>
                                    
                                }
                                     <select className="option-item" style={{left: "138px" , order:'1'}} >
                                         <option value="volvo">{products.options[0].values[0]}</option>
                                         <option value="saab">{products.options[0].values[1]}</option>
                                         <option value="fiat">{products.options[0].values[2]}</option>
                                         <option value="audi">{products.options[0].values[3]}</option>
                                     </select>
                                    
                                </div>
                                 {/* row2 */}


                                <div className="option-row option-row-3">
                                
                                </div>
                           </div>
                           {/* options */}


                           {/* button group */}
                           {
                             
                           !!cartItems.find(item => item.product_id === products.product_id)&&
                            <div className="btn-group">
                                    <button className="btn-group-block" 
                                      onClick={()=>{increase(products)}}
                                      >+</button>

                                    <input className="btn-group-block" value={ cartItems.find(item => item.product_id === products.product_id).quantity }  />

                                    <button className="btn-group-block" 
                                    onClick={()=>{ decrease(products) }}
                                     >-</button>
                            </div>

                            }
                           
                            {(!cartItems.find(item => item.product_id === products.product_id))&&
                            <button
                            onClick={() => {addProduct(products)}}
                            className="add-to-basket"><i class="bi bi-cart"></i>Add to basket</button>
                            }
                            {/* button group */}
                           

                                    {/* image groupe */}
                             
                                        
                                                    
                                          <img src={products.images[1].src} alt=""  className="image-item" style={{left: "278px"}}/>
                                          <img src={products.images[2].src} alt=""  className="image-item" style={{left: "206px"}}/>
                                          <img src={products.images[3].src} alt=""  className="image-item" style={{left: "134px"}}/>
                                          <img src={products.images[4].src} alt=""  className="image-item" style={{left: "62px"}}/>
                       
           
                                        <button className="image-group-right">{`>`}</button>
                                        <button className="image-group-left">{`<`}</button>
                              
                             
                                    {/* image groupe */}

                                    <div className="describe-text">Describe</div>
                                    <div className="describtion-text">{products.title}</div>


                       </div>
                   </div>
                       <div className="col-3" style={{ height:"100vh" }}>
                             <div className="my-cart-container container d-flex ">
                                   <div className="row d-flex flex-row justify-content-between" style={{ marginTop:"10px"}}>
                                       <div className="mycart col-5">My Cart</div>
                                       <div className="cart-total-cost col-7"><p>total cost   ${total}</p></div>
                                   </div>
                                   
                                 <div className="row">
                                       <div className="cart-items" >
                                           {cartItems.length > 0 && 
                                               cartItems.map((item)=>{
                                                    return(<Item detail={item} />)
                                               })
                                           }
                                      </div>
                                 </div>

                                <div className="row" style={{ position: "relative"}}>
                                      
                                      {userData ?
                                      <Link to="/checkout">
                                              <button className="check-out-button"
                                              ><p>Check Out</p> 
                                              </button>
                                      </Link>

                                      : <button className="check-out-button"
                                           onClick={authenticate}>
                                               <p>Check Out</p> 
                                        </button>
                                    }
                                     
                                </div>
                                
                            </div>
                        </div>
               </div>
           </div>
    }
    </>)


        
}