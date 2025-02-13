import { Button, Flex, HStack, Input } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

interface ActionBarProps {
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  filters: Record<string, any>;
  handleFilterChange: (key: string, value: any) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ showFilters, setShowFilters, filters, handleFilterChange }) => {
  return (
    <HStack justifyContent="start" width="full" alignItems="center" spacing={3}>
      {/* Filters Toggle Button */}
      <Button
        px="16px"
        py="12px"
        bg="#1b1b1b"
        borderRadius="lg"
        border="1px solid"
        borderColor="#282828"
        display="flex"
        justifyContent="center"
        alignItems="center"
        _hover={{ bg: '#282828' }}
        onClick={() => setShowFilters((prev) => !prev)}
      >
        <AppIcons.SideBarExpand />
        <AppTypography color="white" fontSize="sm" fontWeight="medium" ml={2}>
          Filters
        </AppTypography>
      </Button>

      {/* Search Input */}
      <Flex width="300px"  px="8px" py="12px" alignItems="center" fontWeight="medium" justifyContent="center" gap="8px" border="1px solid #292929" bg="#1C1C1C" borderRadius="8">
        <AppIcons.Search height="16px" />
        <Input
          fontSize="sm"
          fontWeight="400"
          color="#7B7B7B"
          height="100%"
          border="none"
          spellCheck={false}
          _placeholder={{ color: '#7B7B7B' }}
          value={filters.title}
          placeholder="Search"
          onChange={(e) => handleFilterChange('title', e.target.value)}
        />
      </Flex>
    </HStack>
  );
};

export default ActionBar;
