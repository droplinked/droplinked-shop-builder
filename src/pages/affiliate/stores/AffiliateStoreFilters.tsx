import { Flex } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import useDebounce from 'functions/hooks/debounce/useDebounce';
import { InvoiceQueryParams } from 'lib/apis/invoice/interfaces';
import Input from 'components/redesign/input/Input';
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
      <Input
        inputGroupProps={{ width: '300px', height: 12, bgColor: '#1C1C1C' }}
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
