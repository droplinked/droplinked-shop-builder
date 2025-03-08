import { Box, Flex } from "@chakra-ui/react";
import AppImage from "components/common/image/AppImage";
import useOnboardingStore from "pages/onboarding/store/useOnboardingStore";
import React from "react";

export default function ShopBar() {
    const { storeData: { logoUrl } } = useOnboardingStore();

    const defaultUrl = "https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png";
    const isDefaultLogo = logoUrl === defaultUrl;

    return (
        <Box
            paddingBlockEnd={9}
            background="#141414"
            borderBottom="1px solid #292929"
            position="relative"
        >
            <Box
                border="8px solid #141414"
                marginLeft={6}
                borderRadius="full"
                position="relative"
                bottom="5rem"
                width="fit-content"
            >
                <Flex
                    padding={isDefaultLogo ? 8 : 0}
                    background="#1C1C1C"
                    borderRadius="full"
                >
                    <AppImage
                        src={logoUrl}
                        borderRadius="full"
                        width={isDefaultLogo ? "64px" : "128px"}
                        height={isDefaultLogo ? "64px" : "128px"}
                        display="inline-block"
                        objectFit='cover'
                    />
                </Flex>
            </Box>
        </Box>
    );
}
