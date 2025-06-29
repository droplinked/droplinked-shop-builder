import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { MedalstarLg } from 'assets/icons/System/MedalStar/MedalstarLg';
import React from 'react';

interface ProPlanHeaderProps {
  isCrossmint: boolean;
  canActivateTrial: boolean;
}

const ProPlanHeader: React.FC<ProPlanHeaderProps> = ({ isCrossmint, canActivateTrial }) => {
  const getTitle = () => {
    if (isCrossmint) return 'Free Pro Plan Unlocked!';
    if (canActivateTrial) return 'Use droplinked AI to Create A Shop';
    return 'Access Exclusive Features';
  };

  const getDescription = () => {
    if (isCrossmint) return 'You now have access to the Pro Plan for 3 months for free.';
    if (canActivateTrial) return 'Feel free to use the AI tools to customize shops and inventory. Add your details below to get started.';
    return 'Upgrade today to take advantage of the benefits associated with a Premium Plan.';
  };

  return (
    <Box w="100%">
      <Image src="https://upload-file-droplinked.s3.amazonaws.com/a8127623df1b0dc11be743677f3ca3c1eb5c0d2251d5801eb61a96835ac39ce9.png" position="absolute" />
      <Flex p={12} flexDirection="column" justifyContent="center" alignItems="center" gap={2} position="relative" zIndex={2}>
        <Flex p={3} bg="rgba(43, 206, 161, 0.1)" borderRadius="lg" border="1px solid rgba(43, 206, 161, 0.1)" alignItems="center" gap={2}>
          <MedalstarLg color="#2BCFA1" />
        </Flex>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          {getTitle()}
        </Text>
        <Text fontSize="md" color="text.subtext.placeholder.light" textAlign="center">
          {getDescription()}
        </Text>
      </Flex>
    </Box>
  );
};

export default ProPlanHeader; 