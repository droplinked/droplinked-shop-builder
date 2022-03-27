import logo from "../../assest/shared/Flatlay-Logo.svg";
import { AiOutlineWallet } from "react-icons/ai";
import { AiFillWallet } from "react-icons/ai";
import "./Header.scss"
import { UseWalletInfo } from "../context/context";
import { useState } from "react"
import { useCart } from "../hooks/useCart"

export default function Header() {
  const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();
  const[itemBasketShow , setItemBasketShow]=useState(false);

  return (<>
    <div className="px-xl-5 border-bottom border-grey bg-white">
      <div className="container-fluid px-3 py-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <a className="d-inline-block mr-3">
            <img src={logo} alt="" />
          </a>
          <div className="d-flex flex-row align-items-center justify-content-between ">
            <button
              className="btn  text-flatlay-black  text-nowrap"
              onClick={userData ? onSignOut : authenticate}
            >
              {userData ? (
                <h1>
                  <AiFillWallet />
                </h1>
              ) : (
                <h1>
                  <AiOutlineWallet />
                </h1>
              )}
            </button>

            <button className="btn  text-flatlay-black  text-nowrap"
            onClick={()=>{setItemBasketShow(pre => !pre)}}
            >
              <h1>
                <i class="bi bi-cart"></i>
              </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
    {itemBasketShow && <BasketModal show={itemBasketShow} />}
    
    </>
  );
}


function BasketModal(props){
  const { cartItems } = useCart();


    return(
          <div className={`item-card-modal ${props.show?"d-hidden":""}`}>
            {cartItems.map((item)=>{
              return <div className="modal-item">
                         <img className="item-img" src={item.images[0].src} />
                         <div className="item-text">
                              <div className="item-title">{item.title}</div>
                              <div className="item-quantity">quantity : {item.quantity}</div>
                         </div>
                      </div>
            })}
                         
           </div>

    )
}
