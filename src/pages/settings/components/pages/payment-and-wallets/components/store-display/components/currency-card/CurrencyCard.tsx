import { Badge, Box, Divider, Flex, HStack, Select, Text } from '@chakra-ui/react';
import SwitchBox from 'components/redesign/switch-box/SwitchBox';
import React from 'react';

interface CurrencyCardProps {
  currencyName: string;
  isPrimary: boolean;
  currencyList: string[];
  onToggle: () => void;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ currencyName, isPrimary, currencyList, onToggle }) => {
  return (
    <Box flex="1" border="1px solid #282828" borderRadius="lg" display="flex" flexDirection="column">
      <HStack p="6" justify="space-between">
        <Flex align="center" gap="4">
          <Text color={isPrimary ? 'white' : '#4f4f4f'} fontSize="base" fontWeight="medium">
            {currencyName}
          </Text>
          {isPrimary ? (
            <Badge bg="#ffd9511a" color="#ffd850" borderRadius="full" px="2">
              Primary
            </Badge>
          ) : (
            <Badge bg="gray.800" color="#4f4f4f" borderRadius="full" px="2">
              Make Primary
            </Badge>
          )}
        </Flex>
        <SwitchBox isChecked={isPrimary} onToggle={onToggle} />
      </HStack>

      <Divider borderColor="#282828" />

      <Box p="2">
        <Select
          bg="transparent"
          color="#4f4f4f"
          fontSize="base"
          p="3"
          width="100%"
          height={'100%'}
          borderRadius="lg"
          border="none"
          outline="none"
          appearance="none"
          textAlign="center"
          _focus={{ boxShadow: 'none' }}
        >
          <option value="select" style={{ backgroundColor: '#1a202c', color: '#4f4f4f', fontSize: 'md' }}>
            Select
          </option>
          {currencyList.map((currency) => (
            <option key={currency} value={currency} style={{ backgroundColor: '#1a202c', color: '#4f4f4f', fontSize: 'md' }}>
              {currency}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default CurrencyCard;
