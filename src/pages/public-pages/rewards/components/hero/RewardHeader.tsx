import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';
import { TFunction } from 'i18next';

interface RewardHeaderProps {
  t: TFunction;
}

const RewardHeader = ({ t }: RewardHeaderProps) => (
  <VStack spacing={4} align="center">
    <VStack spacing={4}>
      <Flex w={14} h={14} bg="rgba(43, 207, 161, 0.1)" border="1px solid #2BCFA11A" borderRadius="xl" backdropFilter="blur(20px)" justify="center" align="center">
        <AppIcons.DROP_LINKED_LOGO />
      </Flex>
      <Text color="#2bcea1" fontSize={{ base: 'md', md: 'lg' }} fontWeight="medium">
        {t('hero.header.brandText')}
      </Text>
    </VStack>
    <Heading size={{ base: 'xl', md: '2xl' }} textAlign="center" color="white" fontWeight="bold">
      {t('hero.header.title')}
    </Heading>
    <Text textAlign="center" color="text.subtext.placeholder.light "fontSize={{ base: 'md', md: 'lg' }}>
      {t('hero.header.description')}
    </Text>
  </VStack>
);

export default RewardHeader;
