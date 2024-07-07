import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppCard from "components/common/card/AppCard";
import AppSkeleton from "components/common/skeleton/AppSkeleton";
import React from "react";

export const WalletLoginLoading = () => {
    return (
        <VStack spacing={3} align="stretch" width={"full"}>
            <VStack align="stretch" spacing="8px" width={"full"}>
                <Flex backgroundColor="#141414" alignItems="center" justifyContent="space-between" borderRadius="8px" color="#C2C2C2" width={"full"} padding={"16px 16px"}>
                    <HStack alignItems="center">
                        <AppSkeleton isLoaded={false} height="36px" width={"36px"} rounded={"full"} />
                        <AppSkeleton isLoaded={false} height="12px" width={"128px"} rounded={"0px"} />
                    </HStack>
                    <AppIcons.ArrowDown />
                </Flex>
                <Flex backgroundColor="#141414" alignItems="center" justifyContent="space-between" borderRadius="8px" color="#C2C2C2" width={"full"} padding={"16px 16px"}>
                    <HStack alignItems="center">
                        <AppSkeleton isLoaded={false} height="36px" width={"36px"} rounded={"full"} />
                        <AppSkeleton isLoaded={false} height="12px" width={"128px"} rounded={"0px"} />
                    </HStack>
                    <AppIcons.ArrowDown />
                </Flex>
                <Flex backgroundColor="#141414" alignItems="center" justifyContent="space-between" borderRadius="8px" color="#C2C2C2" width={"full"} padding={"16px 16px"}>
                    <HStack alignItems="center">
                        <AppSkeleton isLoaded={false} height="36px" width={"36px"} rounded={"full"} />
                        <AppSkeleton isLoaded={false} height="12px" width={"128px"} rounded={"0px"} />
                    </HStack>
                    <AppIcons.ArrowDown />
                </Flex>
                <Flex backgroundColor="#141414" alignItems="center" justifyContent="space-between" borderRadius="8px" color="#C2C2C2" width={"full"} padding={"16px 16px"}>
                    <HStack alignItems="center">
                        <AppSkeleton isLoaded={false} height="36px" width={"36px"} rounded={"full"} />
                        <AppSkeleton isLoaded={false} height="12px" width={"128px"} rounded={"0px"} />
                    </HStack>
                    <AppIcons.ArrowDown />
                </Flex>
            </VStack>
        </VStack>
    );
};
