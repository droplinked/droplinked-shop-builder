//external
import { Flex, Box } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// internal
import { useProfile } from "hooks/useProfile/useProfile";
//components
import SidebarLayout from "layouts/sidebar-layout/SidebarLayout";
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import { useToasty } from "context/toastify/ToastContext";

const AdminWrapper = () => {
  const navigate = useNavigate();
  const { profile, shop } = useProfile();
  const { shopNavigate } = useCustomNavigate()
  const location = useLocation()
  const {errorToast} = useToasty()

  const handleRegisterRouting = (shop) => {
    const shop_info = !shop?.description
    const design = !shop?.backgroundColor || !shop.backgroundImage || !shop.backgroundImageSecondary || !shop.backgroundText || !shop.headerIcon || !shop.logo || !shop.textColor
    const technical = !shop?.imsType
    
    if(location.pathname.includes("register")) return false
    if(!shop_info && !design && !technical) return false

    if (!shop?.description) {
      shopNavigate("register/shop-info", true)
    } else if (!shop?.backgroundColor || !shop.backgroundImage || !shop.backgroundImageSecondary || !shop.backgroundText || !shop.headerIcon || !shop.logo || !shop.textColor) {
      shopNavigate("register/design", true)
    } else if(!shop?.imsType){
      shopNavigate("register/technical", true)
    }

    errorToast("Please complete register steps")
  }

  useEffect(() => {
    if (!profile) navigate("/");
    if(shop) handleRegisterRouting(shop)
  }, [profile, shop, location]);

  return (
    <Flex w="100%" height="100%" minHeight="100%">
      <Box
        w="72px"
        borderRight="1px solid"
        borderColor="line"
        maxHeight="auto"
        h="100%"
        minH="100vh"
        pt="24px"
      >
        <SidebarLayout />
      </Box>
      <Box w="100%" h="100%" p="24px">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AdminWrapper;
