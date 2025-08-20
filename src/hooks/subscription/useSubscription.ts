import { useMemo } from 'react';
import useAppStore from 'stores/app/appStore';
import { PlanType } from 'services/subscription/interfaces';

export interface SubscriptionInfo {
  planType: PlanType | null;
  isStarter: boolean;
  isBusiness: boolean;
  isBusinessPro: boolean;
  isEnterprise: boolean;
  hasPaidSubscription: boolean;
  canUseFeature: (feature: string) => boolean;
  shouldShowUpgradeModal: boolean;
}

const useSubscription = (): SubscriptionInfo => {
  const { shop } = useAppStore();
  
  const subscriptionInfo = useMemo(() => {
    const planType = shop?.subscription?.subscriptionId?.type as PlanType | null;
    
    const isStarter = planType === 'STARTER' || !planType;
    const isBusiness = planType === 'BUSINESS';
    const isBusinessPro = planType === 'BUSINESS_PRO';
    const isEnterprise = planType === 'ENTERPRISE';
    
    const hasPaidSubscription = !isStarter;
    const shouldShowUpgradeModal = isStarter || isBusiness || isBusinessPro;
    
    return {
      planType,
      isStarter,
      isBusiness,
      isBusinessPro,
      isEnterprise,
      hasPaidSubscription,
      shouldShowUpgradeModal,
      canUseFeature: (feature: string) => {
        if (!shop?.subscription?.subscriptionId?.subOptionIds) return false;
        const permissions = shop.subscription.subscriptionId.subOptionIds;
        const permissionObj = permissions.find(p => p.key === feature);
        if (!permissionObj) return false;
        const value = permissionObj.value;
        return (value || (!isNaN(Number(value)) && Number(value) > 0)) ? true : false;
      }
    };
  }, [shop?.subscription?.subscriptionId]);
  
  return subscriptionInfo;
};

export default useSubscription;