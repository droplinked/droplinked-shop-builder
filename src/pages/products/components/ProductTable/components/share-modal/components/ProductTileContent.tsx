import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import EmbedCodeSection from "./EmbedCodeSection";


interface ProductTileContentProps {
  productTile: string; // ورودی `productTile` که به عنوان یک رشته می‌آید
}

const ProductTileContent: React.FC<ProductTileContentProps> = ({ productTile }) => {
  const embedCode = `<droplinked-product \n  tileId="${productTile}">\n  </droplinked-product>`;

  return (
    <Box width="100%" bg="neutral.gray.800" padding="32px">

      <Flex justifyContent="center" alignItems="center" mb="0">
        <Image
          src="https://upload-file-droplinked.s3.amazonaws.com/1354f7caaf1d50251c34e1744fc072cd9196b8fc6512397704d60a66188793f3.png"
          alt="Product Background"
          width="295px"
          height="140px"
          borderRadius="12px"
        />
      </Flex>

      <EmbedCodeSection
        embedCode={embedCode}
        configLink="/analytics/settings/tile"
        helpLink="https://droplinked.gitbook.io/droplinked-store-front-help-center/getting-started/product-tiles"
      />
    </Box>
  );
};

export default ProductTileContent;
