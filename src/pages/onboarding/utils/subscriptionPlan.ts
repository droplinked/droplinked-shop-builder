import { TFunction } from 'i18next'
import { PlanType } from 'pages/onboarding/types/onboarding'
import { getSubscriptionPlans } from 'utils/constants/subscriptionPlans'

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
 * @param tSubscription - Translation function for subscription locale
 * @param tOnboarding - Translation function for onboarding locale (optional)
 * @returns Array of feature descriptions
 */
export const getFeaturesWithInheritance = (planType: PlanType, tSubscription: TFunction, tOnboarding?: TFunction): string[] => {
  const baseFeatures = [...getSubscriptionPlans(tSubscription)[planType].features.items]
  const inheritedPlan = PLAN_INHERITANCE[planType]
  
  if (!inheritedPlan) {
    return baseFeatures
  }

  try {
    const t = tOnboarding || tSubscription
    const translatedText = t('SubscriptionPlans.inheritance', { plan: inheritedPlan })
    return [translatedText, ...baseFeatures]
  } catch (error) {
    console.error('Error in getFeaturesWithInheritance:', error)
    return [`Everything in ${inheritedPlan} plan`, ...baseFeatures]
  }
}

/**
 * Gets the continue button text for a selected plan
 * @param selectedPlan - The currently selected plan type
 * @param t - Translation function
 * @returns Formatted continue button text
 */
export const getContinueText = (selectedPlan: PlanType, t: TFunction): string => {
  try {
    const planTitle = getSubscriptionPlans(t)[selectedPlan].title
    return t('Plans.continueWithPlan', { plan: planTitle })
  } catch (error) {
    console.error('Error in getContinueText:', error)
    const planTitle = getSubscriptionPlans(t)[selectedPlan].title ?? selectedPlan
    return `Continue with ${planTitle} Plan`
  }
}