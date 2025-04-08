import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import React from 'react';

const RewardHeader = () => (
  <VStack spacing={4} align="center">
    <VStack spacing={4}>
      <Flex w={14} h={14} bg="rgba(43, 207, 161, 0.1)" border="1px solid #2BCFA11A" borderRadius="xl" backdropFilter="blur(20px)" justify="center" align="center">
        <AppIcons.DROP_LINKED_LOGO />
      </Flex>
      <Text color="#2bcea1" fontSize={{ base: 'md', md: 'lg' }} fontWeight="medium">
        droplinked rewards programs
      </Text>
    </VStack>
    <Heading size={{ base: 'xl', md: '2xl' }} textAlign="center" color="white" fontWeight="bold">
      It’s Time to Level Up
    </Heading>
    <Text textAlign="center" color="text.subtextPlaceholder.light "fontSize={{ base: 'md', md: 'lg' }}>
      Get started on droplinked quests to earn points. As you earn towards each level,
      <Box display={{ base: 'none', md: 'block' }} as="br" />
      you unlock access to credits and tools that help you to earn more $
    </Text>
  </VStack>
);

export default RewardHeader;
