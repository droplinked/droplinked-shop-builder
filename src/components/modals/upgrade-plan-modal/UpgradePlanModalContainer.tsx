import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { PlanModalProps } from './types/upgradePlan.types';
import { MOBILE_BREAKPOINT } from './constants';
import UpgradePlanDrawer from './container/UpgradePlanDrawer';
import UpgradePlanModal from './container/UpgradePlanModal';

export default function UpgradePlanModalContainer(props: PlanModalProps) {
  const [isMobileOrTablet] = useMediaQuery(MOBILE_BREAKPOINT);

  return isMobileOrTablet ? (
    <UpgradePlanDrawer {...props} />
  ) : (
    <UpgradePlanModal {...props} />
  );
}
