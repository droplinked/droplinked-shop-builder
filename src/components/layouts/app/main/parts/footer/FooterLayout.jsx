import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
//

import { footerStyles } from "./FooterLayout-style";
//

import Description from "./parts/description";
import Links from "./parts/links";
import BottomComponent from "./parts/bottom/BottomComponent";

export default function FooterLayout() {
  const { FooterWrapper, FooterBody, FooterText, FooterLogo, TermText } =
    footerStyles;
  return (
    <VStack
      w="100%"
      padding="60px 0"
      backgroundColor="black"
      justifyContent="center"
      position="relative"
      zIndex="1"
    >
      <VStack align="stretch" width="80%" maxWidth="1400px">
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          display="flex"
          justifyContent="center"
          alignItems={{ base: "start", md: "center" }}
          mb={{ base: '86px', md: "54px" }}
        >
          <Description />
          <Box mb={{ base: '86px', md: '0px' }} />
          <Links />
        </Flex>
        <BottomComponent />
      </VStack>
    </VStack>
  );
}
