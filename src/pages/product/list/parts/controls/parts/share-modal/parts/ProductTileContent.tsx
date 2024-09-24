import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import EmbedCodeSection from "./EmbedCodeSection";


interface ProductTileContentProps {
  productTile: string; // ورودی `productTile` که به عنوان یک رشته می‌آید
}

const ProductTileContent: React.FC<ProductTileContentProps> = ({ productTile }) => {
  // تولید کد تعبیه شده (Embed Code) با استفاده از productTile
  const embedCode = `<div id="droplinked-product-tiles">\n  <droplinked-product \n  tileId="${productTile}">\n  </droplinked-product>\n</div>`;

  return (
    <Box width="100%" bg="#292929" padding="32px">
      {/* تصویر پس‌زمینه در بالای صفحه و وسط */}
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
        configLink="/dashboard/settings/tile"
        helpLink="https://droplinked.gitbook.io/droplinked-store-front-help-center/getting-started/product-tiles"
      />
    </Box>
  );
};

export default ProductTileContent;
