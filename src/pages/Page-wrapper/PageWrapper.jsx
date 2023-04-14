import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector ,useDispatch } from "react-redux";
//
import { selectIsCustomer } from "store/profile/profile.selector";
import { useProfile } from "hooks/useProfile/useProfile";
import { setCurrentShop } from "store/shop/shop.action";
import { getUser } from "apis/userApiService";
import { useApi } from "hooks/useApi/useApi";
//
import HeaderLayout from "layouts/header-layout/HeaderLayout";
import FooterLayout from "layouts/footer-layout/FooterLayout";

export default function PageWrapper() {


  const isCustomer = useSelector(selectIsCustomer);

  const { getApi } = useApi();
  const { profile } = useProfile();
  const dispatch = useDispatch();

  let location = useLocation();


  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token != null || token != undefined) firtsCheck();
    //getHiroWalletData();
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
  );
}
