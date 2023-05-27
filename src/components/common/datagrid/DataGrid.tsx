import { Box, Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import AppCard from '../card/AppCard'
import AppTable, { IAppTable } from '../table/AppTable'
import FiltersDatagrid from 'components/common/datagrid/parts/filters/FiltersDatagrid'
import { IIMenuesDatagridItems } from 'components/common/datagrid/parts/filters/parts/menues/menuesDatagrid'
import DatagridButtons, { IDatagridButtons } from './parts/buttons/DatagridButtons'
import DatagridSkeleton from './parts/skeleton/DatagridSkeleton'

type mergeType = IDatagridButtons & IAppTable

interface IProps extends mergeType {
    filters?: Array<IIMenuesDatagridItems>
    loading: boolean
}

function AppDataGrid({ filters, rows, buttons, loading, empty }: IProps) {
    return (
        <AppCard>
            <VStack align={"stretch"} spacing={6}>
                <Flex justifyContent={"space-between"}>
                    <Box><FiltersDatagrid item={filters} /></Box>
                    {buttons && <DatagridButtons buttons={buttons} />}
                </Flex>
                {loading ? <DatagridSkeleton /> : <Box><AppTable empty={empty} rows={rows} /></Box>}
            </VStack>
        </AppCard >
    )
}

export default AppDataGrid