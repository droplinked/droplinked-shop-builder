import ProfileTopSection from "../components/creator-component/ProfileTopSection";
import Box from "../components/creator-component/Box";
import Header from "../components/creator-component/Header";
import { useEffect, useState } from "react";
import { WalletProvider } from "../components/context/context";
export default function MainPage() {
  return (
    <>
     
        <Header />
        <div id="profile-container">
          <ProfileTopSection />
          <Box />
        </div>
     
    </>
  );


}
