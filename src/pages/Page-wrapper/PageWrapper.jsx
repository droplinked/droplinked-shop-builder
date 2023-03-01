//import MainHeader from "../../components/layouts/Header/MainHeader"
//import Footer from "../../components/layouts/Footer/Footer"

import { Box } from "@chakra-ui/react";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { useCart } from "../../context/cart/CartContext";
import { useEffect } from "react";
import { isJwtValid } from "../../api/base-user/Profile-api";
//import { useShop } from "../../context/shop/ShopContext";
import { useSelector } from "react-redux";
import {
  selectCurrentProfile,
  selectIsCustomer,
} from "../../store/profile/profile.selector";
import { getShop } from "../../api/base-user/Profile-api";
import { useDispatch } from "react-redux";
import { setCurrentShop } from "../../store/shop/shop.action";
import { userSession } from "../../utils/hirowallet/hirowallet-utils";
import { setCurrentHiroWallet } from "../../store/hiro-wallet/hiro-wallet.action";
// import { getShopInformationByName } from "../../api-service/shop/shopApiService";
import { getUser } from "../../api-service/user/userApiService";
import { useApi } from "../../hooks/useApi/useApi";

import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import SideBarProvider from "../../context/sidebar/sidebar-context";

export default function PageWrapper() {
  const { updateCart } = useCart();
  const profile = useSelector(selectCurrentProfile);
  const isCustomer = useSelector(selectIsCustomer);
  //const { updateShop } = useShop();
  const { shopname } = useParams();
  const { getApi } =useApi()
  const dispatch = useDispatch();

  let location = useLocation();

  const getHiroWalletData = () => {
    if (userSession.isSignInPending()) {
      userSession
        .handlePendingSignIn()
        .then((userData) => {
          window.history.replaceState({}, document.title, "/");
          dispatch(setCurrentHiroWallet(userData));
          //  setUserData(userData);
        })
        .catch((err) => {
          dispatch(setCurrentHiroWallet(undefined));
          //  setUserData(undefined);
        });
    } else if (userSession.isUserSignedIn()) {
      dispatch(setCurrentHiroWallet(userSession.loadUserData()));
      //  setUserData(userSession.loadUserData());
    }
  };

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token != null || token != undefined) firtsCheck();
    getHiroWalletData();
  }, []);

  useEffect(async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token != null || token != undefined) {
      if (isCustomer) updateCart();
      if (!isCustomer) {
        let newShop = await getApi(getUser())
        if (newShop) {
          dispatch(setCurrentShop(newShop.shop));
        }
      }
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
