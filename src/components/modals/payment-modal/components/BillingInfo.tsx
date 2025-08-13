import { Flex, Text, VStack } from '@chakra-ui/react';
import { InformationSm } from 'assets/icons/Sign/Information/InformationSm';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { SubscriptionPlan } from 'services/subscription/interfaces';
import BillingSummary from './BillingSummary';
import PlanCard from './PlanCard';

interface BillingInfoProps {
  planDetail: SubscriptionPlan;
  actualPaymentAmount?: number;
}

const BillingInfo = ({ planDetail, actualPaymentAmount }: BillingInfoProps) => {
  const { t } = useLocaleResources('subscription');
  
  const subscriptionCost = actualPaymentAmount?.toFixed(2);
  const total = actualPaymentAmount?.toFixed(2);

  return (
    <VStack spacing={4} alignItems="flex-start">
      <PlanCard plan={planDetail} /> 
      <BillingSummary 
        subscriptionCost={subscriptionCost} 
        total={total}
      />
      <Flex w="473px" alignItems="center" gap={1}>
        <InformationSm color="#7b7b7b" />
        <Text flex={1} textAlign="center" color="#7b7b7b" fontSize="xs" fontFamily="Inter" lineHeight="none">
          {t('BillingInfo.autoRenewalInfo')}
        </Text>
      </Flex>
    </VStack>
  );
};

export default BillingInfo; 