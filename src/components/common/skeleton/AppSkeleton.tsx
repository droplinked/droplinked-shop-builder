import { Skeleton, SkeletonProps } from '@chakra-ui/react'
import React from 'react'

interface IAppSkeleton extends SkeletonProps {
    children?: any
    isLoaded: boolean
}

function AppSkeleton(props: IAppSkeleton) {
    const {isLoaded} = props
    
    return (
        <Skeleton startColor='#333' endColor='#444' {...props} isLoaded={typeof isLoaded !== "undefined" ? isLoaded : true }>{props.children}</Skeleton>
    )
}

export default AppSkeleton