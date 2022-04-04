import MainWrapper from "../../components/Structure/page wrapper/MainWrapper"
import Footer from "../../components/features/footer/Footer"
import MainHeader from "../../components/features/header/MainHeader"
import Collection123 from "../../components/pages/nft/Collection123"
import ProfileTopSection from "../../components/features/top section/ProfileTopSection"
import React from 'react';

export default function Test1(){


    return(
        <div style={{backgroundColor:"#222"}}>
        <MainHeader/>
        <ProfileTopSection />
        <MainWrapper>
        <Collection123 />
        </MainWrapper>
        <Footer/>
        </div>
    )
}

