import { Flex, Text } from "@chakra-ui/react"
import useOnboardingStore from "pages/onboarding/store/useOnboardingStore"
import React from "react"
import HeaderIcon from "./HeaderIcon"
import ShopLogo from "./ShopLogo"

export default function ShopBar() {
    const { storeData: { name } } = useOnboardingStore()

    return (
        <Flex
            position="relative"
            width="100%"
            padding="0 24px 9px 0"
            borderBottom="1px solid #292929"
            background="#141414"
            flexDirection={{ base: "column", lg: "row" }}
            alignItems={{ base: "start", lg: "center" }}
            gap={{ base: "3.5rem", sm: 0 }}
            height={{ base: "10rem", sm: "8rem", lg: "6rem" }}
        >
            <ShopLogo />
            <Flex
                position={"relative"}
                width="100%"
                flex={1}
                bottom={{ base: "6rem", sm: "2.5rem", lg: "0.5rem" }}
                paddingLeft={6}
                alignItems={{ base: "start", lg: "center" }}
                justifyContent="space-between"
                flexDirection={{ base: "column", sm: "row" }}
                gap={{ base: 2, sm: 0 }}
            >
                <Text fontSize={{ base: 20, xl: 24 }} fontWeight={700} color="#fff" >
                    {name || "Shop Name"}
                </Text>
                <Flex gap={3}>
                    <HeaderIcon />
                    <HeaderIcon />
                    <HeaderIcon />
                    <HeaderIcon />
                </Flex>
            </Flex>
        </Flex>
    )
}
