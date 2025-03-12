import { Box, Flex } from '@chakra-ui/react'
import { SubOptionId, SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import React, { useState } from 'react'
import ExpandButton from './ExpandButton'
import PlanFeatures from './PlanFeatures'
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

  // Convert features to string array if they are SubOptionId[]
  const featureStrings = Array.isArray(features) && features.length > 0 && typeof features[0] === 'object'
    ? (features as unknown as SubOptionId[]).map(feature => feature.title)
    : features as string[];

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

        {isExpanded && <PlanFeatures features={featureStrings} />}

        <Box borderBottom="1px solid" borderColor={isSelected ? 'primary.default' : 'neutral.gray.800'} />

        <ExpandButton isExpanded={isExpanded} isSelected={isSelected} onToggle={() => setIsExpanded(!isExpanded)} />
      </Flex>
    </Box>
  );
}

export default SubscriptionPlanCard
