import { Box, HStack, VStack } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//
import { selectIsCustomer } from "store/profile/profile.selector";
import { useProfile } from "hooks/useProfile/useProfile";
import { setCurrentShop } from "store/shop/shop.action";
import { getUser } from "apis/userApiService";
import { useApi } from "hooks/useApi/useApi";
import HeaderLayout from "./parts/header/HeaderLayout";
import FooterLayout from "./parts/footer/FooterLayout";
import LayoutWrapper from "./parts/wrraper/wrraper";
import SidebarLayout from "./parts/sidebar/SidebarLayout";
//

export default function DashboardLayout() {
  const isCustomer = useSelector(selectIsCustomer);

  const { getApi } = useApi();
  const { profile } = useProfile();
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token != null || token != undefined) lastSeen()
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
    <VStack align={"stretch"} bgColor={"bG"} spacing={0}>
      <HeaderLayout />
      <HStack alignItems={"start"}>
        <Box w="72px"><SidebarLayout /></Box>
        <Box width={"100%"} minH={"80vh"} borderLeft="1px solid" borderColor={"line"} paddingTop={10} paddingBottom={10}>
          <LayoutWrapper><Outlet /></LayoutWrapper>
        </Box>
      </HStack>
      <FooterLayout />
    </VStack >
  );
}
