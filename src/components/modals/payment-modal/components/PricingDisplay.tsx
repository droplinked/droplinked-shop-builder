import { Text } from '@chakra-ui/react';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import React from 'react';

const PricingDisplay: React.FC<{
  subscriptionCost: string;
  isFromCrossmint: boolean;
  canActivateTrial: boolean;
  t: (key: string) => string;
}> = ({ subscriptionCost, isFromCrossmint, canActivateTrial, t }) => {
  const renderFreePeriodPricing = (freePeriodText: string) => (
    <DotSeparatedList>
      <Text>{freePeriodText}</Text>
      <Text>
        ${subscriptionCost}
        {t('UpgradePlanModal.BillingOptionCard.monthAfterwards')}
      </Text>
    </DotSeparatedList>
  );

  if (isFromCrossmint) {
    return renderFreePeriodPricing(t('BillingSummary.threeMonthFree'));
  }

  if (canActivateTrial) {
    return renderFreePeriodPricing(t('BillingSummary.firstMonthFree'));
  }

  return (
    <>
      {subscriptionCost}
      <Text color="#868686" fontSize="base">
        {t('BillingSummary.usd')}
      </Text>
    </>
  );
};

export default PricingDisplay;
