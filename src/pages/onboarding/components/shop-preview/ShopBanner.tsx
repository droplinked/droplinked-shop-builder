import { Flex, Text } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import AppImage from 'components/common/image/AppImage'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'

export default function ShopBanner() {
    const { t } = useLocaleResources('onboarding')
    const { shopData } = useOnboardingStore()
    const { hero_section, logo } = shopData

    return (
        <Flex
            position="relative"
            height={{ base: "250px", xl: "400px" }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={6}
            background={hero_section ? `url(${hero_section})` : "transparent"}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
        >
            {!hero_section &&
                <>
                    {logo
                        ? <AppImage src={logo} width="80px" height="80px" borderRadius="full" />
                        : <Drop3 width="80px" height="80px" color='#2bcfa1' />
                    }
                    <Text
                        fontSize={{ base: 16, xl: 24 }}
                        fontWeight={{ base: 500, xl: 700 }}
                        color="#b1b1b1"
                    >
                        {t('ShopPreview.banner.tagline')}
                    </Text>
                </>
            }
        </Flex>
    )
}
