import { HStack } from '@chakra-ui/react'
import SearchDatagrid from 'components/common/datagrid/parts/search/SearchDatagrid'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

function AffiliateStoresFilters({ addQuery }) {
    const [searchParams] = useSearchParams()

    return (
        <HStack spacing={7}>
            <SearchDatagrid value={searchParams.get('search')} onChange={(e) => addQuery('search', e.target.value)} />
        </HStack>
    )
}

export default AffiliateStoresFilters