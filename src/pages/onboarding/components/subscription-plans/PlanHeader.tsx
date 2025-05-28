import { Box, Flex, Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import AppLabel from 'components/redesign/label/AppLabel'
import PlanPrice from 'components/redesign/plan-price/PlanPrice'
import { SubscriptionPlan } from 'services/subscription/interfaces'
import React, { useRef } from 'react'
import { subscriptionPlans } from 'utils/constants/subscriptionPlans'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import onboardingEnLocale from 'locales/onboarding/en.json'
import onboardingArLocale from 'locales/onboarding/ar.json'
import subscriptionEnLocale from 'locales/subscription/en.json'
import subscriptionArLocale from 'locales/subscription/ar.json'

interface PlanHeaderProps {
  plan: SubscriptionPlan
  isPopular?: boolean
  isSelected?: boolean
}

function PlanHeader({ plan, isPopular, isSelected }: PlanHeaderProps) {
  const descriptionRef = useRef<HTMLDivElement>(null)
  const { t: tOnboarding } = useLocaleResources('onboarding', {
    en: onboardingEnLocale,
    ar: onboardingArLocale
  })
  const { t: tSubscription } = useLocaleResources('subscription', {
    en: subscriptionEnLocale,
    ar: subscriptionArLocale
  })

  const { description, icon: PlanIcon } = subscriptionPlans[plan.type]

  return (
    <Box p={4}>
      <Flex gap={2} mb={4} alignItems="center" justifyContent="space-between" w="100%">
        <IconWrapper
          icon={<PlanIcon color={isSelected ? '#2BCFA1' : 'white'} />}
          bg={isSelected ? 'label.primary' : '#1b1b1b'}
          borderColor={isSelected ? '#2BCFA1' : 'neutral.gray.800'}
        />
        {isSelected ? <AppLabel variant="muted" size={'36'} status={'success'} text={tOnboarding('subscriptionPlans.selected')} /> : null}
      </Flex>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={1}>
          {isPopular ? (
            <DotSeparatedList>
              <Text textColor="neutral.white" fontWeight="bold" fontSize="16px">
                {tSubscription(subscriptionPlans[plan.type].title)}
              </Text>
              <Text color="text.primary">{tOnboarding('subscriptionPlans.mostPopular')}</Text>
            </DotSeparatedList>
          ) : (
            <Text textColor="neutral.white" fontWeight="bold" fontSize="16px">
              {tSubscription(subscriptionPlans[plan.type].title)}
            </Text>
          )}

          <Text color="text.subtext.placeholder.light" fontSize="sm">
            {tSubscription(description)}
          </Text>
        </Flex>
        <PlanPrice plan={plan} mainFontSize={24} discountFontSize={18} />
      </Flex>
    </Box>
  )
}

export default PlanHeader
