import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import DroplinkedBrand from "./DroplinkedBrand";
import Stepper from "./stepper/Stepper";
import { ResponsiveValue } from "@chakra-ui/react";

interface OnboardingPageHeaderProps {
    showOnlyImage?: ResponsiveValue<boolean>;
}

function OnboardingPageHeader({ showOnlyImage = false }: OnboardingPageHeaderProps) {
    return (
        <Box minW="360px">
            <Box 
                display={{ base: showOnlyImage ? 'block' : 'none', md: 'none' }} 
                height="214px" 
                width="100%"
                overflow="hidden"
            >
                <Image 
                    src="https://upload-file-droplinked.s3.amazonaws.com/7c35c44c33962ec46b0d626b7a810fa9959c49c1e3ac3d6a539298aba92ba5c8.png"
                    alt="Droplinked Onboarding"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                />
            </Box>
            <Flex
                display={{ base: showOnlyImage ? 'none' : 'flex', md: 'flex' }}
                flexDirection={{ base: 'row', lg: 'column' }}
                gap={{ base: 0, lg: 12 }}
                justifyContent={{ base: 'space-between', lg: 'center' }}
            >
                <DroplinkedBrand />
                <Stepper />
            </Flex>
        </Box>
    )
}

export default OnboardingPageHeader