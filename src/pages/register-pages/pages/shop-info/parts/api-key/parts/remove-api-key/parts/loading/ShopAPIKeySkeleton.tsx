import { Flex } from "@chakra-ui/react"
import AppSkeleton from "components/common/skeleton/AppSkeleton"
import React from "react"

function ShopAPIKeySkeleton() {
    return (
        <Flex direction={"column"} gap={"36px"}>
            <Flex direction={"column"} gap={"12px"}>
                <AppSkeleton isLoaded={false} width={"100px"} height="24px">{''}</AppSkeleton>
                <AppSkeleton isLoaded={false} width={"100%"} height="24px">{''}</AppSkeleton>
                <AppSkeleton isLoaded={false} width={"100%"} height="24px">{''}</AppSkeleton>
            </Flex>

            <Flex direction={"column"} gap={"12px"}>
                <AppSkeleton isLoaded={false} width={"100px"} height="24px">{''}</AppSkeleton>
                <AppSkeleton isLoaded={false} width={"100%"} height="24px">{''}</AppSkeleton>
            </Flex>
        </Flex>
    )
}

export default ShopAPIKeySkeleton