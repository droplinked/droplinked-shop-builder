import { Box, Flex, Text } from "@chakra-ui/react";
import useOnboardingStore from "pages/onboarding/store/useOnboardingStore";
import React from "react";
import ShopLogo from "./ShopLogo";

const HeaderIcon = () => (
    <Box
        position="relative"
        w="36px"
        h="36px"
        borderRadius={8}
        background="#1c1c1c"
    />
);

export default function ShopBar() {
    const { storeData: { name } } = useOnboardingStore();

    return (
        <Flex
            position="relative"
            width="100%"
            padding={"0 24px 9px 0"}
            borderBottom="1px solid #292929"
            background="#141414"
            flexDirection={{ base: "column", md: "row" }}
            alignItems={{ base: "start", md: "center" }}
            gap={{ base: "3.5rem", sm: 0 }}
        >
            <ShopLogo />
            <Flex
                position={"relative"}
                width="100%"
                flex={1}
                bottom={{ base: "7rem", sm: "4rem", md: "1rem", lg: "2rem" }}
                paddingLeft={6}
                alignItems={{ base: "start", sm: "center" }}
                justifyContent="space-between"
                flexDirection={{ base: "column", sm: "row" }}
                gap={{ base: 2, sm: 0 }}
            >
                <Text fontSize={{ base: 20, xl: 24 }} fontWeight={700} color="#fff" >
                    {name || "Shop Name"}
                </Text>
                <Flex
                    display="flex"
                    gap={3}
                >
                    <HeaderIcon />
                    <HeaderIcon />
                    <HeaderIcon />
                    <HeaderIcon />
                </Flex>
            </Flex>
        </Flex>
    );
}
