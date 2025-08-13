import Drawer from 'components/common/Drawer/Drawer';
import PaymentModal from 'components/modals/payment-modal/PaymentModal';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localAr from 'locales/subscription/ar.json';
import localEn from 'locales/subscription/en.json';
import React from 'react';
import { PlanTabHeaders } from '../components/PlanTabContainer';
import { UpgradePlanContent } from '../components/UpgradePlanContent';
import { useUpgradePlan } from '../hooks/useUpgradePlan';
import { PlanType } from '../types/upgradePlan.types';
import { getUpgradePlanTexts } from '../utils/upgradePlanUtils';

interface UpgradePlanDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialActiveTab?: PlanType;
}

export default function UpgradePlanDrawer({
  isOpen,
  onClose,
  initialActiveTab,
}: UpgradePlanDrawerProps) {
  const { t } = useLocaleResources('subscription', {
    en: localEn,
    ar: localAr
  });

  const {
    activeTab,
    setActiveTab,
    isPaymentModalOpen,
    setEnterpriseFormData,
    getPlanInfo,
    getCurrentPlanData,
    handleUpgrade,
    closePaymentModal,
    handlePaymentSuccess,
    getPlanForPayment,
    isSubmitting,
    canActivateTrial,
    isCrossmint
  } = useUpgradePlan({ onClose, initialActiveTab });

  const planInfo = getPlanInfo(activeTab);
  const { features } = getCurrentPlanData();
  const { title, description, saveButtonText, discardButtonText } = getUpgradePlanTexts(activeTab, isCrossmint, canActivateTrial, t);

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
          features={features}
          canActivateTrial={canActivateTrial}
        />
      </Drawer>

      {/* Payment Modal for Pro and Premium plans */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        plan={getPlanForPayment()}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
}
