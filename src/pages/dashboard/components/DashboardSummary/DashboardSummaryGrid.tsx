import { Grid } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

function DashboardSummaryGrid({ children }: PropsWithChildren) {
    return (
        <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={{ base: 4, xl: 6 }}
        >
            {children}
        </Grid>
    )
}

export default DashboardSummaryGrid