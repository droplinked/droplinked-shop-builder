import "./main.scss";
import { useState, useEffect , useRef} from "react";
import modalIcon from "../../../assest/modal/checked.png";
import { UseWalletInfo } from "../../context/context";
import mainImg from "../../../assest/creator-box.png";
import { GiWallet } from "react-icons/gi";
import whitelogo from "../../../assest/image/footer/FlatlayLogo.svg"
import walletIcon from "../../../assest/header/Unknown.svg"
import MainHeader from "./MainHeader"


export default function Main() {
  const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();
  const [modalState, setModalState] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  
  function submitform() {
    if(email !="" && userName!=""){
      fetch('https://uui8anv8g0.execute-api.eu-central-1.amazonaws.com/latest/register', {
        method: 'POST',
        body: JSON.stringify({ "name":userName , "email":email }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => {console.log(json.user);})
    }
      doit();
     
  }
  

  function doit(){
        setModalState((pre) => !pre);
        setUserName("");
        setEmail("");
  }


  return (
    <>
      <div style={{ backgroundColor: "#222" }}>
        
          <MainHeader />
        <div className="main container-fluid row ">
          <div className="col-12 col-md-7 left-side mb-2  align-self-center ">
            <div className="d-flex flex-column ">
              <div className="d-flex justify-content-between p-1  col-12 col-md-10 align-self-center   mt-0">
                <div className="title ">Discover, create &amp; connect.</div>
              </div>

              <div className="d-flex justify-content-between p-1  col-12 col-md-10 align-self-center   mt-3">
                <div className="description">
                  Distribute collections with your community <br /> to earn more
                  cash &amp; crypto together.
                </div>
              </div>
              
              <div className="d-flex justify-content-between   col-12 col-md-10 align-self-center  input-cover mt-4">
                <div
                  className="col-10 col-xl-11 d-flex"
                  style={{ height: "50px", paddingTop: "4px" }}
                >
                  <span className="input-span">droplinked.com/</span>
                  <input
                    type="text"
                    className=""
                    placeholder="username"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    value={userName}
                    onChange={(e)=>{setUserName(e.target.value)}}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between  col-12 col-md-10 align-self-center input-cover mt-4 ">
                <div
                  className="col-10"
                  style={{ height: "50px", paddingTop: "4px" }}
                >
                  <input
                   className="email-res"
                    type="text"
                    placeholder="example@email.com"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </div>
              </div>
              <button
                className="col-12 col-md-10 align-self-center  form-button mt-4"
                style={{}}
                onClick={() => {
                  submitform();
                 
                }}
              >
                sign up
              </button>
              
            </div>
          </div>

          <div className="col-12 col-md-5 right-side d-flex justify-content-between">
            <img src={mainImg} alt="" className="right-image" />
          </div>
        </div>

        <div className="d-flex justify-content-between"
          style={{ width: "100%", height: "80px", borderTop: "1px solid white" }}
        >       
                <div className="d-flex row align-items-start justify-content-end"
                 style={{width:"88%" , height:"100%" ,  margin:"auto auto"}}>
                   
                     <div className="col-12 col-md-4 footer-text d-flex justify-content-between">
                         <p>droplinked by  <a href="https://flatlay.io/" style={{color:"inherit" , textDecoration:"none"}}><img src={whitelogo} className="footer-icon" /> </a></p>
                     </div>
                 
    
                 </div>
            
        </div>

      </div>

      {modalState && <SeccessModal toggle={submitform} />}
    </>
  );
}

function SeccessModal(props) {
  useEffect(() => {
    setTimeout(() => {
      props.toggle();
    }, 1500);
  });

  return (
    <div className="modal-main">
      <div className="modal-body ">
        <div className="modal-head">
          <img
            src={modalIcon}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "90%" }}
          />
        </div>
        <div className="modal-middle">
          <p>Welcome to the community! Learn more about what&#39;s to come at flatlay.io✌️</p>
        </div>
      </div>
    </div>
  );
}




