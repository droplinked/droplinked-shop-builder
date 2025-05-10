import { Box, Flex, Text } from '@chakra-ui/react'
import { AvailableoutlinedSm } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedSm'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import React, { useState } from 'react'
import ExpandButton from './ExpandButton'
import PlanHeader from './PlanHeader'
import { planDurations } from 'lib/stores/subscription-plan.ts/subscriptionPlanStore'
import { PlanType } from 'pages/onboarding/types/onboarding'

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan
  features: string[]
  isPopular?: boolean
  isSelected?: boolean
  onSelect?: (planType: PlanType) => void
  planDuration: typeof planDurations[0]
}

function SubscriptionPlanCard({ plan, features, isPopular, isSelected, onSelect, planDuration }: SubscriptionPlanCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const handleSelect = () => {
    if (onSelect) {
      const planType = plan.type as PlanType;
      onSelect(planType);
      
      // For ENTERPRISE, also open email page
      if (planType === 'ENTERPRISE') {
        window.open('mailto:Support@droplinked.com', '_blank');
      }
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderColor={isSelected ? 'main.primary' : 'neutral.gray.800'}
      borderRadius="16px"
      data-state="Expanded"
      bg={isSelected ? 'rgba(43, 207, 161, 0.10)' : 'transparent'}
      cursor="pointer"
      onClick={handleSelect}
      transition="all 0.2s"
    >
      <Flex direction="column">
        <PlanHeader plan={plan} isPopular={isPopular} isSelected={isSelected} />
        <Box borderBottom="1px solid" borderColor="neutral.gray.800" />

        {isExpanded ? (
          <Box p={4}>
            {features.map((feature) => (
              <Flex key={feature} gap={2} mb={4} alignItems="center">
                <AvailableoutlinedSm color="white" />
                <Text textColor="neutral.white" flex={1} fontSize="sm">
                  {feature}
                </Text>
              </Flex>
            ))}
          </Box>
        ) : null}

        <Box borderBottom="1px solid" borderColor={isSelected ? 'main.primary' : 'neutral.gray.800'} />

        <ExpandButton isExpanded={isExpanded} isSelected={isSelected} onToggle={() => setIsExpanded(!isExpanded)} />
      </Flex>
    </Box>
  )
}

export default SubscriptionPlanCard
