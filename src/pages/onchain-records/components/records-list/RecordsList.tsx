import React from 'react'
import RecordItem from './RecordItem'
import { Grid } from '@chakra-ui/react'

export default function RecordsList() {
    return (
        <Grid
            templateColumns={{
                base: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)',
            }}
            gap={6}
        >
            <RecordItem key={"fdsfsdffdsfsdf"} />
            <RecordItem key={"fdsfsdf"} />
            <RecordItem key={"record3"} />
            <RecordItem key={"record4"} />
            <RecordItem key={"record5"} />
            <RecordItem key={"record6"} />
            <RecordItem key={"record7"} />
        </Grid>
    )
}
