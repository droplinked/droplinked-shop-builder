import { Flex, Text, HStack } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

import { footerStyles } from "../../FooterLayout-style";
import droplinkFull from "assest/image/droplinkFull.svg";

import footerLogo from "assest/icon/Flatlay-Logo.png";

const BottomComponent = () => {
  const { TermText, FooterLogo } = footerStyles;

  return (
    <Flex
      flexDirection={{ base: "column", md: "row" }}
      justifyContent={"space-between"}
      width="100%"
    >
      <HStack mb={{base:'18px' , md:'0px'}}>
        <Text fontFamily="Avenir Next" fontWeight="500" fontSize="12px" color='lightGray' >
          Powered by
        </Text>
        <a href="https://droplinked.io/" target="_blank" >
          <FooterLogo src={droplinkFull} width="100px" alt={"logo"} />
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
