import { useState, useEffect, useCallback, useMemo } from 'react';
import React from 'react';
import { PlanType } from '../types/upgradePlan.types';
import { getSubscriptionPlans } from 'data/subscriptionPlans';
import { postEnterpriseRequestService } from 'services/user/services';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import useAppToast from 'hooks/toast/useToast';
import useAppStore from 'stores/app/appStore';
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore';
import localAr from 'locales/subscription/ar.json';
import localEn from 'locales/subscription/en.json';

interface UseUpgradePlanProps {
  onClose: () => void;
  initialActiveTab?: PlanType;
}


const DEFAULT_TAB: PlanType = 'pro';
const ENTERPRISE_FIELDS = ['primaryGoal', 'organizationSize'] as const;

export function useUpgradePlan({ onClose, initialActiveTab }: UseUpgradePlanProps) {
  const { t } = useLocaleResources('subscription', {
    en: localEn,
    ar: localAr
  });
  const { showToast } = useAppToast();
  const { shop } = useAppStore();
  const { shopSetupUI } = useOnboardingStore();
  
  // Calculate values from the stores with memoization
  const canActivateTrial = useMemo(() => 
    shop?.subscription?.canActivateTrial ?? false, 
    [shop?.subscription?.canActivateTrial]
  );
  
  const isCrossmint = useMemo(() => 
    shopSetupUI.isFromCrossmint ?? false, 
    [shopSetupUI.isFromCrossmint]
  );

  const [activeTab, setActiveTab] = useState<PlanType>(initialActiveTab || DEFAULT_TAB);
  
  // Update activeTab when initialActiveTab changes
  useEffect(() => {
    if (initialActiveTab) {
      setActiveTab(initialActiveTab);
    }
  }, [initialActiveTab]);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [enterpriseFormData, setEnterpriseFormData] = useState({
    primaryGoal: '',
    organizationSize: '',
    featureDescription: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPlans = getSubscriptionPlans(t);

  const getPlanInfo = (planType: PlanType) => {
    const planTypeMap: Record<PlanType, keyof typeof subscriptionPlans> = {
      pro: 'BUSINESS',
      premium: 'BUSINESS_PRO',
      enterprise: 'ENTERPRISE'
    };

    const plan = subscriptionPlans[planTypeMap[planType]] || subscriptionPlans.BUSINESS;

    return {
      icon: React.createElement(plan.icon, { color: 'white' }),
      title: plan.title,
      description: plan.description,
      features: plan.features.items
    };
  };

  const getCurrentPlanData = useCallback(() => {
    const planTypeMap: Record<PlanType, keyof typeof subscriptionPlans> = {
      pro: 'BUSINESS',
      premium: 'BUSINESS_PRO',
      enterprise: 'ENTERPRISE'
    };

    const plan = subscriptionPlans[planTypeMap[activeTab]] || subscriptionPlans.BUSINESS;

    return {
      plan: {
        _id: plan.type,
        type: plan.type,
        subOptionIds: [],
        price: '0'
      },
      features: plan.features.items
    };
  }, [activeTab, subscriptionPlans]);

  // Memoized enterprise form validation
  const isEnterpriseFormValid = useMemo(() => {
    return ENTERPRISE_FIELDS.every(field => enterpriseFormData[field]?.trim());
  }, [enterpriseFormData]);

  // Memoized upgrade handler
  const handleUpgrade = useCallback(async () => {
    if (activeTab === 'enterprise') {
      // Check if form is valid before submitting
      if (!isEnterpriseFormValid) {
        showToast({
          type: 'error',
          message: 'Please fill in all required fields',
        });
        return;
      }

      setIsSubmitting(true);
      try {
        await postEnterpriseRequestService(enterpriseFormData);

        showToast({
          type: 'success',
          message: 'Enterprise request submitted successfully!',
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

  const getPlanForPayment = useCallback(() => 
    activeTab === 'pro' ? 'BUSINESS' : 'BUSINESS_PRO', 
    [activeTab]
  );

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
    getPlanInfo,
    getCurrentPlanData,
    isEnterpriseFormValid,

    // Actions
    handleUpgrade,
    closePaymentModal,
    handlePaymentSuccess,

    // Payment helpers
    getPlanForPayment
  };
}
