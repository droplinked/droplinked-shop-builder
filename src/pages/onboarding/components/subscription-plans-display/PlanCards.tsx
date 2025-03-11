import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { subscriptionPlans } from 'utils/constants/subscriptionPlans';
import PlanCard from './PlanCard';

const PlanCards = () => {
  const planPositions = {
    STARTER: { top: '50%', left: '10%' },
    BUSINESS: { top: '10%', left: '50%' },
    ENTERPRISE: { top: '50%', right: '10%' },
    BUSINESS_PRO: { top: '90%', left: '50%' }
  } as const;

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {(Object.entries(subscriptionPlans)).map(([key, plan]) => (
        <motion.div
          key={key}
          style={{
            position: 'absolute',
            ...planPositions[key as keyof typeof planPositions],
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            rotate: -360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <PlanCard
            icon={<plan.icon color="white" />}
            title={plan.title}
            description={plan.description}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PlanCards;