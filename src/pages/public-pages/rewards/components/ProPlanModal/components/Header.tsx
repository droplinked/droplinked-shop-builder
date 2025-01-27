import { Box, Flex, Image, Text } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import React from 'react';

export const ModalHeader = () => (
  <Box position="relative" mb={2} w="100%" maxHeight="200px">
    <Image src="/assets/images/rewards/modal-header-bg.png" w="100%" h="100%" objectFit="cover" position="absolute" />
    <Flex p={6} flexDirection="column" justifyContent="center" alignItems="center" gap={6} position="relative" zIndex={2}>
      <Flex p={3} bg="rgba(43, 206, 161, 0.1)" borderRadius="lg" border="1px solid rgba(43, 206, 161, 0.1)" alignItems="center" gap={2}>
        <AppIcons.Soon />
      </Flex>
      <Text fontSize="2xl" fontWeight="bold" color="white">
        Free Pro Plan Unlocked!
      </Text>
      <Text fontSize="md" color="#b1b1b1" textAlign="center">
        You now have access to the Pro Plan for one month for free.
      </Text>
    </Flex>
  </Box>
);
