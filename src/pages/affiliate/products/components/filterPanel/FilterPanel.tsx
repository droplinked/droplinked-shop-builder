import { Box, Flex, HStack, useBreakpointValue } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import { AppAccordion } from 'components/redesign/accordion/AppAccordion';
import { IGetProductsCommunityService } from 'lib/apis/product/interfaces';
import React from 'react';
import { IAffiliateProductsCategory } from '../../context/context';
import CheckboxList from './components/CheckboxList';
import FilterInput from './components/FilterInput';
import FilterSection from './components/FilterSection';
import AppTypography from 'components/common/typography/AppTypography';

interface FiltersPanelProps {
  filters: IGetProductsCommunityService;
  handleFilterChange: (key: keyof IGetProductsCommunityService, value: any) => void;
  categories: IAffiliateProductsCategory[];
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ showFilters, setShowFilters, filters, handleFilterChange, categories }) => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      {showFilters && (
        <Box
          position={isSmallScreen ? 'absolute' : 'sticky'}
          top={{ base: 0, md: '80px' }}
          bottom={0}
          left={0}
          width="380px"
          bg="#141414"
          boxShadow="lg"
          zIndex={20}
          border="1.5px solid #292929"
          borderRadius={8}
        >
          <Flex alignItems="center" justifyContent="space-between" gap={6} p={4} borderBottomWidth="1px" borderBottomColor={'#292929'}>
            <AppTypography fontSize="base" fontWeight="bold" color={'white'}>
              Filters
            </AppTypography>
            <AppIcons.Refresh width="12px" height="12px" color={'white'}></AppIcons.Refresh>
          </Flex>
          <Box flexShrink={0} padding={2}>
            <AppAccordion multiCollapse display="flex" flexDir="column" gap="24px">
              {/* Type Section */}
              <FilterSection title="Type" itemId="1">
                <CheckboxList categories={categories} filters={filters} handleFilterChange={handleFilterChange} />
              </FilterSection>

              {/* Price Section */}
              <FilterSection title="Price" itemId="2">
                <HStack width="full" spacing="8px">
                  <FilterInput value={filters.lowestPrice} placeholder="0" onChange={(val) => handleFilterChange('lowestPrice', val)} icon={<AppIcons.AffiliateProductsDollar />} />
                  <AppIcons.AffiliateProductsSeparator />
                  <FilterInput value={filters.highestPrice} placeholder="1000" onChange={(val) => handleFilterChange('highestPrice', val)} icon={<AppIcons.AffiliateProductsDollar />} />
                </HStack>
              </FilterSection>

              {/* Commission Section */}
              <FilterSection title="Commission" itemId="3">
                <HStack width="full" spacing="8px">
                  <FilterInput value={filters.lowestCommission} placeholder="0" onChange={(val) => handleFilterChange('lowestCommission', val)} icon={<AppIcons.AffiliateProductsPercent />} />
                  <AppIcons.AffiliateProductsSeparator />
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
