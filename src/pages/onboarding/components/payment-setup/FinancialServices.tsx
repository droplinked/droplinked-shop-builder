import { Flex, Text } from '@chakra-ui/react'
import { StripeLogo } from 'assets/logo/NetworkAndTokens/Stripe/StripeLogo'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import PaymentProviderCard from './PaymentProviderCard'

function FinancialServices() {
  const { t } = useLocaleResources('onboarding')

  const providers = [
    {
      title: 'Stripe',
      tooltip: t('PaymentSetup.financialServices.stripe.tooltip'),
      icon: <StripeLogo />
    },
    // {
    //   title: 'Paymob',
    //   tooltip: t('paymentSetup.financialServices.paymob.tooltip'),
    //   icon: <PaymobLogo />
    // }
  ]

  return (
    <Flex direction="column" gap={4}>
      <Text color={'text.white'}>{t('PaymentSetup.financialServices.title')}</Text>
      <RuledGrid columns={1} borderRadius="8px">
        {providers.map((provider, index) => (
          <PaymentProviderCard
            key={index}
            icon={provider.icon}
            title={provider.title}
            tooltip={provider.tooltip}
          />
        ))}
      </RuledGrid>
    </Flex>
  )
}

export default FinancialServices 