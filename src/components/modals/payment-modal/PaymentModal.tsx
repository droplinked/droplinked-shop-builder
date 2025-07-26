import { useMediaQuery } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { PlanType } from 'pages/onboarding/types/onboarding';
import React from 'react';
import { getSubscriptionPlans } from 'data/subscriptionPlans';
import BaseModal from './layout/BaseModal';
import PaymentDrawer from './layout/PaymentDrawer';

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanType;
  TrialMonths?: number;
  onSuccess?: () => void;
  successMessage?: string;
}

export default function PaymentModal({ isOpen, onClose, plan, TrialMonths, onSuccess, successMessage }: PaymentModalProps) { 
  const [isMobileOrTablet] = useMediaQuery('(max-width: 1024px)');
  const { t } = useLocaleResources('subscription');
  
  const planDetail = getSubscriptionPlans(t)[plan];

  if (isMobileOrTablet) {
    return <PaymentDrawer isOpen={isOpen} onClose={onClose} planDetail={planDetail} TrialMonths={TrialMonths} onSuccess={onSuccess} successMessage={successMessage} />;
  }

  return <BaseModal isOpen={isOpen} onClose={onClose} planDetail={planDetail} TrialMonths={TrialMonths} onSuccess={onSuccess} successMessage={successMessage} />;
}
