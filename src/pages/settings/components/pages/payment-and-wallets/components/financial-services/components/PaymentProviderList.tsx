import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import PaymentProviderCard from './PaymentProviderCard';

interface Provider {
  title: string;
  isChecked: boolean;
  buttonText: string;
}

const PaymentProviderList: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([
    { title: 'Stripe', isChecked: true, buttonText: 'View Account' },
    { title: 'Coinbase Commerce', isChecked: true, buttonText: 'Learn More' }
  ]);

  const handleToggle = (title: string) => {
    setProviders((prevProviders) =>
      prevProviders.map((provider) =>
        provider.title === title
          ? { ...provider, isChecked: !provider.isChecked }
          : provider
      )
    );
  };

  return (
    <Flex gap="4" height="128px" overflow="hidden">
      {providers.map(({ title, buttonText, isChecked }) => (
        <PaymentProviderCard
          key={title}
          title={title}
          buttonText={buttonText}
          isChecked={isChecked}
          onToggle={() => handleToggle(title)}
        />
      ))}
    </Flex>
  );
};

export default PaymentProviderList;
