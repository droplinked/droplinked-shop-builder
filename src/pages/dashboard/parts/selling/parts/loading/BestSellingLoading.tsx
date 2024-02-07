import { Box, Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'

function BestSellingLoading() {

    return (
        <VStack align="stretch" paddingTop="15px" spacing="20px">
            <Flex justifyContent="space-between">
                <AppSkeleton isLoaded={false}><Box width="100px" height="10px" backgroundColor="#eee"></Box></AppSkeleton>
                <AppSkeleton isLoaded={false}><Box width="100px" height="10px" backgroundColor="#eee"></Box></AppSkeleton>
            </Flex>
            <VStack align="stretch" spacing="20px">
                {[1, 1, 1, 1, 1].map((el, key) => (
                    <Flex key={key} justifyContent="space-between" alignItems="center">
                        <AppSkeleton isLoaded={false} borderRadius="100%"><Box width="60px" height="60px" backgroundColor="#eee"></Box></AppSkeleton>
                        <VStack align="stretch">
                            <AppSkeleton isLoaded={false}><Box width="100px" height="10px" backgroundColor="#eee"></Box></AppSkeleton>
                            <Flex justifyContent="right">
                                <AppSkeleton isLoaded={false}><Box width="50px" height="10px" backgroundColor="#eee"></Box></AppSkeleton>
                            </Flex>
                        </VStack>
                    </Flex>
                ))}
            </VStack>
        </VStack>
    )
}

export default BestSellingLoading