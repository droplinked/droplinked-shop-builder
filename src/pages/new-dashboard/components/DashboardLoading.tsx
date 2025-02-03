import { Grid, Skeleton } from '@chakra-ui/react'
import React from 'react'

function DashboardLoading() {
    return (
        <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={{ base: 4, xl: 6 }}
        >
            {[...Array(4)].map((_, index) => (
                <Skeleton key={index} borderRadius={16} height="181px" />
            ))}

            {[...Array(4)].map((_, index) => (
                <Skeleton key={index} borderRadius={16} height="70px" />
            ))}
        </Grid>
    )
}

export default DashboardLoading