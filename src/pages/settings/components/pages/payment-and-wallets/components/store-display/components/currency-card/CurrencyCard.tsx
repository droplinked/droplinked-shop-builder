import { Badge, Box, Divider, Flex, HStack, Select, Text } from '@chakra-ui/react';
import SwitchBox from 'components/redesign/switch-box/SwitchBox';
import { useFormikContext } from 'formik';
import { ISettings } from 'pages/settings/formConfigs';
import React, { useEffect } from 'react';

interface CurrencyCardProps {
  currencyName: string;
  isPrimary: boolean;
  currencyList: string[];
  onToggle: () => void;
  isLoading?: boolean;
  selectedItem: string | null;
  setSelectedItem: (value: string) => void;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ currencyName, isPrimary, currencyList, onToggle, isLoading, setSelectedItem, selectedItem }) => {
  const { values, setFieldValue } = useFormikContext<ISettings>()

  return (
    <Box width={{ base: "100%", sm: "100%", md: "448px" }} ml={"auto"} border="1px solid #282828" borderRadius="lg" display="flex" flexDirection="column">
      <HStack p="6" justify="space-between">
        <Flex align="center" gap="4">
          <Text color={isPrimary ? 'white' : '#4f4f4f'} fontSize="base" fontWeight="medium">
            {currencyName}
          </Text>
          <Badge textTransform={"unset"} bg={isPrimary ? "#ffd9511a" : "grey.800"} color={isPrimary ? "#ffd850" : "#4f4f4f"} borderRadius="4px" fontWeight={400} px="2">
            {isPrimary ? "Primary" : "Make Primary"}
          </Badge>
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
          name='currencyAbbreviation'
          width="100%"
          height={'100%'}
          borderRadius="lg"
          border="none"
          outline="none"
          appearance="none"
          textAlign="center"
          _focus={{ boxShadow: 'none' }}
          isDisabled={isLoading}
          onChange={(e) => setFieldValue("currencyAbbreviation", e.target.value)}
          value={values.currencyAbbreviation}
        >
          <option disabled value="select" style={{ backgroundColor: '#1a202c', color: '#4f4f4f', fontSize: 'md', textAlign: "start" }}>
            Select
          </option>
          {currencyList.map((currency) => (
            <option key={currency} value={currency} style={{ backgroundColor: '#1a202c', color: '#4f4f4f', fontSize: 'md', textAlign: "start" }}>
              {currency}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default CurrencyCard;
