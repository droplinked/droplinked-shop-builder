import { Flex, Text } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import AppImage from 'components/common/image/AppImage'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'

export default function ShopBanner() {
    const { storeSetup } = useOnboardingStore()
    const { coverImage, logoUrl } = storeSetup

    return (
        <Flex
            position="relative"
            height={{ base: "250px", xl: "400px" }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={6}
            background={coverImage ? `url(${coverImage})` : "transparent"}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
        >
            {!coverImage &&
                <>
                    {logoUrl ?
                        <AppImage src={logoUrl} width="80px" height="80px" borderRadius="full" /> :
                        <Drop3 width="80px" height="80px" color='#2bcfa1' />
                    }
                    <Text
                        fontSize={{ base: 16, xl: 24 }}
                        fontWeight={{ base: 500, xl: 700 }}
                        color={"#b1b1b1"}
                    >
                        The Next Generation of Commerce
                    </Text>
                </>
            }
        </Flex>
    )
}
