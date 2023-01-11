//import MainHeader from "../../components/layouts/Header/MainHeader"
//import Footer from "../../components/layouts/Footer/Footer"

import { Box } from "@chakra-ui/react";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { useCart } from "../../context/cart/CartContext";
import { useEffect } from "react";
import { useAddress } from "../../context/address/AddressContext";
import { useNotifications } from "../../context/notifications/NotificationsContext";
import { isJwtValid } from "../../api/base-user/Profile-api";
import { useShop } from "../../context/shop/ShopContext";
import { useSelector } from "react-redux";
import {
  selectCurrentProfile,
  selectIsCustomer,
} from "../../store/profile/profile.selector";

import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import SideBarProvider from "../../context/sidebar/sidebar-context";

export default function PageWrapper() {
  const { updateCart } = useCart();
  const { updateAddressList } = useAddress();
  const profile = useSelector(selectCurrentProfile);
  const isCustomer = useSelector(selectIsCustomer);
  const { updateNotifications } = useNotifications();
  const { updateShop } = useShop();
  const { shopname } = useParams();

  let location = useLocation();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token != null || token != undefined) firtsCheck();
  }, []);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token != null || token != undefined) {
      if (isCustomer) updateCart();
      if (!isCustomer) updateShop();
      updateAddressList();
      updateNotifications();
      setInterval(updateNotifications, 60000);
    }
  }, [profile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
    if (shopname != undefined) window.location.replace(`/${shopname}`);
    else window.location.replace("/");
  };

  return (
    <SideBarProvider>
      <Box
        boxSizing="border-box"
        // overflowX="hidden"
        maxW="100vw"
        w="100%"
        h="100%"
        minH="100vh"
        bg="bG"
      >
        <Header />
        <Box
          w="100%"
          h="100%"
          minH="100vh"
          bgColor="bG"
          m="0px"
          overflowX="hidden"
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </SideBarProvider>
  );
}
