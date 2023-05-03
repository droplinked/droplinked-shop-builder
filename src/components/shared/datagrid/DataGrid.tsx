import { Box, Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import AppCard from '../card/AppCard'
import AppTable, { IAppTable } from '../table/AppTable'
import FiltersDatagrid from 'components/shared/datagrid/parts/filters/FiltersDatagrid'
import { IIMenuesDatagridItems } from 'components/shared/datagrid/parts/filters/parts/menues/menuesDatagrid'
import DatagridButtons, { IDatagridButtons } from './parts/buttons/DatagridButtons'
import AppLoading from '../loading/AppLoading'

type mergeType = IDatagridButtons & IAppTable

interface IProps extends mergeType {
    filters: Array<IIMenuesDatagridItems>
    loading: boolean
}

function AppDataGrid({ filters, rows, buttons, loading }: IProps) {
    return (
        <AppCard>
            <VStack align={"stretch"} spacing={6}>
                <Flex justifyContent={"space-between"}>
                    <Box><FiltersDatagrid item={filters} /></Box>
                    {buttons && <DatagridButtons buttons={buttons} />}
                </Flex>
                {loading ? <Box textAlign={"center"}><AppLoading /></Box> : <Box><AppTable rows={rows} /></Box>}
            </VStack>
        </AppCard >
    )
}

export default AppDataGrid