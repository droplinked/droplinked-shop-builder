import React from 'react';
import { Box, Button, Divider, Flex, HStack, Text } from '@chakra-ui/react';
import SwitchBox from 'components/redesign/switch-box/SwitchBox';

const PaymentProviderCard = ({ title, buttonText, isChecked, onToggle }) => {
  return (
    <Box flex="1" border="1px solid #282828" borderRadius="lg" overflow="hidden">
      <HStack p="4" spacing="4">
        <Box w="12" h="12" p="3" bg="#1b1b1b" border="1px solid #282828" borderRadius="lg" />
        <Flex flex="1" align="center" gap="2">
          <Text color="white" fontSize="base" fontWeight="medium">
            {title}
          </Text>
        </Flex>
        <SwitchBox isChecked={isChecked} onToggle={onToggle} />
      </HStack>
      <Divider borderColor="#282828" />
      <Box p="2" textAlign="center" alignContent={"center"}>
        <Button variant={'default'} color="#179ef8">
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentProviderCard;
