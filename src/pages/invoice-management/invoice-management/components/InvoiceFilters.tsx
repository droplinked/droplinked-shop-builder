import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import useDebounce from 'functions/hooks/debounce/useDebounce'
import Input from 'pages/invoice-management/components/Input'
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
                inputGroupProps={{ width: "300px", height: 12 }}
                inputProps={{
                    value: searchTerm,
                    placeholder: "Search",
                    onChange: (e) => setSearchTerm(e.target.value)
                }}
                icon={<AppIcons.Search />}
            />
        </Flex>
    )
}

export default InvoiceFilters