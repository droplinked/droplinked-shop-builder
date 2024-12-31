import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

export default function SkeletonLoading() {
    return (
        <>
            <AppSkeleton isLoaded={false} borderRadius={8} height={"64px"} />
            <AppSkeleton isLoaded={false} borderRadius={8} height={"64px"} />
            <AppSkeleton isLoaded={false} borderRadius={8} height={"64px"} />
            <AppSkeleton isLoaded={false} borderRadius={8} height={"64px"} />
        </>
    )
}
