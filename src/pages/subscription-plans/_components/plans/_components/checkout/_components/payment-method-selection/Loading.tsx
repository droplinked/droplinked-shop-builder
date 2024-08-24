import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function Loading() {
    const generateSkeletons = () =>
        Array.from({ length: 3 }).map((_, key) =>
            <AppSkeleton
                key={key}
                width={"100%"}
                height={"56px"}
                borderRadius={8}
                isLoaded={false}
            >
                {" "}
            </AppSkeleton>
        )

    return <>{generateSkeletons()}</>
}

export default Loading