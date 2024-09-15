import { Box, Flex, Image, Text, Button, IconButton } from "@chakra-ui/react";
import { ReactComponent as CopyIcon } from "assest/icon/copy.svg"; 
import { ReactComponent as ConfigureIcon } from "assest/icon/share.svg";

const ProductTileContent = () => {
    const embedCode = `<div id="droplinked-product-tiles">\n  <droplinked-product \n  tileId="66cda2055200359ae43ae62b">\n  </droplinked-product>\n</div>`;

  
  
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
  
        {/* بخش کد تعبیه */}
        <Flex
          display="flex"
          width="100%"
          padding="32px"
          flexDirection="column"
          alignItems="flex-start"
          gap="16px"
          borderRadius="12px"
          border="1px solid #292929"
          background="#141414"
          position="relative"
          mt="0"  // حذف فاصله بالا برای چسبیدن به تصویر
        >
          <Text fontSize="14px" fontWeight="bold" color="white" mb="16px">
            Embed Code
          </Text>
          {/* کد تعبیه */}
          <Box
            as="pre"
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="400"
            lineHeight="24px"
            color="#737373"
            overflowX="auto"
            whiteSpace="pre-wrap"
            position="relative"
            width="100%"
            background="#1C1C1C"
            borderRadius="8px"
            padding="16px"
            border="1px solid #292929"
          >
            {/* دکمه کپی بالا سمت راست */}
            <IconButton
              icon={<CopyIcon width={20} height={20} />}
              aria-label="Copy embed code"
              colorScheme="whiteAlpha"
              position="absolute"
              top="8px"
              right="8px"
              onClick={() => navigator.clipboard.writeText(embedCode)}
            />
            {embedCode}
          </Box>
        </Flex>
  
        {/* بخش پایینی: دکمه تنظیم و کمک */}
        <Flex justifyContent="space-between" mt="16px">
          <Button
            leftIcon={<ConfigureIcon width={20} height={20} />}
            color="#FFF"
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="500"
            lineHeight="20px"
            variant="unstyled"
            display="flex"
            alignItems="center"
            gap="8px"
          >
            Configure
          </Button>
          <Button
            color="#179EF8"
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="500"
            lineHeight="20px"
            variant="unstyled"
            display="flex"
            alignItems="center"
            gap="8px"
          >
            Need Help? Visit Help Center
          </Button>
        </Flex>
      </Box>
    );
  };
  
  export default ProductTileContent;
  