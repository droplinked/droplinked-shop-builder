import { Box, Flex, Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import PlanPrice from 'components/redesign/plan-price/PlanPrice'
import React from 'react'
import { subscriptionPlans } from 'utils/constants/subscriptionPlans'
import AppLabel from 'components/redesign/label/AppLabel'

interface PlanHeaderProps {
  plan: SubscriptionPlan
  isPopular?: boolean
  isSelected?: boolean
}

function PlanHeader({ plan, isPopular, isSelected}: PlanHeaderProps) {
  const planDetail = subscriptionPlans[plan.type]

  return (
    <Box p={4}>
      <Flex gap={2} mb={4} alignItems="center" justifyContent="space-between" w="100%">
        <IconWrapper
          icon={<planDetail.icon color={isSelected ? '#2BCFA1' : 'white'} />}
          bg={isSelected ? 'label.success' : '#1b1b1b'}
          borderColor={isSelected ? '#2BCFA1' : 'neutral.gray.800'}
        />
        {isSelected ? <AppLabel variant="muted" size={'36'} status={'success'} text="Selected" /> : null}
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

          <Text color="text.subtext.placeholder.light" fontSize="sm">
            {planDetail.description}
          </Text>
        </Flex>
          <PlanPrice plan={plan} mainFontSize={24} discountFontSize={18} />
      </Flex>
    </Box>
  )
}

export default PlanHeader
