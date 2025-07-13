import { Divider, Flex } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import SectionContainer from 'pages/settings/components/common/SectionContainer';
import SectionContent from 'pages/settings/components/common/SectionContent';
import React, { useState } from 'react';
import CurrencyCard from './components/currency-card/CurrencyCard';
import { useQuery } from 'react-query';
import { getCurrencyList } from 'services/shop/shopServices';

const StoreDisplay: React.FC = () => {
  const { t } = useLocaleResources('settings');
  const { isLoading, data } = useQuery({
    queryKey: ["currency-list"],
    queryFn: () => getCurrencyList()
  })

  const currencyList = data?.data || []
  const [switchState, setSwitchState] = useState({
    fiat: true,
    crypto: false
  });

  // Handle the toggle such that only one currency can be primary at a time
  const handleToggle = (key: 'fiat' | 'crypto') => {
    setSwitchState({
      fiat: key === 'fiat',
      crypto: key === 'crypto'
    });
  };

  return (
    <>
      <SectionContainer title={t('settings.paymentsWallets.storeDisplay.title')}>
        <SectionContent
          title={t('settings.paymentsWallets.storeDisplay.defaultCurrency.title')}
          description={t('settings.paymentsWallets.storeDisplay.defaultCurrency.description')}
          rightContent={
            <Flex flexDir={{ base: "column", xl: "row" }} gap="4">
              <CurrencyCard
                currencyName={t('settings.paymentsWallets.storeDisplay.fiat')}
                isPrimary={switchState.fiat}
                currencyList={currencyList}
                onToggle={() => handleToggle('fiat')}
                isLoading={isLoading}
              />
              <CurrencyCard
                currencyName={t('settings.paymentsWallets.storeDisplay.crypto')}
                isPrimary={switchState.crypto}
                currencyList={["USD Coin"]}
                isSoon={false}
                onToggle={() => handleToggle('crypto')}
              />
            </Flex>
          }
        />
      </SectionContainer>
      <Divider borderColor={'neutral.gray.800'} />
    </>
  );
};

export default StoreDisplay;
