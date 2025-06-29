import { Box, ModalBody, useDisclosure } from '@chakra-ui/react';
import PaymentModal from 'components/modals/payment-modal/PaymentModal';
import AppModal from 'components/redesign/modal/AppModal';
import PlanDurationRadioContainer from 'components/redesign/plan-duration-radio/PlanDurationRadioContainer';
import { getSubscriptionPlansService } from 'lib/apis/subscription/subscriptionServices';
import React from 'react';
import { useQuery } from 'react-query';
import useAppStore from 'stores/app/appStore';
import ProPlanCard from './ProPlanCard';
import ProPlanFooter from './ProPlanFooter';
import ProPlanHeader from './ProPlanHeader';

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  isCrossmint?: boolean;
}

const ProPlanUpgradeModal = ({ isOpen, onClose, isCrossmint = false }: Props) => {
  const { isOpen: isPaymentModalOpen, onOpen: openPaymentModal, onClose: closePaymentModal } = useDisclosure();
  const { shop } = useAppStore();

  const canActivateTrial = shop?.subscription?.canActivateTrial ?? false;

  const businessPlan = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: () => getSubscriptionPlansService(),
    select: (data) => data.data.find((plan) => plan.type === 'BUSINESS')
  });

  const handleUpgrade = () => {
    openPaymentModal();
  };

  return (
    <AppModal modalRootProps={{ isOpen, onClose, size: 'xl', isCentered: true, closeOnOverlayClick: false }} modalContentProps={{ width: 'auto !important', padding: '0px !important' }}>
      <ModalBody bg="neutral.grey.1000" display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding="0px !important" rounded="24px">
        <ProPlanHeader isCrossmint={isCrossmint} canActivateTrial={canActivateTrial} />

        {!isCrossmint && (
          <Box mb="6" zIndex={3}>
            <PlanDurationRadioContainer bgColor="neutral.gray.900" showBorder={true} />
          </Box>
        )}

        <ProPlanCard 
          isCrossmint={isCrossmint} 
          canActivateTrial={canActivateTrial} 
          businessPlan={businessPlan.data} 
        />

        

        <ProPlanFooter 
          canActivateTrial={canActivateTrial} 
          onClose={onClose} 
          onUpgrade={handleUpgrade} 
        />
      </ModalBody>

      <PaymentModal
        plan="BUSINESS"
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        onSuccess={onClose}
        TrialMonths={isCrossmint ? 3 : 1}
        successMessage="Trial activated successfully! Your Pro features are now available."
      />
    </AppModal>
  );
};

export default ProPlanUpgradeModal;
