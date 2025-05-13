import { Box, Image, Text, VStack } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppButton from 'components/redesign/button/AppButton';
import React from 'react';

interface Props {
  onCreateStoreClick: () => void
}

const SellingSection = ({ onCreateStoreClick }: Props) => (
  <Box flex="1" borderRadius="3xl" border="1px solid" borderColor="neutral.gray.900" display="flex" flexDirection="column" overflow="hidden">
    <Box p="8" display="flex" flexDirection="column" gap={6}>
      <Box w={`56px`} h={`56px`} bg="#141414" borderRadius="xl" border="1px solid" borderColor="neutral.gray.900" backdropFilter="blur(10px)" display="flex" justifyContent="center" alignItems="center">
        <AppIcons.DROP_LINKED_LOGO width={'24px'} height={'24px'} />
      </Box>
      <VStack spacing={4} align="start">
        <Text fontSize="xl" fontWeight="bold" color="white">
          Selling on Droplinked
        </Text>
        <Text fontSize="base" color="text.subtext.placeholder.dark">
          Selling on Droplinked is easy, transparent, and efficient. Follow our step-by-step guide to launch a product and start reaching customers quickly.
        </Text>
        <AppButton onClick={onCreateStoreClick}>
          Create Store
        </AppButton>
      </VStack>
    </Box>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Image src="/assets/images/rewards/rewardsbg2.svg" w="auto" h={{ base: '100%', sm: '144px' }} objectFit="cover" />
    </Box>
  </Box>
);

export default SellingSection;
