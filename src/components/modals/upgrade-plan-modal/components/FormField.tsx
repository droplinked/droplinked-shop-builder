import { Flex, FormErrorMessage, Text } from '@chakra-ui/react';
import { AsteriskSm } from 'assets/icons/Sign/Asterisk/AsteriskSm';
import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <Flex direction="column" gap={4} w="100%">
      <Text
        display="flex"
        alignItems="center"
        gap={1}
        color="white"
        fontSize="base"
        fontWeight="medium"
      >
        {label} <AsteriskSm color="#FF2244" />
      </Text>
      {children}
      <FormErrorMessage color="red.400" fontSize="sm">
        {error}
      </FormErrorMessage>
    </Flex>
  );
}