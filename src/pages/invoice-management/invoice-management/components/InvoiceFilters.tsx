import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppInput from 'components/redesign/input/AppInput'
import AppSelect from 'components/redesign/select/AppSelect'
import useDebounce from 'hooks/useDebounce/useDebounce'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { InvoiceQueryParams, InvoiceStatus } from 'services/invoice/interfaces'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
    updateInvoiceFilters: Dispatch<SetStateAction<InvoiceQueryParams>>
}

function InvoiceFilters({ updateInvoiceFilters }: Props) {
    const { t } = useLocaleResources('invoice-management');
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)
    const statusOptions = [
        { title: t('common:active'), value: "ACTIVE" },
        { title: t('common:pending'), value: "PENDING" },
        { title: t('InvoiceFilters.statusOptions.checkedOut'), value: "CHECKED_OUT" }
    ]

    useEffect(() => {
        updateInvoiceFilters(prev => ({ ...prev, page: 1, search: debouncedSearchTerm }))
    }, [debouncedSearchTerm])

    return (
        <Flex justifyContent={"space-between"} alignItems="center">
            <AppInput
                inputGroupProps={{ width: "300px", height: 12, bgColor: "neutral.gray.1000" }}
                inputProps={{
                    value: searchTerm,
                    placeholder: t('common:search'),
                    onChange: (e) => setSearchTerm(e.target.value)
                }}
                leftElement={<AppIcons.Search />}
            />
            <AppSelect
                items={statusOptions}
                labelAccessor='title'
                valueAccessor='value'
                selectProps={{
                    width: "200px",
                    bgColor: "neutral.gray.1000",
                    placeholder: t('common:status'),
                    onChange: (e) => updateInvoiceFilters(prev => ({ ...prev, page: 1, status: e.target.value as InvoiceStatus })),
                }}
            />
        </Flex>
    )
}

export default InvoiceFilters