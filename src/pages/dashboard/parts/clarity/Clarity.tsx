import { SimpleGrid } from '@chakra-ui/react'
import { getClarityDataService } from 'lib/apis/dashboard/dashboardServices'
import React from 'react'
import { useQuery } from 'react-query'
import clarityContext from './context'
import DataGrid from './parts/data-grid/DataGrid'
import TopCountries from './parts/top-countries/TopCountries'

function Clarity() {
    const { isLoading, data } = useQuery("clarityData", getClarityDataService)
    const clarityData = data?.data

    return (
        <clarityContext.Provider value={{ clarityData, isLoading }}>
            <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={6}>
                <DataGrid />
                <TopCountries />
            </SimpleGrid>
        </clarityContext.Provider>
    )
}

export default Clarity