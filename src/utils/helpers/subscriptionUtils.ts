// Subscription plan utility functions
import { SubOptionId, SubscriptionPlan } from 'services/subscription/interfaces';
import { getSubscriptionPlans } from '../../data/subscriptionPlans';
import { TFunction } from 'i18next';

/**
 * Gets plan details by type
 * @param planType - Plan identifier
 * @param t - Translation function
 * @throws {Error} For invalid plan type
 */
export const getPlanDetails = (planType: string, t: TFunction) => {
  const availablePlans = getSubscriptionPlans(t);
  const plan = availablePlans[planType as keyof typeof availablePlans];
  
  if (!plan) {
    throw new Error(`Invalid subscription plan type: ${planType}`);
  }
  
  return plan;
};

/**
 * Extracts unique features between current and previous plan tiers
 * @param currentPlan - Current plan to analyze
 * @param previousPlan - Previous tier plan for comparison
 */
export const getFilteredFeatures = (
  currentPlan: SubscriptionPlan,
  previousPlan?: SubscriptionPlan
): SubOptionId[] => {
  if (!previousPlan) {
    return currentPlan.subOptionIds.map(subOption => ({
      title: subOption.title || subOption.key,
      key: subOption.key,
      value: subOption.value
    }));
  }

  return currentPlan.subOptionIds.map(currentSubOption => {
    const previousSubOption = previousPlan.subOptionIds.find(
      prevOption => prevOption.key === currentSubOption.key
    );

    const uniqueFeatures = currentSubOption.value.filter(feature => {
      const previousFeature = previousSubOption?.value.find(
        prevFeature => prevFeature.key === feature.key
      );
      return !previousFeature || feature.value !== previousFeature.value;
    });

    return {
      title: currentSubOption.title || currentSubOption.key,
      key: currentSubOption.key,
      value: uniqueFeatures
    };
  });
};
