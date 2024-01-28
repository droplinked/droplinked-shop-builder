import { Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'

function ModalSkeleton() {
    return (
        <Flex direction={"column"} gap={"16px"} width={"100%"}>
            <AppSkeleton width={"100px"} height={"20px"} isLoaded={false}>{""}</AppSkeleton>
            <Flex direction={"column"} gap={"12px"}>
                {Array.from({ length: 3 }).map((_, key) =>
                    <AppSkeleton key={key} width={"100%"} height={"20px"} isLoaded={false}>{""}</AppSkeleton>)}
            </Flex>
        </Flex>
    )
}

export default ModalSkeleton