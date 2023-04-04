//import MainHeader from "../../components/layouts/Header/MainHeader"
//import Footer from "../../components/layouts/Footer/Footer"

import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsCustomer } from "../../store/profile/profile.selector";
import { useProfile } from "../../hooks/useProfile/useProfile";
import { useDispatch } from "react-redux";
import { setCurrentShop } from "../../store/shop/shop.action";
import { userSession } from "../../utils/hirowallet/hirowallet-utils";
import { setCurrentHiroWallet } from "../../store/hiro-wallet/hiro-wallet.action";
import { getUser } from "../../api-service/user/userApiService";
import { useApi } from "../../hooks/useApi/useApi";

import HeaderLayout from "../../layouts/header-layout/HeaderLayout";
import FooterLayout from "../../layouts/footer-layout/FooterLayout";
import SideBarProvider from "../../context/sidebar/sidebar-context";

export default function PageWrapper() {


  const isCustomer = useSelector(selectIsCustomer);

  const { getApi } = useApi();
  const { profile, shop } = useProfile();
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
      if (!isCustomer) {
        let newShop = await getApi(getUser());
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
    // let result = await isJwtValid();
    // if (!result) {
    //   cleanStorage();
    //   return;
    // }
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
   // if (shop) window.location.replace(`/${shop.name}/products`);
   // else window.location.replace("/");
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
        <HeaderLayout />
        <Box
          w="100%"
          h="100%"
          minH="calc( 100vh - 180px )"
          bgColor="bG"
          m="0px"
          p="0px"
          overflowX="hidden"
        >
          <Outlet />
        </Box>
        <FooterLayout />
      </Box>
    </SideBarProvider>
  );
}
