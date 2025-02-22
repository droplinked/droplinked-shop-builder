import { VStack } from '@chakra-ui/react'
import React from 'react'
import DesignPageAi from './parts/ai/DesignPageAi'
import DesignPageTemplate from './parts/design/DesignPageTemplate'
import DesignPagefooter from './parts/footer/DesignPagefooter'
import DesignPageHeader from './parts/header/DesignPageHeader'
import DesignPageIntro from './parts/intro/DesignPageIntro'
import DesignPageProducts from './parts/products/DesignPageProducts'
import DesignPageProfile from './parts/profile/DesignPageProfile'
import DesignPageReleaseDate from './parts/releaseDate/DesignPageReleaseDate'

function DesignPageOptions() {
    return (
        <VStack align="stretch" spacing="18px">
            <DesignPageAi />
            <DesignPageTemplate />
            <DesignPageHeader />
            <DesignPageIntro />
            <DesignPageProfile />
            <DesignPageProducts />
            <DesignPagefooter />
            <DesignPageReleaseDate />
        </VStack>
    )
}

export default DesignPageOptions