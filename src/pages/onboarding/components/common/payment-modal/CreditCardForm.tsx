import { Flex, VStack } from '@chakra-ui/react';
import Checkbox from 'components/redesign/checkbox/Checkbox';
import Input from 'components/redesign/input/Input';
import React, { useState } from 'react';

interface CardData {
  number: string;
  expirationDate: string;
  securityCode: string;
  country: string;
  zipCode: string;
}

const CreditCardForm = () => {
  const [cardData, setCardData] = useState<CardData>({
    number: '',
    expirationDate: '',
    securityCode: '',
    country: '',
    zipCode: ''
  });

  const onCardDataChange = (field: keyof CardData, value: string) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Flex flex={1} flexDirection="column" h="100%" position="relative">
      <VStack p={12} alignItems="stretch" spacing={6} borderColor="neutral.gray.800" flex={1} pb={{ base: '80px', md: '80px', lg: 9 }}>
        <VStack alignItems="stretch" spacing={4}>
          <Input
            label="Card Number"
            inputProps={{
              fontSize: { base: 14, md: 16 },
              placeholder: 'Enter card number',
              value: cardData.number,
              onChange: (e) => onCardDataChange('number', e.target.value),
              isRequired: true
            }}
          />
        </VStack>

        <Flex gap={4}>
          <Input
            label="Expiration Date"
            inputProps={{
              fontSize: { base: 14, md: 16 },
              placeholder: 'MM/YY',
              value: cardData.expirationDate,
              onChange: (e) => onCardDataChange('expirationDate', e.target.value),
              isRequired: true
            }}
          />

          <Input
            label="Security Code"
            inputProps={{
              fontSize: { base: 14, md: 16 },
              placeholder: 'CVC',
              value: cardData.securityCode,
              onChange: (e) => onCardDataChange('securityCode', e.target.value),
              isRequired: true
            }}
          />
        </Flex>

        <Flex gap={4}>
          <Input
            label="Country"
            inputProps={{
              fontSize: { base: 14, md: 16 },
              placeholder: 'Enter country',
              value: cardData.country,
              onChange: (e) => onCardDataChange('country', e.target.value),
              isRequired: true
            }}
          />

          <Input
            label="Zip Code"
            inputProps={{
              fontSize: { base: 14, md: 16 },
              placeholder: 'Enter zip code',
              value: cardData.zipCode,
              onChange: (e) => onCardDataChange('zipCode', e.target.value),
              isRequired: true
            }}
          />
        </Flex>

        <Checkbox color="white" fontSize="base" fontWeight="medium" colorScheme="green">
          Save credit card information
        </Checkbox>
      </VStack>
    </Flex>
  );
};

export default CreditCardForm;
