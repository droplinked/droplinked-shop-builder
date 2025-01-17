import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import EmbedCodeSection from "./EmbedCodeSection";

const SocialTileContent = () => {
  const embedCode = `<droplinked-product \n  tileId="66cda2055200359ae43ae62b">\n  </droplinked-product>`;

  return (
    <Box width="100%" bg="#292929" padding="32px">
      {/* تصویر پس‌زمینه در بالای صفحه و وسط */}
      <Flex justifyContent="center" alignItems="center" mb="0">
        <Image
          src="https://upload-file-droplinked.s3.amazonaws.com/9d94bccf5c42f334bfd3627739e8baeb67466adac9d763d87a322a0abf76c8b3.png"
          alt="Product Background"
          width="324px"
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

export default SocialTileContent;
