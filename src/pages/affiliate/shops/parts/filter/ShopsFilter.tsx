import { HStack } from '@chakra-ui/react'
import FiltersDatagrid from 'components/common/datagrid/parts/filters/FiltersDatagrid'
import SearchDatagrid from 'components/common/datagrid/parts/search/SearchDatagrid'
import React from 'react'

function ShopsFilter() {
    const filters = [
        {
            title: "Sort",
            list: [
                {
                    title: "New Window",
                    onClick: () => { }
                },
                {
                    title: "Open Closed Tab",
                    onClick: () => { }
                }
            ]
        },
        {
            title: "Filter",
            list: [
                {
                    title: "New Window",
                    onClick: () => { }
                },
                {
                    title: "Open Closed",
                    onClick: () => { }
                }
            ]
        }
    ]

    return (
        <HStack spacing={7}>
            <SearchDatagrid />
            <FiltersDatagrid item={filters} />
        </HStack>
    )
}

export default ShopsFilter