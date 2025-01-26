import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import CustomizableSection from './components/CustomizableSection';
import ProPlanSection from './components/ProPlanSection';
import SellingSection from './components/SellingSection';
import AuthModal from 'components/modals/auth-modal/AuthModal';
import { MODAL_TYPE } from 'pages/public-pages/homePage/HomePage';
import useAppStore from 'lib/stores/app/appStore';
import { useNavigate } from 'react-router-dom';

const RewardDetails = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn } = useAppStore();

  const openAuthModal = () => {
    if (isLoggedIn) {
      navigate('/analytics');
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <Flex justify="start" align="start" gap={6} overflow="hidden" flexDirection={{ base: 'column', lg: 'row' }} alignItems="stretch">
        <ProPlanSection />
        <Flex flexDirection="column" gap={6} flex="1">
          <SellingSection openAuthModal={openAuthModal} />
          <CustomizableSection openAuthModal={openAuthModal} />
        </Flex>
      </Flex>
      <AuthModal show={isAuthModalOpen} close={() => setAuthModalOpen(false)} type={MODAL_TYPE.SIGNIN} />
    </>
  );
};

export default RewardDetails;
