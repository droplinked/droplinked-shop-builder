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
  TrialMonths?: number;
  onSuccess?: () => void;
  successMessage?: string;
}

export default function PaymentModal({ isOpen, onClose, plan, TrialMonths, onSuccess, successMessage }: PaymentModalProps) { 
  const [isMobileOrTablet] = useMediaQuery('(max-width: 1024px)');
  const planDetail = subscriptionPlans[plan];

  if (isMobileOrTablet) {
    return <PaymentDrawer isOpen={isOpen} onClose={onClose} planDetail={planDetail} TrialMonths={TrialMonths} onSuccess={onSuccess} successMessage={successMessage} />;
  }

  return <BaseModal isOpen={isOpen} onClose={onClose} planDetail={planDetail} TrialMonths={TrialMonths} onSuccess={onSuccess} successMessage={successMessage} />;
}
