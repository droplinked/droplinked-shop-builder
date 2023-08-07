import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function CouponsLoading() {
    return (
        <VStack align="stretch" spacing="30px">
            <Flex justifyContent="space-between">
                <AppSkeleton isLoaded={false}><Box width="300px" height="40px"></Box></AppSkeleton>
                <AppSkeleton isLoaded={false}><Box width="100px" height="40px"></Box></AppSkeleton>
            </Flex>
            <VStack align="stretch">
                <AppSkeleton isLoaded={false}><Box height="140px"></Box></AppSkeleton>
                <AppSkeleton isLoaded={false}><Box height="140px"></Box></AppSkeleton>
                <AppSkeleton isLoaded={false}><Box height="140px"></Box></AppSkeleton>
            </VStack>
        </VStack>
    )
}

export default CouponsLoading