import { Flex, Text } from '@chakra-ui/react'
import { StripeLogo } from 'assets/logo/NetworkAndTokens/Stripe/StripeLogo'
import { PaymobLogo } from 'assets/logo/NetworkAndTokens/Paymob/PaymobLogo'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'
import PaymentProviderCard from './PaymentProviderCard'

const providers = [
  {
    title: 'Stripe',
    tooltip: 'Connect a Stripe account to receive deposits directly into an existing account.',
    icon: <StripeLogo />
  },
  // {
  //   title: 'Paymob',
  //   tooltip: 'Connect a Paymob account to receive deposits directly into an existing account.',
  //   icon: <PaymobLogo />
  // }
]

function FinancialServices() {
  return (
    <Flex direction="column" gap={4}>
      <Text color={'text.white'}>Financial Services</Text>
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