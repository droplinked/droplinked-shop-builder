import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
//
import {
  FooterWrapper,
  FooterBody,
  FooterText,
  FooterLogo,
  TermText,
} from "./FooterLayout-style";
//
import footerLogo from "assest/icon/Flatlay-Logo.png";
import Description from "./parts/description";
import Links from "./parts/links";

export default function FooterLayout() {
  return (
    <Box marginTop={10}>
      <FooterWrapper>
        <FooterBody>
          <VStack align={"stretch"} width={"100%"} spacing={10}>
            <Flex flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"}>
              <Box>
                <Description />
              </Box>
              <Box width={{ sm: "100%", md: "40%", xl: "30%" }} marginTop={{ sm: 39, md: 0 }}>
                <Links />
              </Box>
            </Flex>
            <Flex flexDirection={{ sm: "column", md: "row" }} justifyContent={"space-between"}>
              <HStack>
                <FooterText><Text fontSize="md" color={"#FFF"}>Powered by</Text></FooterText>
                <a href="https://flatlay.io/">
                  <FooterLogo src={footerLogo} alt={"logo"} />
                </a>
              </HStack>
              <HStack justifyContent={{ sm: "left", md: "right" }} marginTop={{ sm: 3, md: 0 }} spacing={6}>
                <Link to="/terms">
                  <TermText>Privacy</TermText>
                </Link>
                <Link to="/terms">
                  <TermText>Terms of service</TermText>
                </Link>
              </HStack>
            </Flex>
          </VStack>
        </FooterBody>
      </FooterWrapper>
    </Box>
  );
}
