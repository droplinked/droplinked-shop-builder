import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay';
import React from 'react';

interface Props {
  product: any
  transactionHash?: string
}

const DropInfoContent = ({ product, transactionHash }: Props) => {
  return product && product.nftData ? (
    <Flex p="12" direction="column" justify="start" align="start" gap="4" bg="">
      <Box w="full" border="1px solid #292929" borderRadius="2xl" overflow="hidden" bg="transparent">
        <VStack w="full" p="6" spacing="4" align="start">
          {/* Deploy Hash */}
          <HStack w="full" justify="space-between">
            <HStack spacing="1" align="center">
              <Text color="#7b7b7b" fontSize="sm">
                Deploy Hash
              </Text>
              <AppIcons.Info />
            </HStack>
            <HStack spacing="3" flex="1" justify="flex-end" align="center">
              <Text id="deploy-hash" color="#179ef8" fontSize="sm" fontWeight="medium" textDecoration="underline" isTruncated maxW="200px">
                {product?.nftData?.deployHash}
              </Text>
              <Box as="button" onClick={() => navigator.clipboard.writeText(document.getElementById('deploy-hash').innerText)}>
                <AppIcons.Copy />
              </Box>
            </HStack>
          </HStack>

          {/* Dropped On */}
          <HStack w="full" justify="space-between">
            <Text color="#7b7b7b" fontSize="sm">
              Dropped on
            </Text>
            <HStack spacing="1" align="center">
              <BlockchainDisplay show="icon" props={{ width: '20px', height: '20px' }} blockchain={product.nftData.networkName} />
              <BlockchainDisplay show="name" blockchain={product.nftData.networkName} />
            </HStack>
          </HStack>

        </VStack>
      </Box>
    </Flex>
  ) : null;
};

export default DropInfoContent;
