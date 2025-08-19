import { Box, Button, Flex, HStack, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { SidebarcollapseMd } from 'assets/icons/Action/SidebarCollapse/SidebarcollapseMd';
import { SidebarexpandMd } from 'assets/icons/Action/SidebarExpand/SidebarexpandMd';
import AppTypography from 'components/common/typography/AppTypography';
import { AppAccordion } from 'components/redesign/accordion/AppAccordion';
import CurrencyIcon from 'components/redesign/currency-icon/CurrencyIcon';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { IGetProductsCommunityService } from 'services/product/interfaces';
import { IAffiliateProductsCategory } from '../../context/context';
import CheckboxList from './components/CheckboxList';
import FilterInput from './components/FilterInput';
import FilterSection from './components/FilterSection';
import { DollarMd } from 'assets/icons/Finance/Dollar/DollarMd';
import { Refresh2Sm } from 'assets/icons/Action/Refresh2/Refresh2Sm';
import AppIcons from 'assets/icon/Appicons';

interface FiltersPanelProps {
  isPublic: Boolean;
  filters: IGetProductsCommunityService;
  handleFilterChange: (key: keyof IGetProductsCommunityService, value: any) => void;
  categories: IAffiliateProductsCategory[];
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ isPublic, showFilters, setShowFilters, filters, handleFilterChange, categories }) => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const isMediumScreen = useBreakpointValue({ base: false, md: true, lg: false });
  const { t, isRTL } = useLocaleResources('affiliate');
  const priceIcon = isPublic ? <DollarMd /> : <CurrencyIcon size='sm' color="#7B7B7B" />;

  const resetFilters = () => {
    const defaultFilters = {
      lowestPrice: '',
      highestPrice: '',
      lowestCommission: '',
      highestCommission: '',
      categoryIds: [] as string[]
    };

    // Reset each filter
    Object.keys(defaultFilters).forEach((key) => {
      handleFilterChange(key as keyof IGetProductsCommunityService, defaultFilters[key as keyof IGetProductsCommunityService]);
    });
  };

  return (
    <>
      {showFilters && (
        <Box
          position={isSmallScreen ? 'fixed' : isMediumScreen ? 'absolute' : 'sticky'}
          top={isMediumScreen ? '75px' : undefined} // Top positioning for absolute in md
          bottom={0}
          left={isRTL ? undefined : isMediumScreen ? (isPublic ? 0 : '78px') : 0}
          right={isRTL ? isMediumScreen ? (isPublic ? 0 : '78px') : 0 : undefined}
          width={isMediumScreen ? '272px' : isSmallScreen ? '100%' : '380px'} // Adjust width for md and lg
          maxHeight={isSmallScreen ? 'calc(100% - 50px)' : 'auto'}
          bg="#141414"
          zIndex={20}
          borderLeft={'1.5px solid'}
          borderRight={'1.5px solid'}
          borderTop={isMediumScreen ? 'none' : '1.5px solid'} // No top border for md
          borderBottom={isMediumScreen ? 'none' : '1.5px solid'} // No bottom border for md
          borderRadius={isMediumScreen ? 0 : 8}
          borderColor="neutral.gray.800"
        >
          <Flex alignItems="center" justifyContent="space-between" gap={2} p={4} borderBottomWidth="1px" borderBottomColor={'neutral.gray.800'}>
            <AppTypography fontSize="base" fontWeight="bold" color={'white'}>
              {t('AffiliateProductsPage.actionBar.filters')}
            </AppTypography>
            <HStack spacing={2}>
              <IconButton
                aria-label="Refresh Fillter"
                icon={<Refresh2Sm />}
                onClick={resetFilters}
                _hover={{ backgroundColor: '#222' }}
                backgroundColor="neutral.gray.1000"
                color="white"
                border="1px solid neutral.gray.700"
              />
              {isMediumScreen && (
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
                  onClick={() => setShowFilters(false)}
                >
                  {isRTL ? <SidebarexpandMd /> : <SidebarcollapseMd />}
                  <AppTypography color="white" fontSize="sm" fontWeight="medium" ml={isRTL ? 0 : 2} mr={isRTL ? 2 : 0}>
                    {t('AffiliateProductsPage.actionBar.filters')}
                  </AppTypography>
                </Button>
              )}
            </HStack>
          </Flex>
          <Box flexShrink={0} padding={2}>
            <AppAccordion multiCollapse display="flex" flexDir="column" gap={2}>
              {/* Type Section */}
              <FilterSection title={t('AffiliateProductsPage.filters.categories')} itemId="1">
                <CheckboxList categories={categories} filters={filters} handleFilterChange={handleFilterChange} />
              </FilterSection>

              {/* Price Section */}
              <FilterSection title={t('AffiliateProductsPage.filters.priceRange.min')} itemId="2">
                <HStack width="full" spacing="8px">
                  <FilterInput value={filters.lowestPrice} placeholder="0" onChange={(val) => handleFilterChange('lowestPrice', val)} icon={priceIcon} />
                  <AppIcons.AffiliateProductsSeparator />
                  <FilterInput value={filters.highestPrice} placeholder="1000" onChange={(val) => handleFilterChange('highestPrice', val)} icon={priceIcon} />
                </HStack>
              </FilterSection>

              {/* Commission Section */}
              <FilterSection title={t('AffiliateProductsPage.filters.commissionRange.min')} itemId="3">
                <HStack width="full" spacing="8px">
                  <FilterInput value={filters.lowestCommission} placeholder="0" onChange={(val) => handleFilterChange('lowestCommission', val)} icon={<AppIcons.AffiliateProductsPercent />} />
                  <AppIcons.AffiliateProductsSeparator color="red" />
                  <FilterInput value={filters.highestCommission} placeholder="100" onChange={(val) => handleFilterChange('highestCommission', val)} icon={<AppIcons.AffiliateProductsPercent />} />
                </HStack>
              </FilterSection>
            </AppAccordion>
          </Box>
        </Box>
      )}

      {showFilters && isSmallScreen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10
          }}
          onClick={() => setShowFilters(false)}
        />
      )}
    </>
  );
};

export default FiltersPanel;
