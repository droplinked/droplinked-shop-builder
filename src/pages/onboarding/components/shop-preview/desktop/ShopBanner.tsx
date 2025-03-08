import { Flex, Text } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import AppImage from 'components/common/image/AppImage';
import useOnboardingStore from 'pages/onboarding/store/useOnboardingStore'
import React from 'react'

export default function ShopBanner() {
    const { storeData } = useOnboardingStore();
    const { coverImage, logoUrl } = storeData

    return (
        <Flex
            height={{ base: "250px", xl: "400px" }}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={6}
            background={coverImage ? `url(${coverImage})` : "transparent"}
            backgroundPosition={"center"}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
        >
            {!coverImage &&
                <>
                    {logoUrl ? <AppImage borderRadius={"full"} src={logoUrl} width={"80px"} height={"80px"} /> : <Drop3 color='#2bcfa1' width={"80px"} height={"80px"} />}
                    <Text
                        color={"#b1b1b1"}
                        fontSize={{ base: 16, xl: 24 }}
                        fontWeight={{ base: 500, xl: 700 }}
                    >
                        The Next Generation of Commerce
                    </Text>
                </>
            }
        </Flex>
    )
}
