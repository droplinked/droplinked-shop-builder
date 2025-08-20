import { Flex, Grid, ModalBody } from '@chakra-ui/react';
import AppModal from 'components/redesign/modal/AppModal';
import React from 'react';
import PaymentModal from '../../payment-modal/PaymentModal';
import ModalFooter from '../components/ModalFooter';
import ModalHeader from '../components/ModalHeader';
import PlanTabs from '../components/PlanTabContainer';
import { UpgradePlanContent } from '../components/UpgradePlanContent';
import { useUpgradePlan } from '../hooks/useUpgradePlan';
import { PlanModalProps } from '../types/upgradePlan.types';

export default function UpgradePlanModal({ isOpen, onClose, initialActiveTab }: PlanModalProps) {
  const {
    activeTab,
    setActiveTab,
    isPaymentModalOpen,
    setEnterpriseFormData,
    planInfo,
    currentPlanData,
    handleUpgrade,
    closePaymentModal,
    handlePaymentSuccess,
    planForPayment,
    isSubmitting,
    canActivateTrial,
    isCrossmint
  } = useUpgradePlan({ onClose, initialActiveTab });

  return (
    <AppModal
      modalRootProps={{
        isOpen,
        onClose,
        size: '6xl',
        isCentered: true
      }}
      modalContentProps={{
        background: '#1C1C1C',
        paddingBlock: '0'
      }}
    >
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }}>
        <Flex flexDirection="column">
          <ModalHeader
            isCrossmint={isCrossmint}
            canActivateTrial={canActivateTrial}
            activeTab={activeTab}
          />
          <ModalBody padding="0px !important">
            <UpgradePlanContent
              activeTab={activeTab}
              onDataChange={setEnterpriseFormData}
              planInfo={planInfo}
              features={currentPlanData.features}
              canActivateTrial={canActivateTrial}
            />
            <ModalFooter
              isCrossmint={isCrossmint}
              canActivateTrial={canActivateTrial}
              activeTab={activeTab}
              onClose={onClose}
              onUpgrade={handleUpgrade}
              isSubmitting={isSubmitting}
            />
          </ModalBody>
        </Flex>
        <Flex direction="column">
          <PlanTabs activeTab={activeTab} onTabChange={setActiveTab}/>
        </Flex>
      </Grid>

      <PaymentModal
        TrialMonths={isCrossmint ? 3 : 1}
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        plan={planForPayment}
        onSuccess={handlePaymentSuccess}
      />
    </AppModal>
  );
}
