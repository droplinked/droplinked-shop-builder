import React from 'react'
import { Grid, useMediaQuery } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'

export default function RecordsSkeleton() {
    const [isSmallerThan425px] = useMediaQuery('(max-width: 425px)');

    return (
        <Grid
            templateColumns={{
                base: `repeat(${isSmallerThan425px ? '2' : '3'}, 1fr)`,
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)'
            }}
            gap={6}
        >
            {
                Array.from({ length: 10 }).map((_, index) => (
                    <AppSkeleton borderRadius={8} width={"100%"} height={{ base: "248px", md: "320px" }} isLoaded={false} key={`skeleton${index}`} />
                ))
            }
        </Grid>
    )
}
