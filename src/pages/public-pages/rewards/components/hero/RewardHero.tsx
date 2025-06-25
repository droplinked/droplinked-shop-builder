import { useDisclosure, VStack } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppStore from 'stores/app/appStore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFollowStatus from '../../hook/useFollowStatus';
import ProPlanModal from '../Pro-plan-modal/ProPlanModal';
import RewardDivider from './RewardDivider';
import RewardHeader from './RewardHeader';

const RewardHero = () => {
  const navigate = useNavigate()
  const [unlockedMonths, setUnlockedMonths] = useState<number | undefined>();
  const { isOpen: isProPlanOpen, onOpen: openProPlan, onClose: closeProPlan } = useDisclosure();
  const { isLoggedIn } = useAppStore();
  const { grantProPlan, loading } = useFollowStatus();

  const textMessage = isLoggedIn ? 'Complete Everything Below to Unlock Level 1 Membership' : 'Register to Qualify';
  const buttonMessage = isLoggedIn ? 'Activate Account' : 'Get Started';

  const onClick = async () => {
    if (!isLoggedIn) return navigate("/onboarding?entry=signin")

    try {
      const result = await grantProPlan();
      if (result.success) {
        setUnlockedMonths(result.unlockedMonths);
        openProPlan();
      }
    }
    catch (error) {
      console.error('Error granting Pro Plan:', error);
    }
  }

  return (
    <>
      <VStack pt="192px" pb="120px" spacing={12} align="center" zIndex={2}>
        <RewardHeader />
        <VStack justifyContent="center" spacing={4} overflow="hidden" padding={4} width="100%">
          <RewardDivider text={textMessage} />
          <BasicButton color="black" fontSize="sm" fontWeight="medium" borderRadius="lg" px={3.5} py={2.5} onClick={onClick} isLoading={loading}>
            {buttonMessage}
          </BasicButton>
        </VStack>
      </VStack>
      {isLoggedIn && <ProPlanModal unlockedMonths={unlockedMonths} isOpen={isProPlanOpen} onClose={closeProPlan} />}
    </>
  );
};

export default RewardHero;
