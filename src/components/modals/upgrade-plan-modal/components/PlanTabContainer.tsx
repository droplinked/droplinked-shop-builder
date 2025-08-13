import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { PlanTabProps, PlanType } from '../types/upgradePlan.types';
import { PlanTabItem } from './PlanTabItem';

const PLAN_TYPES: PlanType[] = ['pro', 'premium', 'enterprise'];

const PLAN_TAB_IMAGES: Record<PlanType, string> = {
  pro: 'https://upload-file-droplinked.s3.amazonaws.com/2dc7029491ef0ccac24e452b3ec88f3490d32aaff497eefda1b4fec19c78c10d.png',
  premium: 'https://upload-file-droplinked.s3.amazonaws.com/24db15b442ff248aaccc52a0226c0f8b109d5e019872cf9bf969e41b6b759b50.png',
  enterprise: 'https://upload-file-droplinked.s3.amazonaws.com/1bd90198aa836f6cff7a5e65b62d31ef44faf67c28633392d435e77d714af921.png'
};

export function PlanTabHeaders({ activeTab, onTabChange, isDrawer = false }: PlanTabProps) {
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      alignItems="flex-start"
      gap={4}
      borderBottom={isDrawer ? "none" : "1px solid"}
      borderColor={isDrawer ? "transparent" : "text.subtext.placeholder.dark"}
      marginTop={6}
      marginLeft={isDrawer ? 0 : { base: -4, md: -12 }}
      marginRight={isDrawer ? 0 : { base: -4, md: -12 }}
      marginBottom={isDrawer ? { base: -4, md: -12 } : 0}
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

export default function PlanTabs({ activeTab, onTabChange }: PlanTabProps) {
  return (
    <Flex
      display={{ base: 'none', lg: 'flex' }}
      flex="0 0 50%"
      bg="neutral.background"
      pt="48px"
      flexDirection="column"
    >
      <Flex
        width="100%"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={4}
        px={6}
        borderBottom="1px solid"
        borderColor="text.subtext.placeholder.dark"
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

      <Box flex="1" mt={6}>
        <Image src={PLAN_TAB_IMAGES[activeTab]} alt={activeTab} />
      </Box>
    </Flex>
  );
} 