import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer";
import HeaderMain from "./parts/header/HeaderMain";

function MainLayout(props) {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  // Determine if the current route is the homepage
  const isHomepage = pathname === "/";

  return (
    <Flex direction="column" bgColor="bG">
      {!isHomepage && <HeaderMain />}
      {props.children || <Outlet />}
      {!isHomepage && <Footer />}
    </Flex>
  );
}

export default MainLayout;