import { HStack } from '@chakra-ui/react'
import SearchDatagrid from 'components/common/datagrid/parts/search/SearchDatagrid'
import useDebounce from 'functions/hooks/debounce/useDebounce'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function AffiliateStoresFilters({ addQuery }) {
    const [searchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
    const debouncedSearchTerm = useDebounce(searchTerm)

    useEffect(() => {
        addQuery('search', debouncedSearchTerm)
    }, [debouncedSearchTerm])

    return (
        <HStack spacing={7}>
            <SearchDatagrid value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </HStack>
    )
}

export default AffiliateStoresFilters