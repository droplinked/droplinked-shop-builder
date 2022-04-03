import "./crashpunk.scss"
import logo from "../../../assest/image/crashpunk/crashpunkLogo.svg"
import { AiFillWallet } from "react-icons/ai";
import { RiShoppingBasketFill } from "react-icons/ri";
import ProfileTopSection from "../../creator-component/ProfileTopSection"
import image1 from "../../../assest/image/nft/img1.png"
import image2 from "../../../assest/image/nft/img2.png"
import image3 from "../../../assest/image/nft/img3.png"
import Carousel from 'react-bootstrap/Carousel'
import Collection from "./Collection"
import MainHeader from "../main/MainHeader"

export default function Crashpunk(){

    return(<div>
            <MainHeader/>
            <div  style={{backgroundColor:"#222" , minHeight:"100vh" , minWidth:"100vw"}}>
            
            <div className="profile-wrapper">
                <ProfileTopSection />  
            </div>    

            <div className="collection-wrapper">
                <div className="gallery-wrapper">
                    <div className="nft-imgs ">
                        <Carousel>
                               <Carousel.Item interval={500}>
                                    <img
                                      
                                      className="d-block w-100 nft-imgs"
                                      src={image1}
                                      alt="First slide"
                                    />
                                 
   
                                </Carousel.Item>

                                <Carousel.Item interval={500}>
                                    <img
                                       
                                        className="d-block w-100 nft-imgs"
                                        src={image2}
                                        alt="Second slide"
                                    />
                                </Carousel.Item>

                                <Carousel.Item interval={500}>
                                     <img
                                        
                                        className="d-block w-100 nft-imgs"
                                        src={image3}
                                        alt="Third slide"
                                     />

                                </Carousel.Item>
                    </Carousel>
                    </div>
                </div>

                <div className="collections-wrapper d-flex flex-column justify-content-between">
                   
                        <Collection name={"holder merch"} />
                        <Collection name={"public merch"} /> 
                        
                </div>


            </div>
            </div>
    </div>)
}





export function Header(){

    return(<>
    <div className="header-wrap">
        <div className="header-container justify-content-between">
            {/* <img src={logo} alt="" className="header-logo col-6 col-md-3" /> */}
            <h1 style={{color:"white"}}>droplinked</h1>
            <div className="header-item col-6 col-md-3">
                <RiShoppingBasketFill className="header-icon col-6"/>
                <AiFillWallet className="header-icon col-6"/>
            </div>
        </div>
    </div>
    </>)
}


