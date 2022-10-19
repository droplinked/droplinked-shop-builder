import { Flex } from "@chakra-ui/react";
import {
  Iconwrapper,
  IconImage,
  IconText,
  ImageWrapper,
} from "./landing-icons-style";

import gatedIcon from "../../../../assest/icon/gated-icon.png";
import campaginIcon from "../../../../assest/icon/campain-icon.png";
import sellsIcon from "../../../../assest/icon/sells-icon.png";
import listingIcon from "../../../../assest/icon/product-listing-icon.png";
import paymentIcon from "../../../../assest/icon/payment-icon.png";
import loyalityIcon from "../../../../assest/icon/loyality-icon.png";

const LandingIcons = () => {
  return (
    <Flex
      w="100%"
      maxW="800px"
      pt={{ base: "40px", md: "60px" }}
      mx="auto"
      flexWrap="wrap"
      justifyContent="space-between"
      mb="80px"
    >
      {/* <RowWrapper> */}
      <Iconwrapper>
        <ImageWrapper>
          <IconImage src={gatedIcon} />
        </ImageWrapper>
        <IconText>Token gating</IconText>
      </Iconwrapper>

      <Iconwrapper>
        <ImageWrapper>
          <IconImage src={listingIcon} />
        </ImageWrapper>
        <IconText>Smart product listings</IconText>
      </Iconwrapper>

      <Iconwrapper>
        <ImageWrapper>
          <IconImage src={sellsIcon} />
        </ImageWrapper>
        <IconText>co-selling & tracking</IconText>
      </Iconwrapper>
      {/* </RowWrapper> */}

      {/* <RowWrapper> */}
      <Iconwrapper>
        <ImageWrapper>
          <IconImage src={paymentIcon} />
        </ImageWrapper>
        <IconText>Payments & revshare</IconText>
      </Iconwrapper>

      <Iconwrapper>
        <ImageWrapper>
          <IconImage src={campaginIcon} />
        </ImageWrapper>
        <IconText>Campaigns & offers</IconText>
      </Iconwrapper>

      <Iconwrapper>
        <ImageWrapper>
          <IconImage src={loyalityIcon} />
        </ImageWrapper>
        <IconText>Loyalty programs</IconText>
      </Iconwrapper>
      {/* </RowWrapper> */}
    </Flex>
  );
};
export default LandingIcons;
