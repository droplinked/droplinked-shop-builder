import { SimpleGrid } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function Loading() {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
            {
                Array.from({ length: 4 }).map((_, index) =>
                    <AppSkeleton
                        key={index}
                        isLoaded={false}
                        width={"100%"}
                        height={"160px"}
                        borderRadius={8}
                    >
                        {""}
                    </AppSkeleton>
                )
            }
        </SimpleGrid >
    )
}

export default Loading