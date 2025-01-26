import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderMain from "./parts/header/HeaderMain";
import Footer from "./components/footer/Footer";

function MainLayout(props) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <Flex direction={"column"} bgColor={"bG"}>
      {location.pathname !== "/" && <HeaderMain />}
      {props.children ? props.children : <Outlet />}
      {location.pathname !== "/" && <Footer />}
    </Flex>
  );
}

export default MainLayout;
