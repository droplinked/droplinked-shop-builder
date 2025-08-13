import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { PlanType } from '../types/upgradePlan.types';
import { getSubscriptionPlans } from 'data/subscriptionPlans';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localAr from 'locales/subscription/ar.json';
import localEn from 'locales/subscription/en.json';

interface PlanTabProps {
  planType: PlanType;
  isActive: boolean;
  onClick: () => void;
  showIcon?: boolean;
}

export function PlanTabItem({ planType, isActive, onClick, showIcon = true }: PlanTabProps) {
  const { t } = useLocaleResources('subscription', {
    en: localEn,
    ar: localAr
  });

  const subscriptionPlans = getSubscriptionPlans(t);
  
  // Map plan types to subscription plan keys
  const planTypeMap: Record<PlanType, keyof typeof subscriptionPlans> = {
    pro: 'BUSINESS',
    premium: 'BUSINESS_PRO',
    enterprise: 'ENTERPRISE'
  };

  const planKey = planTypeMap[planType];
  const plan = subscriptionPlans[planKey];

  return (
    <Flex
      flex="1"
      borderBottom="1px solid"
      borderColor={isActive ? 'white' : 'transparent'}
      justifyContent="center"
      alignItems="center"
      gap={2}
      py={3}
      cursor="pointer"
      onClick={onClick}
    >
      {showIcon && (
        <Box display={{ base: 'none', md: 'block' }}>
          {React.createElement(plan.icon, {
            color: isActive ? 'white' : '#7B7B7B'
          })}
        </Box>
      )}
      <Text 
        color={isActive ? 'white' : 'text.subtext.placeholder.dark'} 
        fontSize="sm" 
        fontWeight={isActive ? 'medium' : 'normal'} 
        lineHeight="tight"
      >
        {plan.title}
      </Text>
    </Flex>
  );
} 