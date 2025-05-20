import { Flex } from '@chakra-ui/react'
import DroplinkedBrand from 'pages/onboarding/components/common/DroplinkedBrand'
import React from 'react'
import NavLinks from './NavLinks'

function DesktopSidebar() {
    return (
        <Flex
            as="aside"
            direction="column"
            padding="28px 16px"
            gap={6}
        >
            <DroplinkedBrand
                dropProps={{ width: "32px", height: "32px" }}
                typographyProps={{ width: "127px", height: "24px" }}
            />
            <NavLinks marginBlock={9} />
        </Flex>
    )
}

export default DesktopSidebar