import { Grid, Skeleton } from '@chakra-ui/react'
import React from 'react'

// Helper function to generate Skeletons
const renderSkeletons = (count: number, height: string) => {
    return [...Array(count)].map((_, index) => (
        <Skeleton key={index} borderRadius={16} height={height} />
    ))
}

function DashboardLoading() {
    return (
        <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={{ base: 4, xl: 6 }}
        >
            {/* Render large skeletons for the first section */}
            {renderSkeletons(4, '181px')}

            {/* Render smaller skeletons for the second section */}
            {renderSkeletons(4, '70px')}
        </Grid>
    )
}

export default DashboardLoading