import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { PlanTabProps } from '../types/upgradePlan.types';
import { PLAN_TYPES, PLAN_TAB_IMAGES } from '../constants';
import { PlanTabItem } from './PlanTabItem';

function TabList({ activeTab, onTabChange, isDrawer = false }: PlanTabProps) {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      alignItems="flex-start"
      gap={4}
      borderBottom={isDrawer ? "none" : "1px solid"}
      borderColor={isDrawer ? "transparent" : "text.subtext.placeholder.dark"}
      marginTop={6}
      marginBottom={isDrawer ? { base: -4, md: -12 } : 0}
      px={isDrawer ? 0 : 6}
    >
      {PLAN_TYPES.map((tab) => (
        <PlanTabItem
          key={tab}
          planType={tab}
          isActive={activeTab === tab}
          onClick={() => onTabChange(tab)}
          showIcon={true}
        />
      ))}
    </Flex>
  );
}

export function PlanTabHeaders(props: PlanTabProps) {
  return <TabList {...props} isDrawer={true} />;
}

export default function PlanTabs({ activeTab, onTabChange }: PlanTabProps) {
  return (
    <Flex
      display={{ base: 'none', lg: 'flex' }}
      flex="0 0 50%"
      bg="neutral.background"
      pt="48px"
      flexDirection="column"
    >
      <TabList activeTab={activeTab} onTabChange={onTabChange} />
      <Box flex="1" mt={6}>
        <Image src={PLAN_TAB_IMAGES[activeTab]} alt={activeTab} />
      </Box>
    </Flex>
  );
} 