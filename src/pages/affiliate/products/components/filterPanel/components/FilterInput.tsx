import React from 'react';
import { Box, Input } from '@chakra-ui/react';

interface FilterInputProps {
  value: number | undefined;
  placeholder: string;
  onChange: (value: number) => void;
  icon: JSX.Element;
}

const FilterInput: React.FC<FilterInputProps> = ({ value, placeholder, onChange, icon }) => (
  <Box display="flex" padding="12px 16px" alignItems="center" gap="8px" borderRadius="8px" border={`1.5px solid ${value ? '#2BCFA1' : '#292929'}`}>
    {icon}
    <Input
      fontSize="14px"
      fontWeight="400"
      color="#FFFFFF"
      height="auto"
      padding="0px"
      spellCheck="false"
      border="none"
      _hover={{}}
      _focusVisible={{}}
      _placeholder={{ color: '#7B7B7B' }}
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