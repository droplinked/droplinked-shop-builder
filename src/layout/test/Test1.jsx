import MainWrapper from "../../components/Structure/page wrapper/MainWrapper"
import Footer from "../../components/features/footer/Footer"
import MainHeader from "../../components/features/header/MainHeader"
import Collections from "../../components/pages/nft/Collections"
import ProfileTopSection from "../../components/features/top section/ProfileTopSection"
import React from 'react';
import NewProduct from "../newProduct/NewProduct"
import HomeWrapper from "../../components/Structure/new wrapper/HomeWrapper"
import HomePage from "../homepage/HomePage"
import CreatorPage from "../creator/CreatorPage"
import PostPage from "../postpage/PostPage"



export default function Test1() {


  return (
    <>
      <MainHeader />
      <HomeWrapper>
      <PostPage />
      </HomeWrapper>
      <Footer />
    </>

  )
}

