import { Flex } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from 'stores/app/appStore';
import CustomizableSection from './CustomizableSection';
import ProPlanSection from './ProPlanSection';
import SellingSection from './SellingSection';

const RewardDetails = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppStore();
  const { t } = useLocaleResources('rewards');

  function handleCreateStoreClick() {
    const destination = isLoggedIn ? "/analytics" : "/onboarding?entry=signin"
    navigate(destination)
  }

  return (
    <Flex justify="start" align="start" gap={6} overflow="hidden" flexDirection={{ base: 'column', lg: 'row' }} alignItems="stretch">
      <ProPlanSection t={t} />
      <Flex flexDirection="column" gap={6} flex="1">
        <SellingSection onCreateStoreClick={handleCreateStoreClick} t={t} />
        <CustomizableSection onCreateStoreClick={handleCreateStoreClick} t={t} />
      </Flex>
    </Flex>
  );
};

export default RewardDetails;
