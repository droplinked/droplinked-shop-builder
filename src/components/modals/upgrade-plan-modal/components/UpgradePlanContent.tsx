import { Flex } from '@chakra-ui/react';
import ExpandableInfo from 'components/modals/payment-modal/components/ExpandableInfo';
import React from 'react';
import { PlanType, PlanInfo, EnterpriseFormData } from '../types/upgradePlan.types';
import BillingCycleSelector from './BillingCycleSelector';
import { EnterpriseContent } from './EnterpriseContent';
import { FeatureList } from './FeatureList';

interface UpgradePlanContentProps {
  activeTab: PlanType;
  isDrawer?: boolean;
  onDataChange?: (data: EnterpriseFormData) => void;
  planInfo: PlanInfo;
  features: string[];
  canActivateTrial: boolean;
}

export function UpgradePlanContent({
  activeTab,
  isDrawer = false,
  onDataChange,
  planInfo,
  features,
  canActivateTrial
}: UpgradePlanContentProps) {
  const isEnterprise = activeTab === 'enterprise';

  return (
    <Flex direction="column" gap={4} background="neutral.gray.1000">
      {isEnterprise ? (
        <EnterpriseContent isDrawer={isDrawer} onDataChange={onDataChange} />
      ) : (
        <BillingCycleSelector 
          isDrawer={isDrawer} 
          plan={activeTab} 
          canActivateTrial={canActivateTrial} 
        />
      )}
      
      {isDrawer && (
        <ExpandableInfo
          icon={planInfo.icon}
          title={planInfo.title}
          description={planInfo.description}
        >
          <FeatureList features={features} />
        </ExpandableInfo>
      )}
    </Flex>
  );
}
