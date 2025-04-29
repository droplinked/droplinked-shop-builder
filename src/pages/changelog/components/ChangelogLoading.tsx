import { Skeleton } from '@chakra-ui/react'
import React from 'react'

function ChangelogLoading() {
    return (
        <>
            {
                Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} height="100px" width="100%" mb={3} />
                ))
            }
        </>
    )
}

export default ChangelogLoading