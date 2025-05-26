import { Flex } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppInput from 'components/redesign/input/AppInput';
import useDebounce from 'hooks/useDebounce/useDebounce';
import { InvoiceQueryParams } from 'lib/services/invoice/interfaces';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  updateInvoiceFilters: Dispatch<SetStateAction<InvoiceQueryParams>>;
}

function AffiliateStoreFilters({ updateInvoiceFilters }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    updateInvoiceFilters((prev) => ({ ...prev, page: 1, name: debouncedSearchTerm }));
  }, [debouncedSearchTerm]);

  return (
    <Flex justifyContent={'space-between'} alignItems="center">
      <AppInput
        inputGroupProps={{ width: '300px', height: 12, bgColor: 'neutral.gray.1000' }}
        inputProps={{
          value: searchTerm,
          placeholder: 'Search',
          onChange: (e) => setSearchTerm(e.target.value)
        }}
        leftElement={<AppIcons.Search />}
      />
    </Flex>
  );
}

export default AffiliateStoreFilters;
