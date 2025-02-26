// Utility functions for handling subscription plan information and icons.
import AppIcons from 'assest/icon/Appicons';

 // Maps subscription plans to their respective icons and descriptions
export const subscriptionPlans: Record<
  string,
  {
    icon: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string;
      }
    >;
    title: string;
    description: string;
  }
> = {
  STARTER: { icon: AppIcons.StarterPlan, title: 'Starter', description: 'For individuals or companies just getting started.' },
  BUSINESS: { icon: AppIcons.ProPlan, title: 'Pro', description: 'For small businesses and teams ready to grow.' },
  BUSINESS_PRO: { icon: AppIcons.PremiumPlan, title: 'Premium', description: 'Designed for large businesses needing comprehensive solutions at scale.' },
  ENTERPRISE: { icon: AppIcons.EnterprisePlan, title: 'Enterprise', description: 'Contact us to explore integration.' }
};

// Retrieves the icon and title for a specific subscription plan
export const getSubscriptionPlanIcon = (type: string) => {
  switch (type) {
    case 'ENTERPRISE':
      return { icon: AppIcons.EnterprisePlan, title: 'Enterprise' };
    case 'BUSINESS_PRO':
      return { icon: AppIcons.PremiumPlan, title: 'Premium' };
    case 'BUSINESS':
      return { icon: AppIcons.ProPlan, title: 'Pro' };
    case 'STARTER':
      return { icon: AppIcons.StarterPlan, title: 'Starter' };
    default:
      break;
  }
};
