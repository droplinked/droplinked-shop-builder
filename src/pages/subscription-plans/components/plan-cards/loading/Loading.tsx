import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function Loading() {
    return (
        <>
            {
                Array.from({ length: 4 }).map((_, index) =>
                    <AppSkeleton
                        key={index}
                        width={"100%"}
                        height={"300px"}
                        borderRadius={8}
                        isLoaded={false}
                    >
                        {""}
                    </AppSkeleton>
                )
            }
        </>
    )
}

export default Loading