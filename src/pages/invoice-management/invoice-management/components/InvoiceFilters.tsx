import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import useDebounce from 'functions/hooks/debounce/useDebounce'
import { InvoiceQueryParams, InvoiceStatus } from 'lib/apis/invoice/interfaces'
import Input from 'pages/invoice-management/components/Input'
import Select from 'pages/invoice-management/components/Select'
import React, { useEffect, useState } from 'react'

interface Props {
    updateInvoiceFilters: <K extends keyof InvoiceQueryParams>(key: K, value: InvoiceQueryParams[K]) => void
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
        updateInvoiceFilters("search", debouncedSearchTerm)
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
                icon={<AppIcons.Search />}
            />
            <Select
                items={statusOptions}
                labelAccessor='title'
                valueAccessor='value'
                selectProps={{
                    width: "200px",
                    bgColor: "#1C1C1C",
                    onChange: (e) => updateInvoiceFilters("status", e.target.value as InvoiceStatus)
                }}
            />
        </Flex>
    )
}

export default InvoiceFilters