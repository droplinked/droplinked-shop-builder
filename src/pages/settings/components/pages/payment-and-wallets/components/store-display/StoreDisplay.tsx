import { Divider, Flex } from '@chakra-ui/react';
import SectionContainer from 'pages/settings/components/common/SectionContainer';
import SectionContent from 'pages/settings/components/common/SectionContent';
import React, { useState } from 'react';
import CurrencyCard from './components/currency-card/CurrencyCard';

const StoreDisplay: React.FC = () => {
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
      <SectionContainer title="Store Display">
        <SectionContent
          title="Default Currency"
          description="Choose a default currency to display to customers for products. During the checkout process, visitors will be able to see the total price in their local currency."
          rightContent={
            <Flex gap="4">
              <CurrencyCard
                currencyName="Fiat"
                isPrimary={switchState.fiat}
                currencyList={['USD']}
                onToggle={() => handleToggle('fiat')}
              />
              <CurrencyCard
                currencyName="Crypto"
                isPrimary={switchState.crypto}
                currencyList={['BTC', 'ETH']}
                onToggle={() => handleToggle('crypto')}
              />
            </Flex>
          }
        />
      </SectionContainer>
      <Divider borderColor={'#292929'} />
    </>
  );
};

export default StoreDisplay;
