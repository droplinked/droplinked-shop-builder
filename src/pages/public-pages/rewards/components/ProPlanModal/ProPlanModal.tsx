import { Box, ModalBody } from '@chakra-ui/react';
import AppModal from 'components/redesign/modal/AppModal';
import useShopSubscriptionData from 'functions/hooks/shop-subscription-data/useShopSubscriptionData';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeaturesSection from './components/FeaturesSection';
import ModalFooter from './components/Footer';
import { ModalHeader } from './components/Header';
import { PlanDetails } from './components/PlanDetails';
import useAppStore from 'lib/stores/app/appStore';

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  unlockedMonths: number;
}

const ProPlanModal = ({ isOpen, onClose, unlockedMonths }: Props) => {
  const navigate = useNavigate();
  const { refetch, isFetching } = useShopSubscriptionData();
  const { shop, fetchShop } = useAppStore();

  const handleButtonClick = async () => {
    try {
      await refetch();
      await fetchShop({ shopName: shop.name });
      navigate('/analytics');
      onClose();
    } catch (error) {
      console.error('Failed to refresh subscription data:', error);
    }
  };

  return (
    <AppModal modalRootProps={{ isOpen, onClose, size: 'xl', isCentered: true }} modalContentProps={{ width: 'auto !important', padding: '0px !important' }}>
      <ModalBody display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="36px" padding="0px !important" rounded="24px">
        <Box bg="#1b1b1b" border="1px solid #282828" overflow="hidden">
          <ModalHeader />
          <PlanDetails unlockedMonths={unlockedMonths} />
          <FeaturesSection />
          <ModalFooter isLoading={isFetching} handleButtonClick={handleButtonClick} />
        </Box>
      </ModalBody>
    </AppModal>
  );
};

export default ProPlanModal;
