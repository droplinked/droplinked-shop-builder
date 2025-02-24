import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import AppCard from "components/common/card/AppCard";
import AppSkeleton from "components/common/skeleton/AppSkeleton";
import React from "react";
export const ConnectWalletsLoading = () => {
    return (
        <AppCard>
            <VStack spacing={3} align="stretch">
                <VStack align="stretch" spacing="8px">
                    <Flex backgroundColor="#141414" height="55px" padding="0 18px" alignItems="center" justifyContent="space-between" borderRadius="8px" color="#C2C2C2">
                        <HStack alignItems="center">
                            <AppSkeleton isLoaded={false} height="36px" width={"36px"} rounded={"full"} />
                            <AppSkeleton isLoaded={false} height="12px" width={"128px"} rounded={"0px"} />
                        </HStack>
                        <Box>
                            <AppSkeleton isLoaded={false} height="32px" width={"100px"} rounded={"8px"} />
                        </Box>
                    </Flex>
                    <Flex backgroundColor="#141414" height="55px" padding="0 18px" alignItems="center" justifyContent="space-between" borderRadius="8px" color="#C2C2C2">
                        <HStack alignItems="center">
                            <AppSkeleton isLoaded={false} height="36px" width={"36px"} rounded={"full"} />
                            <AppSkeleton isLoaded={false} height="12px" width={"128px"} rounded={"0px"} />
                        </HStack>
                        <Box>
                            <AppSkeleton isLoaded={false} height="32px" width={"100px"} rounded={"8px"} />
                        </Box>
                    </Flex>
                    <Flex backgroundColor="#141414" height="55px" padding="0 18px" alignItems="center" justifyContent="space-between" borderRadius="8px" color="#C2C2C2">
                        <HStack alignItems="center">
                            <AppSkeleton isLoaded={false} height="36px" width={"36px"} rounded={"full"} />
                            <AppSkeleton isLoaded={false} height="12px" width={"128px"} rounded={"0px"} />
                        </HStack>
                        <Box>
                            <AppSkeleton isLoaded={false} height="32px" width={"100px"} rounded={"8px"} />
                        </Box>
                    </Flex>
                    <Flex backgroundColor="#141414" height="55px" padding="0 18px" alignItems="center" justifyContent="space-between" borderRadius="8px" color="#C2C2C2">
                        <HStack alignItems="center">
                            <AppSkeleton isLoaded={false} height="36px" width={"36px"} rounded={"full"} />
                            <AppSkeleton isLoaded={false} height="12px" width={"128px"} rounded={"0px"} />
                        </HStack>
                        <Box>
                            <AppSkeleton isLoaded={false} height="32px" width={"100px"} rounded={"8px"} />
                        </Box>
                    </Flex>
                    <Flex backgroundColor="#141414" height="55px" padding="0 18px" alignItems="center" justifyContent="space-between" borderRadius="8px" color="#C2C2C2">
                        <HStack alignItems="center">
                            <AppSkeleton isLoaded={false} height="36px" width={"36px"} rounded={"full"} />
                            <AppSkeleton isLoaded={false} height="12px" width={"128px"} rounded={"0px"} />
                        </HStack>
                        <Box>
                            <AppSkeleton isLoaded={false} height="32px" width={"100px"} rounded={"8px"} />
                        </Box>
                    </Flex>
                    <Flex backgroundColor="#141414" height="55px" padding="0 18px" alignItems="center" justifyContent="space-between" borderRadius="8px" color="#C2C2C2">
                        <HStack alignItems="center">
                            <AppSkeleton isLoaded={false} height="36px" width={"36px"} rounded={"full"} />
                            <AppSkeleton isLoaded={false} height="12px" width={"128px"} rounded={"0px"} />
                        </HStack>
                        <Box>
                            <AppSkeleton isLoaded={false} height="32px" width={"100px"} rounded={"8px"} />
                        </Box>
                    </Flex>
                </VStack>
            </VStack>
        </AppCard>
    );
};
