import { VStack } from '@chakra-ui/react'
import React from 'react'
import DesignPageBanner from './parts/banner/DesignPageBanner'
import DesignPageTemplate from './parts/design/DesignPageTemplate'
import DesignPagefooter from './parts/footer/DesignPagefooter'
import DesignPageHeader from './parts/header/DesignPageHeader'
import DesignPageIntro from './parts/intro/DesignPageIntro'
import DesignPageProducts from './parts/products/DesignPageProducts'
import DesignPageProfile from './parts/profile/DesignPageProfile'

function DesignPageOptions() {
    return (
        <VStack align="stretch" spacing="18px">
            <DesignPageTemplate />
            <DesignPageHeader />
            <DesignPageIntro />
            <DesignPageProfile />
            <DesignPageProducts />
            <DesignPagefooter />
            <DesignPageBanner />
        </VStack>
    )
}

export default DesignPageOptions