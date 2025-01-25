import { Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderMain from "./parts/header/HeaderMain";
import Footer from "./components/footer/Footer";

function MainLayout(props) {
  const location = useLocation();

  return (
    <Flex direction={"column"} bgColor={"bG"}>
      {location.pathname !== "/" && <HeaderMain />}
      {props.children ? props.children : <Outlet />}
      {location.pathname !== "/" && <Footer />}
    </Flex>
  );
}

export default MainLayout;
