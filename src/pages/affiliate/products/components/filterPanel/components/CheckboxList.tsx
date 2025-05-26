import { Checkbox, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { IGetProductsCommunityService } from 'services/product/interfaces';
import { IAffiliateProductsCategory } from 'pages/affiliate/products/context/context';
import React from 'react';

interface CheckboxListProps {
  categories: IAffiliateProductsCategory[];
  filters: IGetProductsCommunityService;
  handleFilterChange: (key: keyof IGetProductsCommunityService, value: any) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ categories, filters, handleFilterChange }) => (
  <Flex gap="16px" flexDir="column">
    {categories.map((category) => (
      <Checkbox
        key={category._id}
        sx={{
          '.chakra-checkbox__control': { border: '1px solid #616161', width: '20px', height: '20px' },
          '.chakra-checkbox__control[data-checked]': { backgroundColor: '#2BCFA1', color: '#292929', borderColor: '#2BCFA1' }
        }}
        isChecked={filters?.categoryIds?.includes(category._id)}
        onChange={() => {
          handleFilterChange('categoryIds', filters?.categoryIds?.includes(category._id) ? filters?.categoryIds?.filter((id) => id !== category._id) : [...filters?.categoryIds, category._id]);
        }}
      >
        <AppTypography color={'white'} fontSize="14px">{category.title}</AppTypography>
      </Checkbox>
    ))}
  </Flex>
);

export default CheckboxList;
