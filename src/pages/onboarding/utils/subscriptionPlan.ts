import { PlanType } from 'pages/onboarding/types/onboarding'
import { subscriptionPlans } from 'utils/constants/subscriptionPlans'

/**
 * Maps each plan type to its parent plan that it inherits features from
 */
const PLAN_INHERITANCE: Record<PlanType, string> = {
  BUSINESS: 'Starter',
  BUSINESS_PRO: 'Pro',
  ENTERPRISE: 'Premium',
  STARTER: '',
} as const

/**
 * Gets the list of features for a plan, including inherited features from parent plans
 * @param planType - The type of plan to get features for
 * @returns Array of feature descriptions
 */
export const getFeaturesWithInheritance = (planType: PlanType): string[] => {
  const baseFeatures = [...subscriptionPlans[planType].features.items]
  const inheritedPlan = PLAN_INHERITANCE[planType]
  
  return inheritedPlan 
    ? [`Everything in ${inheritedPlan} plan`, ...baseFeatures]
    : baseFeatures
}

/**
 * Gets the continue button text for a selected plan
 * @param selectedPlan - The currently selected plan type
 * @returns Formatted continue button text
 */
export const getContinueText = (selectedPlan: PlanType): string => {
  const planTitle = subscriptionPlans[selectedPlan].title ?? selectedPlan
  return `Continue with ${planTitle} Plan`
}