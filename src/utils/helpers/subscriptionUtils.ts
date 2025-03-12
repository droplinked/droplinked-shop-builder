// Utility functions for handling subscription plan information and icons.
import { SubOptionId, SubscriptionPlan } from 'lib/apis/subscription/interfaces';
import { subscriptionPlans } from '../constants/subscriptionPlans';

// Retrieves the icon and title for a specific subscription plan
export const getSubscriptionPlanIcon = (type: string) => {
  const plan = subscriptionPlans[type as keyof typeof subscriptionPlans];
  return plan ? { icon: plan.icon, title: plan.title } : undefined;
};

/**
 * Gets unique features for a subscription plan by comparing with the previous tier plan
 * @param currentPlan Current subscription plan
 * @param previousPlan Previous tier subscription plan (optional)
 * @returns Features that are unique/different compared to the previous tier plan
 */
export const getFilteredFeatures = (currentPlan: SubscriptionPlan, previousPlan?: SubscriptionPlan): SubOptionId[] => {
  if (!previousPlan) return currentPlan.subOptionIds; // Return all features for the starter plan

  return currentPlan.subOptionIds.map((subOption) => {
    // Find the corresponding subOption in the previous plan
    const previousSubOption = previousPlan?.subOptionIds.find((p) => p.key === subOption.key);

    // Filter the features based on the condition
    const filteredFeatures = subOption.value.filter((feature) => {
      // If the feature exists in the current plan but not in the previous plan, or its value is different, include it
      const previousFeature = previousSubOption?.value.find((pf) => pf.key === feature.key);
      return !previousFeature || feature.value !== previousFeature.value;
    });

    return {
      ...subOption,
      value: filteredFeatures
    };
  });
};
