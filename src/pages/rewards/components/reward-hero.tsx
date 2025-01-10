import { Button, Flex, Text, useDisclosure, VStack } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AuthModal from 'components/modals/auth-modal/AuthModal';
import useAppStore from 'lib/stores/app/appStore';
import { MODAL_TYPE } from 'pages/public-pages/homePage/HomePage';
import React from 'react';
import useFollowStatus from '../useFollowStatus';
import AppIcons from 'assest/icon/Appicons';

const RewardHero = () => {
  const { shop } = useAppStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allPlatformsFollowed, grantProPlan, loading } = useFollowStatus();

  return (
    <>
      <VStack pt="192px" pb="120px" spacing={12} align="center" zIndex={2}>
        {/* Header Section */}
        <VStack spacing={4} align="center">
          {/* Icon Section */}
          <Flex
            w={14}
            h={14}
            bg="rgba(43, 207, 161, 0.1)"
            border="1px solid #2BCFA11A"
            borderRadius="xl"
            backdropFilter="blur(20px)"
            justify="center"
            align="center"
          >
            <AppIcons.DROP_LINKED_LOGO />
          </Flex>
          {/* Title */}
          <Text fontSize="lg" fontWeight="medium" color="#2bcea1">
            Droplinked Rewards Programs
          </Text>
          <Text
            fontSize="5xl"
            fontWeight="bold"
            textAlign="center"
            color="white"
            lineHeight="64px"
          >
            It’s Time to Level Up
          </Text>
        </VStack>

        {/* Call to Action Section */}
        <VStack spacing={4} align="center" h="84px">
          {shop ? (
            <>
              <Text fontSize="lg" fontWeight="medium" color="white">
                Complete Everything Below to Unlock Level 1 Membership
              </Text>
              <BasicButton
                color="black"
                fontSize="sm"
                fontWeight="medium"
                borderRadius="lg"
                px={3.5}
                py={2.5}
                onClick={allPlatformsFollowed ? grantProPlan : undefined}
                isDisabled={!allPlatformsFollowed || loading}
                isLoading={loading}
              >
                Activate Account
              </BasicButton>
            </>
          ) : (
            <>
              <Text fontSize="lg" fontWeight="medium" color="white">
                Register to Qualify
              </Text>
              <Button
                bg="#2bcea1"
                color="black"
                fontSize="sm"
                fontWeight="medium"
                borderRadius="lg"
                px={3.5}
                py={2.5}
                onClick={onOpen}
              >
                Get Started
              </Button>
            </>
          )}
        </VStack>
      </VStack>
      <AuthModal show={isOpen} close={onClose} type={MODAL_TYPE.SIGNIN} />
    </>
  );
};

export default RewardHero;
