import { Box, Flex, Text } from '@chakra-ui/react'
import { AvailableoutlinedSm } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedSm'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import React, { useState } from 'react'
import ExpandButton from './ExpandButton'
import PlanHeader from './PlanHeader'

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan
  features: string[]
  isPopular?: boolean
  isSelected?: boolean
  onSelect?: () => void
}

function SubscriptionPlanCard({ plan, features, isPopular, isSelected, onSelect }: SubscriptionPlanCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Box
      borderWidth="1px"
      borderColor={isSelected ? 'primary.default' : 'neutral.gray.800'}
      borderRadius="16px"
      data-state="Expanded"
      bg={isSelected ? 'rgba(43, 207, 161, 0.10)' : 'transparent'}
      cursor="pointer"
      onClick={onSelect}
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

        <Box borderBottom="1px solid" borderColor={isSelected ? 'primary.default' : 'neutral.gray.800'} />

        <ExpandButton isExpanded={isExpanded} isSelected={isSelected} onToggle={() => setIsExpanded(!isExpanded)} />
      </Flex>
    </Box>
  )
}

export default SubscriptionPlanCard
