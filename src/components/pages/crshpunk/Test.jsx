import "./test.scss"
import { AiFillWallet } from "react-icons/ai";
import { RiShoppingBasketFill } from "react-icons/ri";
import ProfileTopSection from "../../creator-component/ProfileTopSection"
import whitelogo from "../../../assest/image/footer/FlatlayLogo.svg"
import walletIcon from "../../../assest/header/Unknown.svg"
import MainHeader from "../main/MainHeader"

export default function Test(){


    return(
        <div style={{backgroundColor:"#222" , minHeight:"100vh" , minWidth:"100vw"}}>
            <MainHeader />
            <div className="profile-wrapper">
                <ProfileTopSection />  
            </div> 
            <div className="body-wrapper d-flex justify-content-center">
            <iframe src="https://blocksurvey.io/survey/t/6de8a3bb-08d4-46bc-b3db-fafc5e2697c3/r/o"
             className="frame col-12 col-md-8"></iframe>
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
  )
}



function Header(){

    return(<>
    <div className="header-wrap">
        <div className="header-container justify-content-between">
            <h1 style={{color:"white"}}>droplinked</h1>
            <div className="header-item col-6 col-md-3">
                {/* <RiShoppingBasketFill className="header-icon col-6 invisible"/>
                <AiFillWallet className="header-icon col-6"/> */}
                <RiShoppingBasketFill className="header-icon col-6 invisible"/>
                <img src={walletIcon} alt=""  className="header-icon col-6"/>
            </div>
        </div>
    </div>
    </>)
}
