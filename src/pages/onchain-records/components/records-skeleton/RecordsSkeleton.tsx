import React from 'react'
import RecordItem from './FakeRecordItem'
import { Grid } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'

export default function FakeRecordsList() {
    return (
        <Grid
            templateColumns={{
                base: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)',
            }}
            gap={6}
        >
            {
                Array.from({ length: 5 }).map((_, index) => (
                    <AppSkeleton borderRadius={8} isLoaded={false} key={`skeleton${index}`}>
                        <RecordItem />
                    </AppSkeleton>
                ))
            }
        </Grid>
    )
}
