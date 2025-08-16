import { useMemo } from 'react';
import { getSubscriptionPlans } from 'data/subscriptionPlans';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { PlanType } from '../types/upgradePlan.types';
import { PLAN_TYPE_MAP } from '../constants';
import localAr from 'locales/subscription/ar.json';
import localEn from 'locales/subscription/en.json';

export function usePlanData(planType: PlanType) {
  const { t } = useLocaleResources('subscription', {
    en: localEn,
    ar: localAr
  });

  return useMemo(() => {
    const subscriptionPlans = getSubscriptionPlans(t);
    const planKey = PLAN_TYPE_MAP[planType] as keyof typeof subscriptionPlans;
    return subscriptionPlans[planKey];
  }, [planType, t]);
}