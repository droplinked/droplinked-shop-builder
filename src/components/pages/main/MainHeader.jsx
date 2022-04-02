import "./main.scss";
import { useState, useEffect , useRef} from "react";
import modalIcon from "../../../assest/modal/checked.png";
import { UseWalletInfo } from "../../context/context";
import mainImg from "../../../assest/creator-box.png";
import { GiWallet } from "react-icons/gi";
import whitelogo from "../../../assest/image/footer/FlatlayLogo.svg"
import walletIcon from "../../../assest/header/Unknown.svg"




export default function MainHeader(){
    const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();



    return(
    <div className="header container-fluid">
          {/* <img src={logo} alt="" className="headerImg  col-5 " /> */}
          <div className="headerText  col-3 col-lg-4 d-flex justify-content-start align-self-center">
            <h1 className="headerText col-10" style={{ paddingRight: "30px" }}>
              droplinked
            </h1>
          </div>

          <div className="d-flex justify-content-between col-7 col-lg-4 ">
            <div className="col-8 col-lg-6 d-flex justify-content-end align-self-center res-btn invisible" >
                <button className="sign-up d-flex align-self-center">
                  <p>Sign up free</p>
                </button>
            </div>
            

            <div className="col-3 col-lg-4 d-flex justify-content-center" >
                
                {userData?
                      <img src={walletIcon} alt=""  className="wallet-icon wallet-icon-fill"  
                      onClick={onSignOut}
                      />
                :
                       <img src={walletIcon} alt=""  className="wallet-icon wallet-icon-notfill" 
                       onClick={authenticate}  
                      />

                }


                {/* {userData
                ?
                    (<GiWallet className="wallet-icon wallet-icon-fill"
                    onClick={onSignOut}
                    />)
                :
                    (<GiWallet className="wallet-icon wallet-icon-notfill" 
                        onClick={authenticate}
                    />)
                } */}
              
            </div>
          </div>
        </div>
        )
}