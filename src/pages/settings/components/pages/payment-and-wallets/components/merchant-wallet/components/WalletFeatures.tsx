import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { Refresh1Sm } from 'assets/icons/Action/Refresh1/Refresh1Sm'
import { DashboardSm } from 'assets/icons/System/Dashboard/DashboardSm'
import { ShieldSm } from 'assets/icons/System/Shield/ShieldSm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

const features = [
  {
    icon: ShieldSm,
    labelKey: 'MerchantWallet.features.secure',
  },
  {
    icon: DashboardSm,
    labelKey: 'MerchantWallet.features.instant',
  },
  {
    icon: Refresh1Sm,
    labelKey: 'MerchantWallet.features.automaticConversion',
  },
]

export default function WalletFeatures() {
  const { t } = useLocaleResources('settings')

  return (
    <Flex flexWrap="wrap" columnGap={9} rowGap={4}>
      {features.map(({ icon: Icon, labelKey }) => (
        <HStack key={labelKey}>
          <Box p="2" bg="#2bcea11a" borderRadius="50px">
            <Icon color="#2BCFA1" />
          </Box>
          <Text color="white" fontSize="sm">
            {t(labelKey)}
          </Text>
        </HStack>
      ))}
    </Flex>
  )
}
