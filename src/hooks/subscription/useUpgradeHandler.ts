import { useDisclosure } from '@chakra-ui/react';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import useSubscription from './useSubscription';
import { PlanType } from 'services/subscription/interfaces';

const useUpgradeHandler = (requiredPlan: PlanType = 'BUSINESS') => {
  
  const { shouldShowUpgradeModal, planType } = useSubscription();
  const { showToast } = useAppToast();
  const { t } = useLocaleResources('common');
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const hasRequiredPlan = () => {
    const planHierarchy = {
      'STARTER': 1,
      'BUSINESS': 2,
      'BUSINESS_PRO': 3,
      'ENTERPRISE': 4
    };
    
    const currentPlanLevel = planHierarchy[planType || 'STARTER'] || 1;
    const requiredPlanLevel = planHierarchy[requiredPlan] || 2;
    
    return currentPlanLevel >= requiredPlanLevel;
  };
  
  const handleFeatureAccess = (callback?: () => void) => {
    console.log(planType, requiredPlan)
    if (planType === 'ENTERPRISE' && requiredPlan === 'ENTERPRISE') {
      showToast({ type: "info", message: t("errors.enterpriseSupport") })
      return;
    }
    
    if (shouldShowUpgradeModal && !hasRequiredPlan()) {
      onOpen();
      return;
    }
    
    // User has valid subscription and required plan, execute callback
    if (callback) {
      callback();
    }
  };
  
  return {
    handleFeatureAccess,
    shouldShowUpgradeModal,
    isUpgradeModalOpen: isOpen,
    openUpgradeModal: onOpen,
    closeUpgradeModal: onClose,
    hasRequiredPlan: hasRequiredPlan(),
    currentPlan: planType,
    requiredPlan
  };
};

export default useUpgradeHandler;