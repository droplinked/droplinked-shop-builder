import { Flex } from '@chakra-ui/react';
import useAppStore from 'stores/app/appStore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomizableSection from './CustomizableSection';
import ProPlanSection from './ProPlanSection';
import SellingSection from './SellingSection';

const RewardDetails = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppStore();

  function handleCreateStoreClick() {
    const destination = isLoggedIn ? "/analytics" : "/onboarding?entry=signin"
    navigate(destination)
  }

  return (
    <Flex justify="start" align="start" gap={6} overflow="hidden" flexDirection={{ base: 'column', lg: 'row' }} alignItems="stretch">
      <ProPlanSection />
      <Flex flexDirection="column" gap={6} flex="1">
        <SellingSection onCreateStoreClick={handleCreateStoreClick} />
        <CustomizableSection onCreateStoreClick={handleCreateStoreClick} />
      </Flex>
    </Flex>
  );
};

export default RewardDetails;
