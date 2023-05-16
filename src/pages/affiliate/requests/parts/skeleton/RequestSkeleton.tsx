import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/shared/skeleton/AppSkeleton'
import React from 'react'

function RequestSkeleton() {
    return (
        <VStack align={"stretch"} spacing={8}>
            {[1, 1, 1, 1].map((el, key) => (
                <Flex key={key}>
                    <Flex width={"80%"} gap={4}>
                        <Box width={"30%"}>
                            <AppSkeleton width="100%" height="200px" isLoaded={false}>{""}</AppSkeleton>
                        </Box>
                        <VStack align={"stretch"} width={"70%"} spacing={3}>
                            <AppSkeleton width="100%" maxWidth={"500px"} height="20px" isLoaded={false}>{""}</AppSkeleton>
                            <AppSkeleton width="70%" maxWidth={"200px"} height="20px" isLoaded={false}>{""}</AppSkeleton>
                            <AppSkeleton width="50%" maxWidth={"100px"} height="20px" isLoaded={false}>{""}</AppSkeleton>
                        </VStack>
                    </Flex>
                    <VStack width={"20%"}>
                        <AppSkeleton width="100px" height="40px" isLoaded={false}>{""}</AppSkeleton>
                    </VStack>
                </Flex>
            ))}
        </VStack>
    )
}

export default RequestSkeleton