import { Flex, Text, HStack } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

import { footerStyles } from "../../FooterLayout-style";

import footerLogo from "assest/icon/Flatlay-Logo.png";

const BottomComponent = () => {
  const { TermText, FooterLogo } = footerStyles;

  return (
    <Flex
      flexDirection={{ sm: "column", md: "row" }}
      justifyContent={"space-between"}
    >
      <HStack>
        <Text fontFamily="Avenir Next" fontWeight="500" fontSize="12px" color='lightGray' >
          Powered by
        </Text>
        <a href="https://flatlay.io/" target="_blank" >
          <FooterLogo src={footerLogo} alt={"logo"} />
        </a>
      </HStack>
      <HStack
        justifyContent={{ sm: "left", md: "right" }}
        marginTop={{ sm: 3, md: 0 }}
        spacing={6}
      >
        <Link to="/privacy">
          <TermText>Privacy</TermText>
        </Link>
        <Link to="/terms">
          <TermText>Terms of service</TermText>
        </Link>
      </HStack>
    </Flex>
  );
};

export default BottomComponent;
