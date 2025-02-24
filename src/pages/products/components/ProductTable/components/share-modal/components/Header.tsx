import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import ModalHeaderData from "components/redesign/modal/ModalHeaderData";
import { useCurrencyConverter } from "functions/hooks/useCurrencyConverter/useCurrencyConverter";
import React from "react";
import { TransformedProduct } from "../productUtils";

//ShareIcon

interface DirectLinkContentProps {
  product: TransformedProduct;
}

const Header: React.FC<DirectLinkContentProps> = ({ product }) => {
  const { getFormattedPrice } = useCurrencyConverter()

  return (
    <Box width="100%">
      <Box marginX="-48px">
        <ModalHeaderData
          icon={<AppIcons.Share />}
          title=" Share Product"
          description={`Share your product with people around the world.`}
        />
      </Box>
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
          src={product.image}
          alt="Product"
          width="56px"
          height="56px"
          objectFit="cover"
          borderRadius="md"
        />

        {/* عنوان و توضیحات محصول */}
        <VStack align="flex-start" spacing="4px" flex="1">
          <Text fontSize="16px" fontWeight="700" color="white">
            {product.title}
          </Text>
          <Text fontSize="14px" fontWeight="400" color="gray.400">
            {product.description}
          </Text>
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
          {getFormattedPrice({ amount: product.price, toFixed: true })}
        </Text>
      </Flex>
    </Box>
  );
};

export default Header;
