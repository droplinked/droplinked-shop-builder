import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { ShareLg } from 'assets/icons/Action/Share/ShareLg';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { TransformedProduct } from '../productUtils';
interface DirectLinkContentProps {
  product: TransformedProduct;
}

const Header: React.FC<DirectLinkContentProps> = ({ product }) => {
  const { t } = useLocaleResources('products');
  const { getFormattedPrice } = useCurrencyConverter();

  return (
    <Box width="100%">
      <Box marginX="-48px">
        <ModalHeaderData icon={<ShareLg />} title={t('ShareModal.title')} description={t('ShareModal.description')} />
      </Box>
      <Box mb="24px" />
      <Flex width="100%" padding="16px 24px 16px 16px" alignItems="center" gap="24px" bg="neutral.gray.800" borderRadius="12px" border="1px solid" borderColor="neutral.gray.800">
        <Image src={product.image} alt="Product" width="56px" height="56px" objectFit="cover" borderRadius="md" />
        <VStack align="flex-start" spacing="4px" flex="1">
          <Text fontSize="16px" fontWeight="700" color="white">
            {product.title}
          </Text>
          <Text fontSize="14px" fontWeight="400" color="gray.400">
            {product.description}
          </Text>
        </VStack>
        <Box height="40px" borderRight="1px solid #444" />
        <Text fontSize="16px" fontWeight="500" color="white" whiteSpace="nowrap">
          {getFormattedPrice({ amount: product.price, toFixed: true })}
        </Text>
      </Flex>
    </Box>
  );
};

export default Header;
