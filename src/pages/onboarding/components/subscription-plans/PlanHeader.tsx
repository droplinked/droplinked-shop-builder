import { Box, Flex, Text } from '@chakra-ui/react';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces';
import PlanPrice from 'pages/subscription-plans/_components/plans/_components/plan-price/PlanPrice';
import React from 'react';
import { subscriptionPlans } from 'utils/constants/subscriptionPlans';

interface PlanHeaderProps {
  plan: SubscriptionPlan;
  isPopular?: boolean;
  isSelected?: boolean;
}

const PlanHeader: React.FC<PlanHeaderProps> = ({ plan, isPopular, isSelected }) => {
  const planDetail = subscriptionPlans[plan.type];

  return (
    <Box p={4}>
      <Flex gap={2} mb={4}>
        <IconWrapper
          icon={<planDetail.icon color={isSelected ? '#2BCFA1' : 'white'} />}
          bg={isSelected ? 'label.success' : '#1b1b1b'}
          borderColor={isSelected ? '#2BCFA1' : 'neutral.gray.800'}
        />
      </Flex>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={1}>
          {isPopular ? (
            <DotSeparatedList>
              <Text textColor="neutral.white" fontWeight="bold" fontSize="16px">
                {planDetail.title}
              </Text>
              <Text color="text.primary">Most Popular</Text>
            </DotSeparatedList>
          ) : (
            <Text textColor="neutral.white" fontWeight="bold" fontSize="16px">
              {planDetail.title}
            </Text>
          )}

          <Text color="#b1b1b1" fontSize="sm">
            {planDetail.description}
          </Text>
        </Flex>
        <Box>
          <PlanPrice plan={plan} />
        </Box>
      </Flex>
    </Box>
  );
};

export default PlanHeader;
