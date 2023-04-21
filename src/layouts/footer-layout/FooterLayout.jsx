import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
//

import { footerStyles } from "./FooterLayout-style";
//
import footerLogo from "assest/icon/Flatlay-Logo.png";
import Description from "./parts/description";
import Links from "./parts/links";
import BottomComponent from "./parts/bottom/BottomComponent";

export default function FooterLayout() {
  const { FooterWrapper, FooterBody, FooterText, FooterLogo, TermText } =
    footerStyles;
  return (
    <Box
      w="100%"
      padding={{ base: "78px 42px", md: "80px 100px", lg: "80px 200px" }}
      backgroundColor="black"
    >
      <Flex
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb="54px"
      >
        <Description />
        <Links />
      </Flex>
      <BottomComponent />
    </Box>
  );
}
