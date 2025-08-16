import { PlanType } from '../types/upgradePlan.types';

export const DEFAULT_TAB: PlanType = 'pro';

export const PLAN_TYPES: PlanType[] = ['pro', 'premium', 'enterprise'];

export const PLAN_TAB_IMAGES: Record<PlanType, string> = {
  pro: 'https://upload-file-droplinked.s3.amazonaws.com/2dc7029491ef0ccac24e452b3ec88f3490d32aaff497eefda1b4fec19c78c10d.png',
  premium: 'https://upload-file-droplinked.s3.amazonaws.com/24db15b442ff248aaccc52a0226c0f8b109d5e019872cf9bf969e41b6b759b50.png',
  enterprise: 'https://upload-file-droplinked.s3.amazonaws.com/1bd90198aa836f6cff7a5e65b62d31ef44faf67c28633392d435e77d714af921.png'
};

export const PLAN_TYPE_MAP: Record<PlanType, string> = {
  pro: 'BUSINESS',
  premium: 'BUSINESS_PRO',
  enterprise: 'ENTERPRISE'
};

export const ENTERPRISE_FIELDS = ['primaryGoal', 'organizationSize', 'featureDescription'] as const;

export const MOBILE_BREAKPOINT = '(max-width: 1024px)';