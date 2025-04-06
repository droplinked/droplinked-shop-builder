import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface RewardDividerProps {
  text: string;
}

const RewardDivider = ({ text }: RewardDividerProps) => (
  <Flex justify="center" align="center" width="100%">
    <Box flex="1" height="1px" bg="linear-gradient(to left, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 75%)" />
    <Box width="1px" height="16px" bg="rgba(255, 255, 255, 0.16)" right="50%" transform="translateX(50%)" />
    <Text color="white" fontSize={{ base: 'md', md: 'lg' }} fontWeight="medium" px={4}>
      {text}
    </Text>
    <Box width="1px" height="16px" bg="rgba(255, 255, 255, 0.16)" right="50%" transform="translateX(50%)" />
    <Box flex="1" height="1px" bg="linear-gradient(to right, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 75%)" />
  </Flex>
);

export default RewardDivider;
