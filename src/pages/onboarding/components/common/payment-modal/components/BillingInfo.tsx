import React from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react';
import { InformationSm } from 'assets/icons/Sign/Information/InformationSm';
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces';
import useSubscriptionPlanStore from 'stores/subscription-plan.ts/subscriptionPlanStore';
import BillingSummary from './BillingSummary';
import PlanCard from './PlanCard';

interface BillingInfoProps {
  planDetail: SubscriptionPlan;
}

const BillingInfo = ({ planDetail }: BillingInfoProps) => {
  const { preferredPlanDuration, selectedPlan } = useSubscriptionPlanStore(state => ({
    preferredPlanDuration: state.preferredPlanDuration,
    selectedPlan: state.selectedPlan
  }));
  
  // Get the target price based on plan duration
  const targetPrice = selectedPlan && Array.isArray(selectedPlan.price) && typeof selectedPlan.price[0] !== 'string' 
    ? (selectedPlan.price as any[]).find(price => price.month === preferredPlanDuration.month)
    : null;
    
  const originalPrice = targetPrice?.price ? parseFloat(targetPrice.price) : 0;
  const discount = targetPrice?.discount || 0;
  const subscriptionCost = Number((originalPrice * (1 - discount / 100)).toFixed(2));
  const tax = 0;
  const total = (subscriptionCost + tax).toFixed(2);

  return (
    <VStack spacing={4} alignItems="flex-start">
      <PlanCard plan={planDetail} /> 
      <BillingSummary 
        subscriptionCost={subscriptionCost} 
        tax={tax} 
        total={`$${total}`} 
      />
      <Flex w="473px" alignItems="center" gap={1}>
        <InformationSm color="#7b7b7b" />
        <Text flex={1} textAlign="center" color="#7b7b7b" fontSize="xs" fontFamily="Inter" lineHeight="none">
          Your account will be automatically charged for renewal once the free trial ends.
        </Text>
      </Flex>
    </VStack>
  );
};

export default BillingInfo; 