import { Badge, Box, Button, Flex, Image, ModalBody, Text, VStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppModal from 'components/redesign/modal/AppModal';
import React from 'react';

const ProPlanModal = ({ isOpen, onClose, openAuthModal }) => {
  const handleButtonClick = () => {
    onClose(); // Close the ProPlanModal
    openAuthModal(); // Open the AuthModal
  };
  
  return (
    <>
      <AppModal modalRootProps={{ isOpen, onClose, size: 'xl', isCentered: true }} modalContentProps={{ width: 'auto !important', padding: '0px !important' }}>
        <ModalBody display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="36px" padding="0px !important" rounded="24px">
          <Box bg="#1b1b1b" border="1px solid #282828" overflow="hidden">
            {/* Header Section */}
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

            {/* Plan Details Section */}
            <VStack px={12} py={2}>
              <Box p={6} w="100%" bg="rgba(43, 206, 161, 0.1)" borderRadius="2xl" border="1px solid #2bcea1" display="flex" flexDirection="column" gap={4}>
                <Flex width={12} height={12} p={3} bg="rgba(43, 206, 161, 0.1)" borderRadius="lg" border="1px solid rgba(43, 206, 161, 0.1)" alignItems="center" gap={2}>
                  <AppIcons.ProPlan color="white" />
                </Flex>
                <Flex flexDirection="column" gap={0.5}>
                  <Text fontSize="lg" fontWeight="bold" color="white">
                    Pro Plan - 1 Month
                  </Text>
                  <Text fontSize="sm" color="#b1b1b1">
                    Designed for large businesses needing comprehensive solutions.
                  </Text>
                </Flex>
              </Box>
            </VStack>

            {/* Features Section */}
            <Flex px={12} py={4} gap={4} justify="space-between" direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', sm: 'start' }}>
              {[
                { icon: <AppIcons.Secure color="#2BCFA1" />, text: 'Pro Access' },
                { icon: <AppIcons.GreenSpeedometer color="#2BCFA1" />, text: 'Cancel anytime' },
                { icon: <AppIcons.Refresh style={{ height: '16px', width: '16px' }} />, text: 'Seamless Activation' }
              ].map(({ icon, text }, index) => (
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

            {/* Footer Section */}
            <VStack p={6} spacing={6} align="start">
              <Text fontSize="sm" color="white" textAlign="center">
                If you unfollow us at any time, your Pro Plan benefits will be revoked. Make sure to remain a follower to continue enjoying premium features!
              </Text>
              <Button bg="#2bcea1" color="black" size="lg" w="full" onClick={handleButtonClick}>
                Sign in to Get Started
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </AppModal>

    </>
  );
};

export default ProPlanModal;
