import { Skeleton } from '@chakra-ui/react'
import React from 'react'

function CategoryLoading() {
    return (
        <>
            {
                Array.from({ length: 4 }).map((_, index) =>
                    <Skeleton
                        key={index}
                        width="full"
                        height="74px"
                        borderRadius={8}
                        isLoaded={false}
                    >
                        {" "}
                    </Skeleton>
                )
            }
        </>
    )
}

export default CategoryLoading