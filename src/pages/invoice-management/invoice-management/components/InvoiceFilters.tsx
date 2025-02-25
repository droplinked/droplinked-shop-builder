import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import useDebounce from 'functions/hooks/debounce/useDebounce'
import { InvoiceQueryParams, InvoiceStatus } from 'lib/apis/invoice/interfaces'
import Input from 'components/redesign/input/Input'
import Select from 'components/redesign/select/Select'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
    updateInvoiceFilters: Dispatch<SetStateAction<InvoiceQueryParams>>
}

function InvoiceFilters({ updateInvoiceFilters }: Props) {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)
    const statusOptions = [
        { title: "Active", value: "ACTIVE" },
        { title: "Pending", value: "PENDING" },
        { title: "Checked Out", value: "CHECKED_OUT" }
    ]

    useEffect(() => {
        updateInvoiceFilters(prev => ({ ...prev, page: 1, search: debouncedSearchTerm }))
    }, [debouncedSearchTerm])

    return (
        <Flex justifyContent={"space-between"} alignItems="center">
            <Input
                inputGroupProps={{ width: "300px", height: 12, bgColor: "#1C1C1C" }}
                inputProps={{
                    value: searchTerm,
                    placeholder: "Search",
                    onChange: (e) => setSearchTerm(e.target.value)
                }}
                leftElement={<AppIcons.Search />}
            />
            <Select
                items={statusOptions}
                labelAccessor='title'
                valueAccessor='value'
                selectProps={{
                    width: "200px",
                    bgColor: "#1C1C1C",
                    placeholder: "Status",
                    onChange: (e) => updateInvoiceFilters(prev => ({ ...prev, page: 1, status: e.target.value as InvoiceStatus })),
                }}
            />
        </Flex>
    )
}

export default InvoiceFilters