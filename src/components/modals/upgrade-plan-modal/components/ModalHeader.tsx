import { PriceplanLg } from 'assets/icons/Finance/PricePlan/PriceplanLg';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { PlanHeaderProps } from '../types/upgradePlan.types';
import { getUpgradePlanTexts } from '../utils/upgradePlanUtils';

export default function PlanHeader({ isCrossmint, canActivateTrial, activeTab }: PlanHeaderProps) {
  const { t } = useLocaleResources('common');
  
  // Use the simplified utility
  const { title, description } = getUpgradePlanTexts(activeTab, isCrossmint, canActivateTrial, t);

  return (
    <ModalHeaderData
      icon={<PriceplanLg color="white" />}
      title={title}
      description={description}
      modalHeaderProps={{
        paddingBlock: '48px !important',
        borderBottom: '1px solid #292929'
      }}
    />
  );
}
