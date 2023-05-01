import { Box, HStack } from '@chakra-ui/react'
import React from 'react'
import SearchDatagrid from './parts/search/SearchDatagrid'
import SortDatagrid, { IMenuesDatagrid } from './parts/menues/menuesDatagrid'

function FiltersDatagrid({ item }: IMenuesDatagrid) {
    return (
        <HStack spacing={8}>
            <Box><SearchDatagrid /></Box>
            <Box><SortDatagrid item={item} /></Box>
        </HStack>
    )
}

export default FiltersDatagrid