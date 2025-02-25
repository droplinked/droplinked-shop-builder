import AppIcons from 'assets/icon/Appicons';
import { SubscriptionPlan } from './interfaces';

export const SUBSCRIPTION_STATUS_CONSTANTS = (actions: { STARTER: () => void }, daysLeft?: number): Record<string, SubscriptionPlan> => ({
  STARTER: {
    icon: AppIcons.StarterPlan,
    title: 'Starter',
    rightSide: {
      type: 'button',
      value: 'Upgrade',
      action: actions.STARTER,
      style: {
        display: 'flex',
        padding: '8px 12px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        borderRadius: '4px',
        background: 'rgba(43, 207, 161, 0.10)',
        color: '#2BCFA1',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: '12px',
        fontWeight: '500',
        lineHeight: '16px'
      }
    }
  },
  BUSINESS: {
    icon: AppIcons.ProPlan,
    title: 'Pro',
    rightSide: {
      type: 'text',
      value: `${daysLeft} days left` || '',
      style: {
        color: '#7B7B7B',
        fontFamily: 'Inter',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '20px',
        textAlign: 'left'
      }
    }
  },
  BUSINESS_PRO: {
    icon: AppIcons.PremiumPlan,
    title: 'Premium',
    rightSide: {
      type: 'text',
      value: `${daysLeft} days left` || '',
      style: {
        color: '#7B7B7B',
        fontFamily: 'Inter',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '20px',
        textAlign: 'left'
      }
    }
  },
  ENTERPRISE: {
    icon: AppIcons.EnterprisePlan,
    title: 'Enterprise',
    rightSide: {
      type: 'text',
      value: `${daysLeft} days left` || '',
      style: {
        color: '#7B7B7B',
        fontFamily: 'Inter',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '20px',
        textAlign: 'left'
      }
    }
  }
});
