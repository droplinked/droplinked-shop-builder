import { Box, Flex, Heading, Text, useDisclosure, VStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AuthModal from 'components/modals/auth-modal/AuthModal';
import useAppStore from 'lib/stores/app/appStore';
import { MODAL_TYPE } from 'pages/public-pages/homePage/HomePage';
import React from 'react';
import useFollowStatus from '../../hook/useFollowStatus';

const RewardHero = () => {
  const { shop } = useAppStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allPlatformsFollowed, grantProPlan, loading } = useFollowStatus();
  const textMessage = shop ? 'Complete Everything Below to Unlock Level 1 Membership' : 'Register to Qualify';
  const buttonMessage = shop ? 'Activate Account' : 'Get Started';

  const onClick = () => {
    if (shop) {
      if (allPlatformsFollowed) {
        grantProPlan();
      }
    } else {
      onOpen();
    }
  };

  return (
    <>
      <VStack pt="192px" pb="120px" spacing={12} align="center" zIndex={2}>
        <VStack spacing={4} align="center">
          <VStack spacing={4}>
            <Flex w={14} h={14} bg="rgba(43, 207, 161, 0.1)" border="1px solid #2BCFA11A" borderRadius="xl" backdropFilter="blur(20px)" justify="center" align="center">
              <AppIcons.DROP_LINKED_LOGO />
            </Flex>
            <Text color="#2bcea1" fontSize={{ base: 'md', md: 'lg' }} fontWeight="medium">
              droplinked rewards programs
            </Text>
          </VStack>
          <Heading size={{ base: 'xl', md: '2xl' }} textAlign="center" color="white" fontFamily="Poppins" fontWeight="bold">
            It’s Time to Level Up
          </Heading>
          <Text textAlign="center" color="#b1b1b1" fontSize={{ base: 'md', md: 'lg' }}>
            Get started on droplinked quests to earn points. As you earn towards each level,
            <Box display={{ base: 'none', md: 'block' }} as="br" />
            you unlock access to credits and tools that help you to earn more $
          </Text>
        </VStack>
        <VStack justifyContent="center" spacing={4} overflow="hidden" padding={4} width="100%">
          <Flex justify="center" align="center" width="100%">
            <Box flex="1" height="1px" bg="linear-gradient(to left, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 75%)" />
            <Box width="1px" height="16px" bg="rgba(255, 255, 255, 0.16)" right="50%" transform="translateX(50%)" />
            <Text color="white" fontSize={{ base: 'md', md: 'lg' }} fontWeight="medium" px={4}>
              {textMessage}
            </Text>
            <Box width="1px" height="16px" bg="rgba(255, 255, 255, 0.16)" right="50%" transform="translateX(50%)" />
            <Box flex="1" height="1px" bg="linear-gradient(to right, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 75%)" />
          </Flex>
          <BasicButton color="black" fontSize="sm" fontWeight="medium" borderRadius="lg" px={3.5} py={2.5} onClick={onClick}  isLoading={loading}>
            {buttonMessage}
          </BasicButton>
        </VStack>
      </VStack>
      <AuthModal show={isOpen} close={onClose} type={MODAL_TYPE.SIGNIN} />
    </>
  );
};

export default RewardHero;
