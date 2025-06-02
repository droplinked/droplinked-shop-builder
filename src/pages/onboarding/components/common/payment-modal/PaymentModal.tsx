import { useMediaQuery } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { PlanType } from 'pages/onboarding/types/onboarding';
import React from 'react';
import { getSubscriptionPlans } from 'utils/constants/subscriptionPlans';
import BaseModal from './layout/BaseModal';
import PaymentDrawer from './layout/PaymentDrawer';

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanType;
  clientSecret: string;
}

export default function PaymentModal({ isOpen, onClose, plan, clientSecret }: PaymentModalProps) {
  const [isMobileOrTablet] = useMediaQuery('(max-width: 1024px)');
  const { t } = useLocaleResources('subscription');
  
  const planDetail = getSubscriptionPlans(t)[plan];

  if (isMobileOrTablet) {
    return <PaymentDrawer isOpen={isOpen} onClose={onClose} planDetail={planDetail} clientSecret={clientSecret} />;
  }

  return <BaseModal isOpen={isOpen} onClose={onClose} planDetail={planDetail} clientSecret={clientSecret} />;
}
