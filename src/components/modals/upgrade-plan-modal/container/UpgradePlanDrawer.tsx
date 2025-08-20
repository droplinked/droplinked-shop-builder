import Drawer from 'components/common/Drawer/Drawer';
import PaymentModal from 'components/modals/payment-modal/PaymentModal';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localAr from 'locales/subscription/ar.json';
import localEn from 'locales/subscription/en.json';
import React from 'react';
import { PlanTabHeaders } from '../components/PlanTabContainer';
import { UpgradePlanContent } from '../components/UpgradePlanContent';
import { useUpgradePlan } from '../hooks/useUpgradePlan';
import { PlanModalProps } from '../types/upgradePlan.types';
import { getUpgradePlanTexts } from '../utils/upgradePlanUtils';

export default function UpgradePlanDrawer({ isOpen, onClose, initialActiveTab }: PlanModalProps) {
  const { t } = useLocaleResources('subscription', {
    en: localEn,
    ar: localAr
  });

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

  const { title, description, saveButtonText, discardButtonText } = getUpgradePlanTexts(
    activeTab, 
    isCrossmint, 
    canActivateTrial, 
    t
  );

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        drawerContentStyle={{ borderTopRadius: 16 }}
        drawerHeaderStyle={{ padding: { base: 4, md: '48px' } }}
        placement="bottom"
        showSubmitButtons={true}
        saveButtonText={saveButtonText}
        discardButtonText={discardButtonText}
        saveButtonProps={{ 
          variant: 'filled',
          isDisabled: isSubmitting,
          isLoading: isSubmitting,
          loadingText: isSubmitting ? "Submitting..." : undefined
        }}
        discardButtonProps={{ 
          variant: 'secondary',
          isDisabled: isSubmitting
        }}
        title={title}
        description={description}
        headerContent={
          <PlanTabHeaders
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isDrawer={true}
          />
        }
        onClick={handleUpgrade}
      >
        <UpgradePlanContent 
          activeTab={activeTab}
          isDrawer={true}
          onDataChange={setEnterpriseFormData}
          planInfo={planInfo}
          features={currentPlanData.features}
          canActivateTrial={canActivateTrial}
        />
      </Drawer>

      <PaymentModal
        TrialMonths={isCrossmint ? 3 : 1}
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        plan={planForPayment}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
}
