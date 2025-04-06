import { Flex, Text } from '@chakra-ui/react';
import CurrencySelect from 'components/redesign/select/CurrencySelect';
import React from 'react';
import useAppStore from 'lib/stores/app/appStore';
import { shopUpdateService } from 'lib/apis/shop/shopServices';
import useAppToast from 'hooks/toast/useToast';

function CurrencySection() {
  const { shop, updateState } = useAppStore();
  const { showToast } = useAppToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCurrencyChange = async (currency: string) => {
    try {
      setIsLoading(true);

      // Update shop data via API
      await shopUpdateService({
        ...shop,
        currencyAbbreviation: currency
      });

      // Update local state
      updateState({
        key: 'shop',
        params: {
          ...shop,
          currencyAbbreviation: currency
        }
      });
    } catch (error) {
      showToast({
        message: 'Failed to update currency',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" gap={4}>
      <Text color={'text.white'}>Default Currency</Text>
      <CurrencySelect value={shop?.currencyAbbreviation || 'USD'} onChange={(e) => handleCurrencyChange(e.target.value)} isDisabled={isLoading} />
    </Flex>
  );
}

export default CurrencySection;
