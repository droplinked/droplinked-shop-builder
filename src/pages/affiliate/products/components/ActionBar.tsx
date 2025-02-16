import { Button, Flex, HStack, Input, useBreakpointValue } from '@chakra-ui/react';
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
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <HStack justifyContent="start" width="full" alignItems="center" spacing={3}>
      {/* Filters Toggle Button */}
      <Button
        px="20px"
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
        {isSmallScreen ? <AppIcons.FilterAction /> : <AppIcons.SideBarExpand />}
        <AppTypography color="white" fontSize="16px" fontWeight="500" ml={2}>
          Filters
        </AppTypography>
      </Button>

      {/* Search Input */}
      <Flex p="8px" alignItems="center" fontWeight="medium" justifyContent="center" gap={2} border="1px solid #292929" bg="#1C1C1C" borderRadius="8">
        <AppIcons.Search />
        <Input
          fontSize="base"
          fontWeight="400"
          color="#fff"
          height="100%"
          border="none"
          padding={0}
          spellCheck={false}
          _focusVisible={{
            border: 'none'
          }}
          _placeholder={{ color: '#7B7B7B' }}
          value={filters.title}
          placeholder="Search"
          onChange={(e) => handleFilterChange('title', e.target.value)}
        />
        <AppIcons.SearchInput />
      </Flex>
    </HStack>
  );
};

export default ActionBar;
