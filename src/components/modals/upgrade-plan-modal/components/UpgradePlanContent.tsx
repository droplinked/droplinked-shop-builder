import { Box, Flex, Text } from '@chakra-ui/react';
import { AvailableoutlinedSm } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedSm';
import ExpandableInfo from 'components/modals/payment-modal/components/ExpandableInfo';
import React from 'react';
import { PlanType } from '../types/upgradePlan.types';
import BillingCycleSelector from './BillingCycleSelector';
import { EnterpriseContent } from './EnterpriseContent';

interface UpgradePlanContentProps {
  activeTab: PlanType;
  isDrawer?: boolean;
  onDataChange?: (data: {
    primaryGoal: string;
    organizationSize: string;
    featureDescription: string;
  }) => void;
  planInfo: {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
  };
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
  // Render the appropriate content based on active tab
  const renderContent = () => {
    if (activeTab === 'enterprise') {
      return (
        <EnterpriseContent 
          isDrawer={isDrawer} 
          onDataChange={onDataChange} 
        />
      );
    }
    return <BillingCycleSelector isDrawer={isDrawer} plan={activeTab} canActivateTrial={canActivateTrial} />;
  };

  return (
    <Flex direction="column" gap={4} background="neutral.gray.1000">
      {renderContent()}
      {isDrawer && (
        <ExpandableInfo
          icon={planInfo.icon}
          title={planInfo.title}
          description={planInfo.description}
        >
          <Box>
            {features.map((feature) => (
              <Flex key={feature} gap={2} mb={4} alignItems="center">
                <AvailableoutlinedSm color="white" />
                <Text textColor="neutral.white" flex={1} fontSize="sm">
                  {feature}
                </Text>
              </Flex>
            ))}
          </Box>
        </ExpandableInfo>
      )}
    </Flex>
  );
}
