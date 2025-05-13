import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import useSubscriptionPlanStore from 'lib/stores/subscription-plan.ts/subscriptionPlanStore';

interface BillingSummaryProps {
  subscriptionCost: number;
  tax: number;
  total: string;
}

const BillingSummary: React.FC<BillingSummaryProps> = ({ subscriptionCost, tax, total }) => {
  const preferredPlanDuration = useSubscriptionPlanStore(state => state.preferredPlanDuration);
  
  const getBillingCycleText = () => {
    if (preferredPlanDuration.month === 1) return 'Monthly';
    if (preferredPlanDuration.month === 12) return 'Annual';
    if (preferredPlanDuration.month === 60) return '5-Year';
    return `${preferredPlanDuration.month} Months`;
  };

  return (
    <Box borderRadius="lg" border="1px solid" borderColor="#282828" display="flex" flexDirection="column" alignItems="flex-start" overflow="hidden" width="100%">
      <Box p={6} display="flex" flexDirection="column" gap={4} width="100%">
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Text color="white" fontSize="base">
            Billing Cycle
          </Text>
          <Text color="white" fontSize="base" fontWeight="medium">
            {getBillingCycleText()}
          </Text>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Text color="white" fontSize="base">
            Subscription cost
          </Text>
          <Flex alignItems="center" gap={1}>
            <Text color="white" fontSize="base" fontWeight="medium">
              ${subscriptionCost}
            </Text>
            <Text color="#868686" fontSize="base">
              USD
            </Text>
          </Flex>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Text color="white" fontSize="base">
            Tax
          </Text>
          <Flex alignItems="center" gap={1}>
            <Text color="white" fontSize="base" fontWeight="medium">
              ${tax}
            </Text>
            <Text color="#868686" fontSize="base">
              USD
            </Text>
          </Flex>
        </Flex>
      </Box>

      <Box width="100%" height="1px" borderTop="1px solid" borderColor="#282828" />

      <Flex p={6} justifyContent="space-between" alignItems="center" width="100%">
        <Text color="white" fontSize="base">
          Total
        </Text>
        <Flex alignItems="center" gap={1}>
          <Text color="white" fontSize="base" fontWeight="medium">
            {total}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default BillingSummary; 