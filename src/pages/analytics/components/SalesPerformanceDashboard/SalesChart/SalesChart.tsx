import { Flex } from '@chakra-ui/react'
import { SalesData } from 'lib/apis/dashboard/interfaces'
import React from 'react'
import ChartToolbar from './ChartToolbar'
import StackedBarChart from './StackedBarChart'

interface Props {
    salesData?: SalesData[]
}

function SalesChart({ salesData }: Props) {
    return (
        <Flex
            direction="column"
            gap={6}
            padding={4}
        >
            <ChartToolbar />
            <StackedBarChart salesData={salesData} />
        </Flex>
    )
}

export default SalesChart