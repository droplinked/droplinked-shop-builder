import React from 'react';
import { Box, Input } from '@chakra-ui/react';

interface FilterInputProps {
  value: number | undefined;
  placeholder: string;
  onChange: (value: number) => void;
  icon: React.JSX.Element;
}

const FilterInput: React.FC<FilterInputProps> = ({ value, placeholder, onChange, icon }) => (
  <Box display="flex" padding="12px 16px" alignItems="center" gap="8px" borderRadius="8px" border={"1.5px solid"} borderColor={`${value ? '#2BCFA1' : 'neutral.gray.800'}`}>
    {icon}
    <Input
      fontSize="14px"
      fontWeight="400"
      color="neutral.white"
      height="auto"
      padding="0px"
      spellCheck="false"
      border="none"
      _hover={{}}
      _focusVisible={{}}
      _placeholder={{ color: 'text.subtext.placeholder.dark' }}
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => {
        const numValue = parseFloat(e.target.value);
        if (!isNaN(numValue)) onChange(numValue);
      }}
      onKeyDown={(e) => {
        if (['+', '-', 'e'].includes(e.key)) e.preventDefault();
      }}
    />
  </Box>
);

export default FilterInput;