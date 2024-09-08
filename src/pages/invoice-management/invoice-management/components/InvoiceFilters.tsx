import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import useDebounce from 'functions/hooks/debounce/useDebounce'
import Input from 'pages/invoice-management/components/Input'
import Select from 'pages/invoice-management/components/Select'
import React, { useEffect, useState } from 'react'

interface Props {
    onChange: (filters: any) => void
}

function InvoiceFilters({ onChange }: Props) {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)

    useEffect(() => {
        onChange({ searchTerm })
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
                selectProps={{
                    width: "200px",
                    bgColor: "#1C1C1C",
                    placeholder: "Status",
                    onChange: (e) => console.log(e.target.value)
                }}
                items={[
                    { title: "Paid", value: 1 },
                    { title: "Pending", value: 2 },
                    { title: "Overdue", value: 3 }
                ]}
            />
        </Flex>
    )
}

export default InvoiceFilters