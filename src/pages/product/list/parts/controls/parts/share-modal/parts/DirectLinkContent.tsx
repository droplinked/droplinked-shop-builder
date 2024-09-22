import { Box, Flex, Image } from "@chakra-ui/react";
import AppShareableLink from "components/redesign/shareable-link/AppShareableLink";
import { SHOP_URL } from "lib/utils/app/variable";
import React from "react";
import { TransformedProduct } from "../productUtils";

interface DirectLinkContentProps {
  product: TransformedProduct;
}

const DirectLinkContent: React.FC<DirectLinkContentProps> = ({ product }) => {
  const productLink = `${SHOP_URL}/paylink/product/${product.id}`;

  return (
    <Box width="100%" bg="#292929" padding="32px">
      {/* بخش بالایی */}
      <Flex
        justifyContent="center"
        alignItems="center"
        flex="1 0 0"
        alignSelf="stretch"
        height="auto"
        paddingBottom='24px'
      >
        <Image
          src="https://upload-file-droplinked.s3.amazonaws.com/cc82d904fa5afa573b2994a2f4afbccd81caad24a773e9063f451860f158d892.png"
          alt="Centered Icon"
        />
      </Flex>
      <Box
        width="100%"
        display="flex"
        padding="32px"
        borderRadius="12px"
        border="1px solid #292929"
        background="#141414"
        justifyContent="center" // مرکز کردن افقی
        alignItems="center"
      >
        <AppShareableLink link={productLink} buttonBgColor="#2BCFA1" />
      </Box>
    </Box>
  );
};

export default DirectLinkContent;
