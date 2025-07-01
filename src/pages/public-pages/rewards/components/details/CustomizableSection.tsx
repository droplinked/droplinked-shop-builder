import { Box, Image, Text, VStack } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppButton from 'components/redesign/button/AppButton';
import React from 'react';
import { TFunction } from 'i18next';

interface Props {
  onCreateStoreClick: () => void;
  t: TFunction;
}

const CustomizableSection = ({ onCreateStoreClick, t }: Props) => (
  <Box flex="1" borderRadius="3xl" border="1px solid" borderColor="neutral.gray.900" display="flex" flexDirection="column" overflow="hidden">
    <Box p="8" display="flex" flexDirection="column" gap={6}>
      <Box w={`56px`} h={`56px`} bg="#141414" borderRadius="xl" border="1px solid" borderColor="neutral.gray.900" backdropFilter="blur(10px)" display="flex" justifyContent="center" alignItems="center">
        <AppIcons.SidebarBrush width={'24px'} height={'24px'} color='#2BCFA1' />
      </Box>
      <VStack spacing={4} align="start">
        <Text fontSize="xl" fontWeight="bold" color="white">
          {t('details.customizableSection.title')}
        </Text>
        <Text fontSize="base" color="text.subtext.placeholder.dark">
          {t('details.customizableSection.description')}
        </Text>
        <AppButton onClick={onCreateStoreClick}>{t('details.customizableSection.buttonText')}</AppButton>
      </VStack>
    </Box>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Image src="/assets/images/rewards/rewardsbg3.svg" w="100%" h={{ base: '100%', sm: '144px' }} objectFit="cover" />
    </Box>
  </Box>
);

export default CustomizableSection;
