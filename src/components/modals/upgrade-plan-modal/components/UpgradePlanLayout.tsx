import React from 'react';
import { Flex, Grid, ModalBody } from '@chakra-ui/react';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import PlanTabs from './PlanTabContainer';
import { UpgradePlanContent } from './UpgradePlanContent';
import { PlanType } from '../types/upgradePlan.types';

interface UpgradePlanLayoutProps {
  activeTab: PlanType;
  onTabChange: (tab: PlanType) => void;
  onDataChange: (data: any) => void;
  onUpgrade: () => void;
  onClose: () => void;
  planInfo: any;
  features: any;
  isSubmitting: boolean;
  canActivateTrial: boolean;
  isCrossmint: boolean;
  isDrawer?: boolean;
}

export function UpgradePlanLayout({
  activeTab,
  onTabChange,
  onDataChange,
  onUpgrade,
  onClose,
  planInfo,
  features,
  isSubmitting,
  canActivateTrial,
  isCrossmint,
  isDrawer = false
}: UpgradePlanLayoutProps) {
  return (
    <Grid templateColumns={{ base: '1fr', lg: isDrawer ? '1fr' : '1fr 1fr' }}>
      <Flex flexDirection="column">
        <ModalHeader
          isCrossmint={isCrossmint}
          canActivateTrial={canActivateTrial}
          activeTab={activeTab}
        />
        <ModalBody padding="0px !important">
          <UpgradePlanContent
                      activeTab={activeTab}
                      isDrawer={isDrawer}
                      onDataChange={onDataChange}
                      planInfo={planInfo}
                      features={features} canActivateTrial={false}          />
          <ModalFooter
            isCrossmint={isCrossmint}
            canActivateTrial={canActivateTrial}
            activeTab={activeTab}
            onClose={onClose}
            onUpgrade={onUpgrade}
            isSubmitting={isSubmitting}
          />
        </ModalBody>
      </Flex>
      
      {/* Only show tabs on desktop modal */}
      {!isDrawer && (
        <Flex direction="column">
          <PlanTabs activeTab={activeTab} onTabChange={onTabChange} />
        </Flex>
      )}
    </Grid>
  );
}
