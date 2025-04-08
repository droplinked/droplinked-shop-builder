import { Image, Text, VStack } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import React from 'react';

interface Props {
  isLoading: boolean;
  handleButtonClick: () => void;
}

const ModalFooter = ({ isLoading, handleButtonClick }: Props) => (
  <VStack p={6} spacing={6} align="start">
    <Image src="/assets/images/rewards/modal-footer-bg.png" w="100%" h="100%" objectFit="cover" position="absolute" />
    <Text fontSize="sm" color="white" textAlign="center">
      If you unfollow us at any time, your Pro Plan benefits will be revoked. Make sure to remain a follower to continue enjoying premium features!
    </Text>
    <BasicButton bg="#2bcea1" color="black" size="lg" w="full" onClick={handleButtonClick} isLoading={isLoading}>
      Go to Dashboard
    </BasicButton>
  </VStack>
);

export default ModalFooter;
