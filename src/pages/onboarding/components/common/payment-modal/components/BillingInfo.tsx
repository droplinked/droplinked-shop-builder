import React from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react';
import { InformationSm } from 'assets/icons/Sign/Information/InformationSm';
import BillingSummary from './BillingSummary';
import PlanCard from './PlanCard';

interface BillingInfoProps {
  planDetail: any;
}

const BillingInfo = ({ planDetail }: BillingInfoProps) => {
  console.log('planDetail', planDetail)

  return (
    <VStack spacing={4} alignItems="flex-start">
      <PlanCard plan={planDetail} /> 
      <BillingSummary subscriptionCost={179} tax={0} total="Free" />
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