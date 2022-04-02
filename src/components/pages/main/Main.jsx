import "./main.scss";
import { useState, useEffect , useRef} from "react";
import modalIcon from "../../../assest/modal/checked.png";
import { UseWalletInfo } from "../../context/context";
import mainImg from "../../../assest/creator-box.png";
import { GiWallet } from "react-icons/gi";
import whitelogo from "../../../assest/image/footer/FlatlayLogo.svg"

export default function Main() {
  const { onSignOut, checkTokens, userData, authenticate } = UseWalletInfo();
  const [modalState, setModalState] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  
  function submitform() {
    setModalState((pre) => !pre);
    setUserName("");
    setEmail("");
  }
  return (
    <>
      <div style={{ backgroundColor: "#222" }}>
        <div className="header container-fluid">
          {/* <img src={logo} alt="" className="headerImg  col-5 " /> */}
          <div className="headerText  col-3 col-lg-4 d-flex justify-content-start align-self-center">
            <h1 className="headerText col-10" style={{ paddingRight: "30px" }}>
              droplinked
            </h1>
          </div>

          <div className="d-flex justify-content-between col-7 col-lg-4 ">
            <div className="col-8 col-lg-6 d-flex justify-content-end align-self-center">
                <button className="sign-up">
                  <p>Sign up free</p>
                </button>
            </div>
            

            <div className="col-3 col-lg-4 d-flex justify-content-center">
                {userData
                ?
                    (<GiWallet className="wallet-icon wallet-icon-fill"
                    onClick={onSignOut}
                    />)
                :
                    (<GiWallet className="wallet-icon wallet-icon-notfill" 
                        onClick={authenticate}
                    />)
                }
              
            </div>
          </div>
        </div>

        <div className="main container-fluid row ">
          <div className="col-12 col-xxl-7 left-side mb-2  align-self-center ">
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

          <div className="col-12 col-xxl-5 right-side d-flex justify-content-between">
            <img src={mainImg} alt="" className="right-image" />
          </div>
        </div>

        <div className="d-flex justify-content-between"
          style={{ width: "100%", height: "80px", borderTop: "1px solid white" }}
        >       
                <div className="d-flex row align-items-start justify-content-end"
                 style={{width:"88%" , height:"100%" ,  margin:"auto auto"}}>
                     <div className="col-12 col-md-4 footer-text d-flex justify-content-between">
                         <p>droplinked by <img src={whitelogo} className="footer-icon" /></p>
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
    }, 2000);
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
          <p>Your account has been created successfully.</p>
        </div>
      </div>
    </div>
  );
}
