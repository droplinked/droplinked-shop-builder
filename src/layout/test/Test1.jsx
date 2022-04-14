import MainWrapper from "../../components/Structure/page wrapper/MainWrapper"
import Footer from "../../components/features/footer/Footer"
import MainHeader from "../../components/features/header/MainHeader"
import Collections from "../../components/pages/nft/Collections"
import ProfileTopSection from "../../components/features/top section/ProfileTopSection"
import React from 'react';
import Product from "../product/Product.jsx"
import Creadit from "../payment/Creadit"
import Checkout from "../checkout/Checkout"
import NewAddress from "../address/Address"
import Shipping from "../shiping/Shipping"
import NewProduct from "../newProduct/NewProduct"

export default function Test1(){


    return(
        <div style={{backgroundColor:"#222"}}>

        <MainWrapper>
            {/* <div style={{padding:"20px"}}> */}
                <NewProduct />
            {/* </div> */}
        </MainWrapper>
        </div>
    )
}

