import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import { TooltipLg } from 'assets/icons/Sign/Tooltip/TooltipLg'
import React from 'react'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import useAppStore from 'lib/stores/app/appStore'
import { shopUpdateService } from 'lib/apis/shop/shopServices'
import useAppToast from 'hooks/toast/useToast'

interface PaymentProviderCardProps {
  icon: React.ReactNode
  title: string
  tooltip: string
}

function PaymentProviderCard({ icon, title, tooltip }: PaymentProviderCardProps) {
  const { shop, updateState } = useAppStore()
  const { showToast } = useAppToast()
  const [isLoading, setIsLoading] = React.useState(false)
  
  // Check if this payment method is already connected
  const isConnected = shop?.paymentMethods?.some(
    (method) => method.type === title.toUpperCase() && method.isActive
  )
  
  const handleConnect = async () => {
    try {
      setIsLoading(true)
      
      // Create updated payment methods array
      let updatedPaymentMethods = [...(shop?.paymentMethods || [])]
      
      if (!isConnected) {
        // Connecting: turn off all others and activate this one
        updatedPaymentMethods = updatedPaymentMethods.map((item) => ({
          ...item,
          isActive: item.type === title.toUpperCase()
        }))
        
        // Add the new provider if it doesn't exist
        if (!updatedPaymentMethods.some((item) => item.type === title.toUpperCase())) {
          updatedPaymentMethods.push({ type: title.toUpperCase(), isActive: true })
        }
      } else {
        // Disconnecting: just deactivate this one
        updatedPaymentMethods = updatedPaymentMethods.map((item) =>
          item.type === title.toUpperCase()
            ? { ...item, isActive: false }
            : item
        )
      }
      
      // Update shop data via API
      await shopUpdateService({
        ...shop,
        paymentMethods: updatedPaymentMethods
      })
      
      // Update local state
      updateState({
        key: 'shop',
        params: {
          ...shop,
          paymentMethods: updatedPaymentMethods
        }
      })
    } catch (error) {
      showToast({
        message: `Failed to ${isConnected ? 'disconnect' : 'connect'} ${title}`,
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
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
        color={isConnected ? 'text.error' : 'text.primary'} 
        cursor="pointer"
        onClick={handleConnect}
      >
        {isLoading ? '...' : (isConnected ? 'disconnect' : 'connect')}
      </Text>
    </HStack>
  )
}

export default PaymentProviderCard
