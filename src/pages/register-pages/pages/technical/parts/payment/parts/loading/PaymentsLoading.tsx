import { VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function PaymentsLoading() {
    return (
        <VStack align={"stretch"}>
            <AppSkeleton isLoaded={false} height="40px">{""}</AppSkeleton>
            <AppSkeleton isLoaded={false} height="40px">{""}</AppSkeleton>
        </VStack>
    )
}

export default PaymentsLoading