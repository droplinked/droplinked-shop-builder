import { Box, Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import AppSkeleton from "components/common/skeleton/AppSkeleton";
import React from "react";

function ProductPageLoading() {
    return (
        <Flex direction={"column"} gap={{ base: "24px", md: "64px" }} py={8}>
            <Flex direction={{ base: "column", md: "row" }} gap={{ base: "24px", md: "48px" }}>
                <Box width={{ base: "100%", md: "40%" }}>
                    <VStack align="stretch" spacing="20px">
                        <AppSkeleton height="500px" isLoaded={true} />
                        <SimpleGrid columns={5} spacing="10px">
                            <AppSkeleton height="60px" isLoaded={true} />
                            <AppSkeleton height="60px" isLoaded={true} />
                            <AppSkeleton height="60px" isLoaded={true} />
                            <AppSkeleton height="60px" isLoaded={true} />
                            <AppSkeleton height="60px" isLoaded={true} />
                        </SimpleGrid>
                    </VStack>
                </Box>
                <Box width={{ base: "100%", md: "60%" }}>
                    <VStack align="stretch" spacing="20px">
                        <AppSkeleton height="50px" isLoaded={true} />
                        <AppSkeleton height="20px" width="40%" isLoaded={true} />
                        <Flex gap="10px">
                            <AppSkeleton height="50px" width="50px" borderRadius="100%" isLoaded={true} />
                            <AppSkeleton height="50px" width="50px" borderRadius="100%" isLoaded={true} />
                            <AppSkeleton height="50px" width="50px" borderRadius="100%" isLoaded={true} />
                            <AppSkeleton height="50px" width="50px" borderRadius="100%" isLoaded={true} />
                            <AppSkeleton height="50px" width="50px" borderRadius="100%" isLoaded={true} />
                        </Flex>
                    </VStack>
                </Box>
            </Flex>
            <AppSkeleton height={6} isLoaded={true} />
        </Flex>
    );
}

export default ProductPageLoading;
