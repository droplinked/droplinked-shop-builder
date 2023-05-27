import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import AppCard from '../card/AppCard'
import AppTable, { IAppTable } from '../table/AppTable'
import DatagridButtons, { IDatagridButtons } from './parts/buttons/DatagridButtons'
import DatagridSkeleton from './parts/skeleton/DatagridSkeleton'
import SearchDatagrid, { ISearchDatagrid } from './parts/search/SearchDatagrid'
import FiltersDatagrid, { IFiltersDatagridItems } from './parts/filters/FiltersDatagrid'

type mergeType = IDatagridButtons & IAppTable

export interface IdataGrid extends mergeType {
    filters?: Array<IFiltersDatagridItems>
    loading: boolean
    search?: ISearchDatagrid
}


function AppDataGrid({ filters, rows, buttons, loading, empty, search }: IdataGrid) {
    return (
        <AppCard>
            <VStack align={"stretch"} spacing={6}>
                <Flex justifyContent={"space-between"}>
                    <HStack spacing={8}>
                        {search && <SearchDatagrid onChange={search.onChange} />}
                        {filters && <FiltersDatagrid item={filters} />}
                    </HStack>
                    {buttons && <DatagridButtons buttons={buttons} />}
                </Flex>
                {loading ? <DatagridSkeleton /> : <Box><AppTable empty={empty} rows={rows} /></Box>}
            </VStack>
        </AppCard >
    )
}

export default AppDataGrid