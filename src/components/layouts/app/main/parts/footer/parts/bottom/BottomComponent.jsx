import { Flex, Text, HStack, Box } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { footerStyles } from "../../FooterLayout-style";
import droplinkFull from "assest/image/droplinkFull.svg";
import { appVersion } from "lib/utils/app/variable";
import AppTypography from "components/common/typography/AppTypography";

const BottomComponent = () => {
  const { TermText, FooterLogo } = footerStyles;

  return (
    <Flex
      flexDirection={{ base: "column", md: "row-reverse" }}
      justifyContent={"space-between"}
      width="100%"
      alignItems="center"
    >
      <AppTypography color="#888" fontSize="10px" position="absolute" bottom="0" right="0" margin="15px">version: {appVersion}</AppTypography>
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
