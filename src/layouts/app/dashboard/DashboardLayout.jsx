import { Box, HStack, VStack } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useProfile } from "hooks/useProfile/useProfile";
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import { setCurrentShop } from "lib/store/shop/shop.action";
import SidebarLayout from "./parts/sidebar/SidebarLayout";
import { useApi } from "hooks/useApi/useApi";
import { getUser } from "lib/apis/userApiService";
import { selectIsCustomer } from "lib/store/profile/profile.selector";
import DashboardModel from "./model/DashboardModel";

export default function DashboardLayout() {
  const isCustomer = useSelector(selectIsCustomer);

  const { getApi } = useApi();
  const { profile, shop } = useProfile();
  const { shopNavigate } = useCustomNavigate();
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

  useEffect(() => {
    if (profile && shop) {
      const registerGate = DashboardModel.checkPermission({ shop })
      if (registerGate) DashboardModel.registerGate({ to: registerGate, redirect: shopNavigate, pathname: location.pathname })
    }
  }, [shop, profile, location]);

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
      <HStack alignItems={"start"}>
        {shop && !DashboardModel.checkPermission({ shop }) ? <Box w="72px"><SidebarLayout /></Box> : null}
        <Box width={"100%"} minH={"80vh"} padding={10} borderLeft="1px solid" borderColor={"line"} paddingTop={10} paddingBottom={10}>
          <Outlet />
        </Box>
      </HStack>
    </VStack >
  );
}
