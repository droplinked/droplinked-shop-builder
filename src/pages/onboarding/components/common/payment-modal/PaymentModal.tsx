import { useMediaQuery } from '@chakra-ui/react';
import { PlanType } from 'pages/onboarding/types/onboarding';
import React from 'react';
import { subscriptionPlans } from 'utils/constants/subscriptionPlans';
import BaseModal from './BaseModal';
import PaymentDrawer from './PaymentDrawer';

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanType;
}

export default function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');
  const planDetail = subscriptionPlans[plan];

  if (isSmallerThan768) {
    return <PaymentDrawer isOpen={isOpen} onClose={onClose} planDetail={planDetail} />;
  }

  return <BaseModal isOpen={isOpen} onClose={onClose} planDetail={planDetail} />;
}
