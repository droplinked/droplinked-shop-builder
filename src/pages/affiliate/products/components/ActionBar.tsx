import { Box, Button, Flex, HStack, Input, useBreakpointValue } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React, { useRef } from 'react';
import enLocale from 'locales/affiliate/en.json'
import arLocale from 'locales/affiliate/ar.json'
import { SidebarexpandMd } from 'assets/icons/Action/SidebarExpand/SidebarexpandMd';
import { SidebarcollapseMd } from 'assets/icons/Action/SidebarCollapse/SidebarcollapseMd';

interface ActionBarProps {
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  filters: Record<string, any>;
  handleFilterChange: (key: string, value: any) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ setShowFilters, filters, handleFilterChange }) => {
  const { t , isRTL} = useLocaleResources('affiliate',{
    en: enLocale,
    ar: arLocale
  } );

  const inputRef = useRef(null);
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const focusSearchInput = () => {
    inputRef.current.focus();
  };

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
        {isSmallScreen ? <AppIcons.FilterAction /> : isRTL ? <SidebarcollapseMd /> : <SidebarexpandMd /> }
        <AppTypography color="white" fontSize="16px" fontWeight="500" ml={isRTL ? 0 : 2} mr={isRTL ? 2 : 0}>
          {t('AffiliateProductsPage.actionBar.filters')}
        </AppTypography>
      </Button>

      {/* Search Input */}
      <Flex p="8px" alignItems="center" fontWeight="medium" justifyContent="center" gap={2} border="1px solid" borderColor="neutral.gray.800" bg="neutral.gray.1000" borderRadius="8">
        <AppIcons.Search />
        <Input
          ref={inputRef}
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
          _placeholder={{ color: 'text.subtext.placeholder.dark' }}
          value={filters.title}
          placeholder={t('common:search')}
          onChange={(e) => handleFilterChange('title', e.target.value)}
        />
        <Box as="button" cursor={'pointer'} bg={"neutral.gray.800"} rounded={2} onClick={focusSearchInput}>
          <AppIcons.SearchInput />
        </Box>
      </Flex>
    </HStack>
  );
};

export default ActionBar;
