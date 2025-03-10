import { Flex, Text } from '@chakra-ui/react';
import CurrencySelect from 'components/redesign/select/CurrencySelect';
import React from 'react';

function CurrencySection() {
  return (
    <Flex direction="column" gap={4}>
      <Text color={'text.white'}>Default Currency</Text>
      <CurrencySelect />
    </Flex>
  );
}

export default CurrencySection; 