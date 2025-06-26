import { Box, Flex } from "@chakra-ui/react"
import AppImage from "components/common/image/AppImage"
import useOnboardingStore from "pages/onboarding/stores/useOnboardingStore"
import React from "react"

export default function ShopLogo() {
    const { shopData: { logo } } = useOnboardingStore()

    const defaultUrl = "https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png"
    const isDefaultLogo = logo === defaultUrl

    return (
        <Box
            position="relative"
            width="fit-content"
            marginLeft={6}
            bottom="3rem"
            border="8px solid #141414"
            borderRadius="full"
        >
            <Flex
                padding={isDefaultLogo ? { base: 6, xl: 8 } : 0}
                borderRadius="full"
                background="#1C1C1C"
            >
                <AppImage
                    src={logo}
                    width={isDefaultLogo ? { base: "48px", xl: "64px" } : { base: "88px", xl: "128px" }}
                    height={isDefaultLogo ? { base: "48px", xl: "64px" } : { base: "88px", xl: "128px" }}
                    borderRadius="full"
                    objectFit='cover'
                />
            </Flex>
        </Box>
    )
}
