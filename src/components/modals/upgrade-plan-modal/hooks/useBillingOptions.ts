import { useEffect, useMemo, useState } from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { SubscriptionPlan } from '../../../../services/subscription/interfaces';
import { getSubscriptionPlansService } from '../../../../services/subscription/subscriptionServices';
import useSubscriptionPlanStore, { planDurations } from '../../../../stores/subscription-plan.ts/subscriptionPlanStore';
import { PlanType } from '../types/upgradePlan.types';
import { PLAN_TYPE_MAP } from '../constants';
import { getDurationName } from '../utils/upgradePlanUtils';

export interface BillingOption {
  name: string;
  month: number;
  discount?: string;
  originalPrice: string;
  finalPrice: string;
  isSelected?: boolean;
  stripePriceId?: string;
  plan: SubscriptionPlan;
  showFree?: boolean;
}

export function useBillingOptions(plan: PlanType, canActivateTrial: boolean) {
  const { t } = useLocaleResources('common');
  const [allPlans, setAllPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { preferredPlanDuration, updatePlanDuration } = useSubscriptionPlanStore();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await getSubscriptionPlansService();
        setAllPlans(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('UpgradePlanModal.useBillingOptions.failedToFetchPlans'));
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [t]);

  const billingOptions = useMemo(() => {
    if (!allPlans.length) return [];

    const targetPlanType = PLAN_TYPE_MAP[plan] || 'BUSINESS';
    const targetPlan = allPlans.find(p => p.type === targetPlanType);
    
    if (!targetPlan) return [];
    
    const options: BillingOption[] = [];
    
    if (Array.isArray(targetPlan.price)) {
      planDurations.forEach((duration) => {
        const priceOption = (targetPlan.price as any[]).find((p: any) => p.month === duration.month);
        
        if (priceOption) {
          const discount = duration.discount;
          const discountPercentage = discount ? `-${discount}%` : undefined;
          const shouldShowFree = duration.month === 1 && canActivateTrial;
          
          options.push({
            name: getDurationName(duration.month),
            month: duration.month,
            discount: discountPercentage,
            originalPrice: `${priceOption.price}`,
            finalPrice: priceOption.discountPrice ? `${priceOption.discountPrice}` : `${priceOption.price}`,
            stripePriceId: priceOption.stripePriceId,
            isSelected: duration.month === preferredPlanDuration.month,
            plan: targetPlan,
            showFree: shouldShowFree
          });
        }
      });
    } else if (typeof targetPlan.price === 'string') {
      const shouldShowFree = plan === 'pro' && canActivateTrial;
      
      options.push({
        name: 'Monthly',
        month: 1,
        originalPrice: targetPlan.price === 'FREE' ? '$0' : targetPlan.price,
        finalPrice: targetPlan.price === 'FREE' ? 'Free' : targetPlan.price,
        isSelected: true,
        plan: targetPlan,
        showFree: shouldShowFree
      });
    }
    
    return options;
  }, [plan, canActivateTrial, allPlans, preferredPlanDuration.month]);

  const handleOptionSelect = (selectedOption: BillingOption) => {
    const selectedDuration = planDurations.find(d => d.month === selectedOption.month);
    if (selectedDuration) {
      updatePlanDuration(selectedDuration);
    }
  };

  return {
    billingOptions,
    loading,
    error,
    handleOptionSelect
  };
}