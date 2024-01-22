import { VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function LoginMethodsLoading() {
    return (
        <VStack align={"stretch"}>
            <AppSkeleton isLoaded={false} height="72px">{""}</AppSkeleton>
            <AppSkeleton isLoaded={false} height="72px">{""}</AppSkeleton>
        </VStack>
    )
}

export default LoginMethodsLoading