import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import { TooltipLg } from 'assets/icons/Sign/Tooltip/TooltipLg'
import React from 'react'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'

interface PaymentProviderCardProps {
  icon: React.ReactNode
  title: string
  tooltip: string
}

function PaymentProviderCard({ icon, title, tooltip }: PaymentProviderCardProps) {

  
  const handleConnect = async () => {

  }
  
  return (
    <HStack p="4" spacing="4">
      <IconWrapper icon={icon} />
      <Flex flex="1" align="center" gap="2">
        <Text color="white" fontSize="base" fontWeight="medium">
          {title}
        </Text>
        <AppTooltip label={tooltip}>
          <Box cursor="pointer">
            <TooltipLg color="#292929" />
          </Box>
        </AppTooltip>
      </Flex>
      <Text 
        color={'text.primary'} 
        cursor="pointer"
        onClick={handleConnect}
      >
         Connect
      </Text>
    </HStack>
  )
}

export default PaymentProviderCard
