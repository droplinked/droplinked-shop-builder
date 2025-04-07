import { useMediaQuery } from '@chakra-ui/react';
import { PlanType } from 'pages/onboarding/types/onboarding';
import React from 'react';
import { subscriptionPlans } from 'utils/constants/subscriptionPlans';
import PaymentDrawer from './layout/PaymentDrawer';
import BaseModal from './layout/BaseModal';

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanType;
  clientSecret: string;
}

export default function PaymentModal({ isOpen, onClose, plan, clientSecret }: PaymentModalProps) {
  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');
  const planDetail = subscriptionPlans[plan];

  if (isSmallerThan768) {
    return <PaymentDrawer isOpen={isOpen} onClose={onClose} planDetail={planDetail} clientSecret={clientSecret} />;
  }

  return <BaseModal isOpen={isOpen} onClose={onClose} planDetail={planDetail} clientSecret={clientSecret} />;
}
