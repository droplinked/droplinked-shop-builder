import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import AppCard from '../card/AppCard'
import AppTable, { IAppTable } from '../table/AppTable'
import DatagridButtons, { IDatagridButtons } from './parts/buttons/DatagridButtons'
import FiltersDatagrid, { IFiltersDatagridItems } from './parts/filters/FiltersDatagrid'
import Pagination, { IPagination } from './parts/pagination/Pagination'
import SearchDatagrid, { ISearchDatagrid } from './parts/search/SearchDatagrid'
import DatagridSkeleton from './parts/skeleton/DatagridSkeleton'
import AppTypography from 'components/common/typography/AppTypography'

type mergeType = IDatagridButtons & IAppTable

export interface IdataGrid extends mergeType {
    filters?: Array<IFiltersDatagridItems>
    loading: boolean
    search?: ISearchDatagrid
    pagination?: IPagination
    description?: string
    title?: string
}


function AppDataGrid({ filters, rows, buttons, loading, empty, search, pagination, checkbox, description, title }: IdataGrid) {
    return (
        <VStack width={"100%"} alignItems={"start"}>
            <HStack mb={"36px"} alignItems={"start"} justifyContent={"space-between"} width={"100%"}>
                <VStack alignItems={"start"}>
                    {title &&
                        <AppTypography color={"#fff"} fontSize={"24px"} fontWeight={700}>
                            {title}
                        </AppTypography>
                    }
                    {description &&
                        <AppTypography color={"#b1b1b1"} fontSize={"16px"}>
                            {description}
                        </AppTypography>
                    }
                </VStack>
                {buttons && <DatagridButtons buttons={buttons} />}
            </HStack>
            <Flex mb={"24px"} justifyContent={"space-between"}>
                <HStack spacing={8}>
                    {search && <SearchDatagrid onChange={search.onChange} value={search.value} />}
                    {filters && <FiltersDatagrid item={filters} />}
                </HStack>
            </Flex>
            <AppCard>
                <VStack align={"stretch"} spacing={6}>
                    {loading ? <DatagridSkeleton /> : <Box><AppTable checkbox={checkbox} empty={empty} rows={rows} /></Box>}
                    {pagination && <Pagination {...pagination} />}
                </VStack>
            </AppCard>
        </VStack>
    )
}

export default AppDataGrid