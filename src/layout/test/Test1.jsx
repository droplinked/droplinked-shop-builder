import MainWrapper from "../../components/Structure/page wrapper/MainWrapper"
import Footer from "../../components/features/footer/Footer"
import MainHeader from "../../components/features/header/MainHeader"
import Collection123 from "../../components/pages/nft/Collection123"
import ProfileTopSection from "../../components/features/top section/ProfileTopSection"
import React from 'react';
import Product from "../product/Product.jsx"
import Creadit from "../payment/Creadit"
import Checkout from "../checkout/Checkout"
import NewAddress from "../address/Address"
import Shipping from "../shiping/Shipping"

export default function Test1(){


    return(
        <div style={{backgroundColor:"#222"}}>
        <MainHeader/>
        <ProfileTopSection />
        <MainWrapper>
            <div style={{padding:"20px"}}>
                <Shipping />
            </div>
        </MainWrapper>
        <Footer/>
        </div>
    )
}

