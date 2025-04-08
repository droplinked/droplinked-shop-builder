import { Grid, GridProps } from '@chakra-ui/react'
import React from 'react'

function DashboardSummaryGrid({ children, ...props }: GridProps) {
    return (
        <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={{ base: 4, "2xl": 6 }}
            {...props}
        >
            {children}
        </Grid>
    )
}

export default DashboardSummaryGrid