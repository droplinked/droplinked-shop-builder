import { Flex, Text, Box } from "@chakra-ui/react";
import {
  Iconwrapper,
  IconImage,
  IconText,
  ImageWrapper,
} from "./landing-icons-style";

//import gatedIcon from "../../../../assest/icon/gated-icon.png";

import gatedIcon from "../../../../assest/icon/gated-icon.svg";
import listingIcon from "../../../../assest/icon/product-listing-icon.svg";
import sellsIcon from "../../../../assest/icon/sells-icon.svg";
import paymentIcon from "../../../../assest/icon/payment-icon.svg";
import campaginIcon from "../../../../assest/icon/campain-icon.svg";

import loyalityIcon from "../../../../assest/icon/loyality-icon.svg";

const LandingIcons = () => {
  return (
    <Flex
      w="100%"
      maxW={{ base: "100%", md: "750px", lg: "900px", xl: "1200px" }}
      mx="auto"
      flexWrap="wrap"
      justifyContent="space-between"
      mb={{ base: "-50px", md: "-70px" }}
      //border="1px solid red"
      px={{ base: "20px", md: "0px" }}
      // mb="80px"
    >
      <Text
        color="#f6f6f6"
        w="100%"
        textAlign="center"
        fontWeight="600"
        fontSize={{
          base: "4vw",
          sm: "3vw",
          md: "18px",
          lg: "24px",
          xl: "34px",
        }}
        // px={{ base: "20px", md: "120px" }}
      >
        Droplinked provides simplified web3 tools{" "}
        <Box d={{ base: "block", md: "none" }}></Box> to open shop and grow
        together.
      </Text>

      <Box w="100%" mb={{ base: "100px", md: "120px" }}></Box>

      {/* <RowWrapper> */}
      <Flex w={{ base: "50%", md: "33%" }} alignItems="center" justifyContent='center'>
        <Iconwrapper>
          <ImageWrapper>
            <IconImage src={gatedIcon} />
          </ImageWrapper>
          <IconText>Token gating</IconText>
        </Iconwrapper>
      </Flex>

      <Flex w={{ base: "50%", md: "33%" }} alignItems="center" justifyContent='center'>
        <Iconwrapper>
          <ImageWrapper>
            <IconImage src={listingIcon} />
          </ImageWrapper>
          <IconText>Smart product listings</IconText>
        </Iconwrapper>
      </Flex>

      <Flex w={{ base: "50%", md: "33%" }} alignItems="center" justifyContent='center'>
      <Iconwrapper>
        <ImageWrapper>
          <IconImage src={sellsIcon} />
        </ImageWrapper>
        <IconText>Co-selling & tracking</IconText>
      </Iconwrapper>
      </Flex>
      {/* </RowWrapper> */}

      {/* <RowWrapper> */}
      <Flex w={{ base: "50%", md: "33%" }} alignItems="center" justifyContent='center'>
      <Iconwrapper>
        <ImageWrapper>
          <IconImage src={paymentIcon} />
        </ImageWrapper>
        <IconText>Payments & revshare</IconText>
      </Iconwrapper>
      </Flex>

      <Flex w={{ base: "50%", md: "33%" }} alignItems="center" justifyContent='center'>
      <Iconwrapper>
        <ImageWrapper>
          <IconImage src={campaginIcon} />
        </ImageWrapper>
        <IconText>Campaigns & offers</IconText>
      </Iconwrapper>
      </Flex>

      <Flex w={{ base: "50%", md: "33%" }} alignItems="center" justifyContent='center'>
      <Iconwrapper>
        <ImageWrapper>
          <IconImage src={loyalityIcon} />
        </ImageWrapper>
        <IconText>Loyalty programs</IconText>
      </Iconwrapper>
      </Flex>
      {/* </RowWrapper> */}
    </Flex>
  );
};
export default LandingIcons;
