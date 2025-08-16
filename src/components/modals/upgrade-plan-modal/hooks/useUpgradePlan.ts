import { useState, useEffect, useCallback, useMemo } from 'react';
import { PlanType, EnterpriseFormData } from '../types/upgradePlan.types';
import { postEnterpriseRequestService } from 'services/user/services';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import useAppToast from 'hooks/toast/useToast';
import useAppStore from 'stores/app/appStore';
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore';
import { DEFAULT_TAB, ENTERPRISE_FIELDS } from '../constants';
import { getPlanInfo, getCurrentPlanData, getPlanForPayment } from '../utils/upgradePlanUtils';
import localAr from 'locales/subscription/ar.json';
import localEn from 'locales/subscription/en.json';


interface UseUpgradePlanProps {
  onClose: () => void;
  initialActiveTab?: PlanType;
}

const initialEnterpriseFormData: EnterpriseFormData = {
  primaryGoal: '',
  organizationSize: '',
  featureDescription: ''
};

export function useUpgradePlan({ onClose, initialActiveTab }: UseUpgradePlanProps) {
  const { t } = useLocaleResources('common');
  const { t: tSubscription } = useLocaleResources('subscription', {
    en: localEn,
    ar: localAr
  });
  const { showToast } = useAppToast();
  const { shop } = useAppStore();
  const { shopSetupUI } = useOnboardingStore();
  
  // Memoized store values
  const canActivateTrial = useMemo(() => 
    shop?.subscription?.canActivateTrial ?? false, 
    [shop?.subscription?.canActivateTrial]
  );
  
  const isCrossmint = useMemo(() => 
    shopSetupUI.isFromCrossmint ?? false, 
    [shopSetupUI.isFromCrossmint]
  );

  // State
  const [activeTab, setActiveTab] = useState<PlanType>(initialActiveTab || DEFAULT_TAB);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [enterpriseFormData, setEnterpriseFormData] = useState<EnterpriseFormData>(initialEnterpriseFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Update activeTab when initialActiveTab changes
  useEffect(() => {
    if (initialActiveTab) {
      setActiveTab(initialActiveTab);
    }
  }, [initialActiveTab]);

  // Memoized enterprise form validation
  const isEnterpriseFormValid = useMemo(() => {
    return ENTERPRISE_FIELDS.every(field => enterpriseFormData[field]?.trim());
  }, [enterpriseFormData]);

  // Handlers
  const handleUpgrade = useCallback(async () => {
    if (activeTab === 'enterprise') {
      if (!isEnterpriseFormValid) {
        showToast({
          type: 'error',
          message: t('UpgradePlanModal.useUpgradePlan.fillRequiredFields'),
        });
        return;
      }

      setIsSubmitting(true);
      try {
        await postEnterpriseRequestService(enterpriseFormData);
        showToast({
          type: 'success',
          message: t('UpgradePlanModal.useUpgradePlan.enterpriseRequestSuccess'),
        });
        onClose();
      } catch (error: any) {
        const errorMessage = error?.response?.data?.data?.message || t('errors.oopsSomethingWentWrong');
        showToast({
          type: 'error',
          message: errorMessage
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsPaymentModalOpen(true);
    }
  }, [activeTab, enterpriseFormData, isEnterpriseFormValid, onClose, showToast, t]);

  const closePaymentModal = useCallback(() => setIsPaymentModalOpen(false), []);
  
  const handlePaymentSuccess = useCallback(() => {
    setIsPaymentModalOpen(false);
    onClose();
  }, [onClose]);

  // Memoized plan info
  const planInfo = useMemo(() => getPlanInfo(activeTab, tSubscription), [activeTab, tSubscription]);
  const currentPlanData = useMemo(() => getCurrentPlanData(activeTab, tSubscription), [activeTab, tSubscription]);
  const planForPayment = useMemo(() => getPlanForPayment(activeTab), [activeTab]);

  return {
    // State
    activeTab,
    setActiveTab,
    isPaymentModalOpen,
    enterpriseFormData,
    setEnterpriseFormData,
    isSubmitting,
    canActivateTrial,
    isCrossmint,

    // Computed values
    planInfo,
    currentPlanData,
    isEnterpriseFormValid,
    planForPayment,

    // Actions
    handleUpgrade,
    closePaymentModal,
    handlePaymentSuccess
  };
}
