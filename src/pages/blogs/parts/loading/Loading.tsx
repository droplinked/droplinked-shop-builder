import { SimpleGrid } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function Loading() {
    const generateSkeletons = () =>
        Array.from({ length: 5 }).map((_, key) =>
            <AppSkeleton key={key} width={"100%"} minWidth={"196px"} height={"241px"} borderRadius={8} isLoaded={false}>{" "}</AppSkeleton>)

    return (
        <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            gap={4}
        >
            {generateSkeletons()}
        </SimpleGrid>
    )
}

export default Loading