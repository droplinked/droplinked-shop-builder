import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import { TooltipLg } from 'assets/icons/Sign/Tooltip/TooltipLg'
import React from 'react'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import useAppStore from 'lib/stores/app/appStore'
import { shopUpdateService, shopInfoService } from 'lib/apis/shop/shopServices'
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
      
      // First fetch the latest shop data
      const latestShopData = await shopInfoService({ shopName: shop.shopName })
      const latestShop = latestShopData.data.data
      
      // Ensure paymentMethods is an array
      const currentPaymentMethods = Array.isArray(latestShop?.paymentMethods) 
        ? latestShop.paymentMethods 
        : []
      
      // Create updated payment methods array based on the latest shop data
      let updatedPaymentMethods = [...currentPaymentMethods]
      const upperType = title.toUpperCase()
      
      if (!isConnected) {
        // If activating Stripe or Paymob, deactivate the other one
        if (upperType === 'STRIPE' || upperType === 'PAYMOB') {
          updatedPaymentMethods = updatedPaymentMethods.map(item => ({
            ...item,
            isActive: (item.type === 'STRIPE' || item.type === 'PAYMOB') ?
              item.type === upperType : item.isActive
          }))
        }
        
        const existingIndex = updatedPaymentMethods.findIndex(item => item.type === upperType)
        if (existingIndex === -1) {
          updatedPaymentMethods.push({ type: upperType, isActive: true })
        } else {
          updatedPaymentMethods[existingIndex].isActive = true
        }
      } else {
        updatedPaymentMethods = updatedPaymentMethods.map(item =>
          item.type === upperType ? { ...item, isActive: false } : item
        )
      }
      
      // Create a minimal update object with only the necessary fields
      const updateData = {
        paymentMethods: updatedPaymentMethods,
        currencyAbbreviation: latestShop.currency?.abbreviation || 'USD'
      }
      
      // Update shop data via API
      await shopUpdateService(updateData)
      
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
