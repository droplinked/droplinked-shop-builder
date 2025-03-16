import { Grid } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import PlanDurationRadioContainer from 'components/redesign/plan-duration-radio/PlanDurationRadioContainer';
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces';
import { getSubscriptionPlansService } from 'lib/apis/subscription/subscriptionServices';
import { OnboardingStepProps, PlanType } from 'pages/onboarding/types/onboarding';
import Loading from 'pages/subscription-plans/_components/plans/_components/loading/Loading';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import AppErrors from 'utils/constants/errors';
import { subscriptionPlans } from 'utils/constants/subscriptionPlans';
import ControlButtons from '../common/ControlButtons';
import OnboardingStepHeader from '../common/OnboardingStepHeader';
import PaymentModal from '../common/payment-modal/PaymentModal';
import SubscriptionPlanCard from './SubscriptionPlanCard';

const planFeatures = {
  STARTER: ['Analytics', 'Store designer', 'Shipment tracking', 'Product collections', 'Custom referral codes', 'Affiliate network access', 'Basic customer support'],
  BUSINESS: ['Everything in Starter', 'Advanced analytics', 'Priority support', 'Custom domain', 'Multiple admin accounts', 'API access', 'Enhanced security'],
  BUSINESS_PRO: ['Everything in Pro', 'Advanced integrations', 'Premium support', 'Custom branding', 'Team collaboration', 'Advanced security', 'API rate limits increase'],
  ENTERPRISE: ['Everything in Premium', 'Dedicated account manager', 'Custom integrations', 'SLA guarantees', 'Advanced security features', 'Custom reporting', '24/7 phone support']
};

function SubscriptionPlans({ onBack, onNext }: OnboardingStepProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('BUSINESS');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { isFetching, isError, data } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: () => getSubscriptionPlansService()
  });

  const getContinueText = () => {
    const planTitle = subscriptionPlans[selectedPlan].title || selectedPlan;
    return `Continue with ${planTitle} Plan`;
  };

  const handleNext = () => {
    if (!selectedPlan) return;
    setIsPaymentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
  };

  if (isFetching) return <Loading />;

  if (isError)
    return (
      <AppTypography fontSize={16} color={'red.400'}>
        {AppErrors.permission.subscriptionDataUnavailable}
      </AppTypography>
    );

  const plans: SubscriptionPlan[] = data.data;

  return (
    <>
      <OnboardingStepHeader heading="Plans" description="Choose from the different package options below." />
      <PlanDurationRadioContainer />
      <Grid templateColumns={'1fr'} gap={6} p={4}>
        {plans.map((plan) => {
          const planType = plan.type as PlanType;
          return (
            <SubscriptionPlanCard
              key={plan._id}
              plan={plan}
              features={planFeatures[planType]}
              isPopular={planType === 'BUSINESS'}
              isSelected={selectedPlan === plan.type}
              onSelect={() => setSelectedPlan(planType)}
            />
          );
        })}
      </Grid>
      <ControlButtons onBack={onBack} onSubmit={handleNext} continueText={getContinueText()} />
      <PaymentModal plan={selectedPlan} isOpen={isPaymentModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default SubscriptionPlans;
