//import MainHeader from "../../components/layouts/Header/MainHeader"
//import Footer from "../../components/layouts/Footer/Footer"

import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useCart } from "../../context/cart/CartContext";
import { useEffect, useState } from "react";
import { useAddress } from "../../context/address/AddressContext";
import { useNotifications } from "../../context/notifications/NotificationsContext";
import { useProfile } from "../../context/profile/ProfileContext";
import { isJwtValid, getProfileData } from "../../api/base-user/Profile-api";
import { useShop } from "../../context/shop/ShopContext";
import MainHeader from "../../components/layouts/Header/MainHeader";
import Footer from "../../components/layouts/Footer/Footer";

export default function PageWrapper() {
  const { updateCart } = useCart();
  const { updateAddressList } = useAddress();
  const { profile, isCustomer } = useProfile();
  const { updateNotifications } = useNotifications();
  const { updateShop } = useShop();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token != null || token != undefined) firtsCheck();
  }, []);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token != null || token != undefined) {
      // if (isCustomer()) updateCart();
      if (!isCustomer()) updateShop();
      updateAddressList();
      updateNotifications();
      setInterval(updateNotifications, 60000);
    }
  }, [profile]);

  const firtsCheck = async () => {
    lastSeen();
    checkJWT();
  };

  const checkJWT = async () => {
    let result = await isJwtValid();
    if (!result) {
      cleanStorage();
      return;
    }
  };

  const lastSeen = () => {
    // delete localstorage after 8 hour
    const loginTime = JSON.parse(localStorage.getItem("login-time"));
    let currentTime = new Date().getTime();
    let hour = (currentTime - loginTime) / 1000 / 60 / 60;
    if (hour > 8) {
      cleanStorage();
      return;
    }
  };

  const cleanStorage = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <Flex flexDirection="column" overflowX="hidden" w="100%">
      <MainHeader />
      <Box
        w="100%"
        h="auto"
        minH="100vh"
        bgColor="#222"
        pt="50px"
        pb="100px"
        m="0px"
        overflowX="hidden"
      >
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}
