import { Grid } from '@chakra-ui/react';
import React, { useState } from 'react';
import SubscriptionPlanCard from './SubscriptionPlanCard';
import { subscriptionPlans } from 'utils/constants/subscriptionPlans';

type PlanType = keyof typeof subscriptionPlans;

const planDetails = [
  {
    planType: 'STARTER' as const,
    price: 'Free',
    features: [
      'Analytics',
      'Store designer',
      'Shipment tracking',
      'Product collections',
      'Custom referral codes',
      'Affiliate network access',
      'Basic customer support'
    ]
  },
  {
    planType: 'BUSINESS' as const,
    price: '$29/month',
    isPopular: true,
    features: [
      'Everything in Starter',
      'Advanced analytics',
      'Priority support',
      'Custom domain',
      'Multiple admin accounts',
      'API access',
      'Enhanced security'
    ]
  },
  {
    planType: 'BUSINESS_PRO' as const,
    price: '$99/month',
    features: [
      'Everything in Pro',
      'Advanced integrations',
      'Premium support',
      'Custom branding',
      'Team collaboration',
      'Advanced security',
      'API rate limits increase'
    ]
  },
  {
    planType: 'ENTERPRISE' as const,
    price: 'Custom',
    features: [
      'Everything in Premium',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantees',
      'Advanced security features',
      'Custom reporting',
      '24/7 phone support'
    ]
  }
];

function SubscriptionPlan() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  return (
    <>
    <Grid templateColumns={'1fr'} gap={6} p={4}>
      {planDetails.map((plan) => (
        <SubscriptionPlanCard
          key={plan.planType}
          planType={plan.planType}
          price={plan.price}
          features={plan.features}
          isPopular={plan.isPopular}
          isSelected={selectedPlan === plan.planType}
          onSelect={() => setSelectedPlan(plan.planType)}
        />
      ))}
    </Grid>
    </>
   
  );
}

export default SubscriptionPlan;
