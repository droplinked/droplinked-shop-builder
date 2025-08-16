import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { PlanType } from '../types/upgradePlan.types';
import { usePlanData } from '../hooks/usePlanData';

interface PlanTabItemProps {
  planType: PlanType;
  isActive: boolean;
  onClick: () => void;
  showIcon?: boolean;
}

export function PlanTabItem({ planType, isActive, onClick, showIcon = true }: PlanTabItemProps) {
  const plan = usePlanData(planType);

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