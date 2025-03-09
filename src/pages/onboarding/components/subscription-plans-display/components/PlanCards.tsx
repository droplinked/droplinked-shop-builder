import { Box } from '@chakra-ui/react';
import React from 'react';
import { subscriptionPlans } from 'utils/constants/subscriptionPlans';
import PlanCard from './PlanCard';

const PlanCards = () => {
  const planPositions = {
    STARTER: { top: '50%', left: '10%', transform: 'translate(-50%, -50%)' },
    BUSINESS: { top: '10%', left: '50%', transform: 'translate(-50%, -50%)' },
    ENTERPRISE: { top: '50%', right: '10%', transform: 'translate(50%, -50%)' },
    BUSINESS_PRO: { top: '90%', left: '50%', transform: 'translate(-50%, -50%)' }
  } as const;

  return (
    <>
      {(Object.entries(subscriptionPlans)).map(([key, plan]) => (
        <Box
          key={key}
          position="absolute"
          {...planPositions[key as keyof typeof planPositions]}
        >
          <PlanCard
            icon={<plan.icon color="white" />}
            title={plan.title}
            description={plan.description}
          />
        </Box>
      ))}
    </>
  );
};

export default PlanCards; 