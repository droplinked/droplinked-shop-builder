import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { PlanModalProps } from './types/upgradePlan.types';
import UpgradePlanDrawer from './container/UpgradePlanDrawer';
import BaseModal from './container/UpgradePlanModal';

export default function UpgradePlanModalContainer({
  isOpen,
  onClose,
  initialActiveTab
}: PlanModalProps) {
  const [isMobileOrTablet] = useMediaQuery('(max-width: 1024px)');

  if (isMobileOrTablet) {
    return (
      <UpgradePlanDrawer
        isOpen={isOpen}
        onClose={onClose}
        initialActiveTab={initialActiveTab}
      />
    );
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      initialActiveTab={initialActiveTab}
    />
  );
}
