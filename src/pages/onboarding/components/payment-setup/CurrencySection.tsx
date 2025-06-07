import { Flex, Text } from '@chakra-ui/react'
import CurrencySelect from 'components/redesign/select/CurrencySelect'
import React from 'react'
import useAppStore from 'stores/app/appStore'
import { shopUpdateService, shopInfoService } from 'lib/apis/shop/shopServices'
import useAppToast from 'hooks/toast/useToast'

interface CurrencySectionProps {
  onLoadingChange?: (loading: boolean) => void
}

function CurrencySection({ onLoadingChange }: CurrencySectionProps) {
  const { shop, updateState } = useAppStore()
  const { showToast } = useAppToast()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCurrencyChange = async (currency: string) => {
    try {
      setIsLoading(true)
      onLoadingChange?.(true)

      const latestShopData = await shopInfoService({ shopName: shop.shopName })
      const latestShop = latestShopData.data.data

      // Create a new object with all existing shop data
      const updatedShopData = {
        ...latestShop,
        currencyAbbreviation: currency
      }

      // Update the shop with all data preserved
      const response = await shopUpdateService(updatedShopData)
      
      // Update the local state with the complete shop data from the response
      updateState({
        key: 'shop',
        params: response.data.data
      })
    } catch (error) {
      showToast({
        message: 'Failed to update currency',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
      onLoadingChange?.(false)
    }
  }

  return (
    <Flex direction="column" gap={4}>
      <Text color={'text.white'}>Default Currency</Text>
      <CurrencySelect value={shop?.currency.abbreviation || 'USD'} onChange={(e) => handleCurrencyChange(e.target.value)} isDisabled={isLoading} />
    </Flex>
  )
}

export default CurrencySection
