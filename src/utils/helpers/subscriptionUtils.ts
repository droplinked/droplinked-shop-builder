// Utility functions for handling subscription plan information and icons.
import { subscriptionPlans } from '../constants/subscriptionPlans';

// Retrieves the icon and title for a specific subscription plan
export const getSubscriptionPlanIcon = (type: string) => {
  const plan = subscriptionPlans[type as keyof typeof subscriptionPlans];
  return plan ? { icon: plan.icon, title: plan.title } : undefined;
};
