import { Badge, Flex, Text } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import React from 'react';

const features = [
  { icon: <AppIcons.Secure color="#2BCFA1" />, text: 'Pro Access' },
  { icon: <AppIcons.GreenSpeedometer color="#2BCFA1" />, text: 'Cancel anytime' },
  { icon: <AppIcons.Refresh color='#2BCFA1' style={{ height: '16px', width: '16px' }} />, text: 'Seamless Activation' }
];

const FeaturesSection = () => (
  <Flex px={12} py={4} gap={4} justify="space-between" direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', sm: 'start' }}>
    {features.map(({ icon, text }, index) => (
      <Flex key={index} gap={4} direction={{ base: 'row', md: 'column' }} align="center" justify="center" flex={1}>
        <Badge p={2} bg="rgba(43, 206, 161, 0.1)" rounded="full" color="rgba(43, 206, 161)">
          {icon}
        </Badge>
        <Text fontSize="sm" color="white" textAlign="center">
          {text}
        </Text>
      </Flex>
    ))}
  </Flex>
);

export default FeaturesSection;
