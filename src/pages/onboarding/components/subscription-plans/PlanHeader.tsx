import { Box, Flex, Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import AppLabel from 'components/redesign/label/AppLabel'
import PlanPrice from 'components/redesign/plan-price/PlanPrice'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { t } from 'i18next'
import onboardingArLocale from 'locales/onboarding/ar.json'
import onboardingEnLocale from 'locales/onboarding/en.json'
import subscriptionArLocale from 'locales/subscription/ar.json'
import subscriptionEnLocale from 'locales/subscription/en.json'
import React from 'react'
import { SubscriptionPlan } from 'services/subscription/interfaces'
import { getSubscriptionPlans } from 'utils/constants/subscriptionPlans'

interface PlanHeaderProps {
  plan: SubscriptionPlan
  isPopular?: boolean
  isSelected?: boolean
}

function PlanHeader({ plan, isPopular, isSelected }: PlanHeaderProps) {
  const { t: tOnboarding } = useLocaleResources('onboarding', {
    en: onboardingEnLocale,
    ar: onboardingArLocale
  })
  const { t: tSubscription } = useLocaleResources('subscription', {
    en: subscriptionEnLocale,
    ar: subscriptionArLocale
  })

  const { title, description, icon: PlanIcon } = getSubscriptionPlans(tSubscription)[plan.type]

  return (
    <Box p={4}>
      <Flex gap={2} mb={4} alignItems="center" justifyContent="space-between" w="100%">
        <IconWrapper
          icon={<PlanIcon color={isSelected ? '#2BCFA1' : 'white'} />}
          bg={isSelected ? 'label.primary' : '#1b1b1b'}
          borderColor={isSelected ? '#2BCFA1' : 'neutral.gray.800'}
        />
        {isSelected ? <AppLabel variant="muted" size={'36'} status={'success'} text={tOnboarding('SubscriptionPlans.selected')} /> : null}
      </Flex>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={1}>
          {isPopular ? (
            <DotSeparatedList>
              <Text textColor="neutral.white" fontWeight="bold" fontSize="16px">
                {title}
              </Text>
              <Text color="text.primary">{tOnboarding('SubscriptionPlans.mostPopular')}</Text>
            </DotSeparatedList>
          ) : (
            <Text textColor="neutral.white" fontWeight="bold" fontSize="16px">
              {title}
            </Text>
          )}

          <Text color="text.subtext.placeholder.light" fontSize="sm">
            {description}
          </Text>
        </Flex>
        <PlanPrice plan={plan} mainFontSize={24} discountFontSize={18} />
      </Flex>
    </Box>
  )
}

export default PlanHeader
