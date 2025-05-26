import { Badge, Box, Divider, Flex, HStack, Select, Text } from '@chakra-ui/react';
import SwitchBox from 'components/redesign/switch-box/SwitchBox';
import { useFormikContext } from 'formik';
import { ISettings } from 'pages/settings/utils/formConfigs';
import React from 'react';

interface CurrencyCardProps {
  currencyName?: string;
  isPrimary?: boolean;
  currencyList?: string[];
  onToggle?: () => void;
  isLoading?: boolean;
  isSoon?: boolean;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ currencyName, isPrimary, currencyList, onToggle, isLoading, isSoon }) => {
  const { values, setFieldValue } = useFormikContext<ISettings>()

  return (
    <Box flex={1} width={"100%"} ml={"auto"} border="1px solid #282828" borderRadius="lg" display="flex" flexDirection="column">
      <HStack p="6" justify="space-between">
        <Flex align="center" gap="4">
          <Text color={isPrimary ? 'neutral.white' : 'neutral.gray.650'} fontSize="base" fontWeight="medium">
            {currencyName}
          </Text>
          <Badge textTransform={"unset"} bg={isPrimary ? "#ffd9511a" : "grey.800"} color={isPrimary ? "#ffd850" : "neutral.gray.650"} borderRadius="4px" fontWeight={400} px="2">
            {isPrimary && "Primary"}
            {isSoon && "Soon!"}
          </Badge>
        </Flex>
        <SwitchBox isDisabled={isSoon} isChecked={isPrimary} onToggle={onToggle} />
      </HStack>

      <Divider borderColor="#282828" />

      <Box p="2">
        <Select
          bg="transparent"
          color="#fff"
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
          isDisabled={isLoading || isSoon}
          onChange={(e) => setFieldValue("currencyAbbreviation", e.target.value)}
          value={values.currencyAbbreviation}
        >
          <option disabled value="select" style={{ backgroundColor: '#1a202c', color: '#fff', fontSize: 'md', textAlign: "start" }}>
            Select
          </option>
          {currencyList?.map((currency) => (
            <option key={currency} value={currency} style={{ backgroundColor: '#1a202c', color: '#fff', fontSize: 'md', textAlign: "start" }}>
              {currency}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default CurrencyCard;
