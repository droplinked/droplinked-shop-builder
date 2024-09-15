import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";

interface HeaderProps {
  productImage: string;
  productTitle: string;
  productPrice: string;
}

const Header: React.FC<HeaderProps> = ({
  productImage,
  productTitle,
  productPrice,
}) => {
  return (
    <Box width="100%">
      {/* بخش اول: آیکون و متن */}
      <Flex
        direction="column"
        alignItems="flex-start"
        alignSelf="stretch"
        mb="24px"
      >
        <Image
          src="https://upload-file-droplinked.s3.amazonaws.com/ee406aaeed685a9f9aacf6fa5aa654f41044b3717a75b9ca65991958f574d884.png"
          alt="Icon"
          width="48px"
          height="48px"
        />
        <VStack align="flex-start" spacing="4px" mt="24px" color="white">
          <Text fontSize="24px" fontWeight="700">
            Share Product
          </Text>
          <Text fontSize="16px" fontWeight="400">
            Share your product with people around the world.
          </Text>
        </VStack>
      </Flex>

      {/* فاصله 24 پیکسل بین بخش‌ها */}
      <Box mb="24px" />

      {/* بخش دوم: تصویر محصول و جزئیات */}
      <Flex
        width="100%"
        padding="16px 24px 16px 16px"
        alignItems="center"
        gap="24px"
        bg="#292929"
        borderRadius="12px"
        border="1px solid #292929"
      >
        {/* تصویر محصول */}
        <Image
          src={productImage}
          alt="Product"
          width="56px"
          height="56px"
          objectFit="cover"
          borderRadius="md"
        />

        {/* عنوان و توضیحات محصول */}
        <VStack align="flex-start" spacing="4px" flex="1">
          <Text fontSize="16px" fontWeight="700" color="white">
            {/* {productTitle} */}
            Apple iPhone 13 Pro Max
          </Text>
          {/* <Text fontSize="14px" fontWeight="400" color="gray.400">
            {productTitle}
          </Text> */}
        </VStack>

        {/* جداکننده عمودی */}
        <Box height="40px" borderRight="1px solid #444" />

        {/* قیمت محصول */}
        <Text
          fontSize="16px"
          fontWeight="500"
          color="white"
          whiteSpace="nowrap"
        >
          {productPrice}
        </Text>
      </Flex>
    </Box>
  );
};

export default Header;
