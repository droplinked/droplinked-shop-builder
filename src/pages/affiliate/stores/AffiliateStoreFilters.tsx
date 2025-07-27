import { Flex } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppInput from 'components/redesign/input/AppInput';
import useDebounce from 'hooks/useDebounce/useDebounce';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { InvoiceQueryParams } from 'services/invoice/interfaces';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  updateInvoiceFilters: Dispatch<SetStateAction<InvoiceQueryParams>>;
}

function AffiliateStoreFilters({ updateInvoiceFilters }: Props) {
  const { t } = useLocaleResources('common');
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
          placeholder: t('common:search'),
          onChange: (e) => setSearchTerm(e.target.value)
        }}
        leftElement={<AppIcons.Search />}
      />
    </Flex>
  );
}

export default AffiliateStoreFilters;
