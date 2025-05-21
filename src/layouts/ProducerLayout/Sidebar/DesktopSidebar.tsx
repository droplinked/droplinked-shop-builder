import { Box, Flex } from '@chakra-ui/react'
import DroplinkedBrand from 'pages/onboarding/components/common/DroplinkedBrand'
import React from 'react'
import NavLinks from './NavLinks'

function DesktopSidebar() {
    return (
        <Flex
            as="aside"
            position="sticky"
            top={0}
            height="100vh"
            direction="column"
            gap={6}
        >
            <Box paddingTop={7} paddingInline={4}>
                <DroplinkedBrand
                    dropProps={{ width: "32px", height: "32px" }}
                    typographyProps={{ width: "127px", height: "24px" }}
                />
            </Box>

            <Box
                flex="1"
                paddingBottom={6}
                paddingInline={4}
                overflowY="auto"
            >
                <NavLinks paddingBlock={9} />
            </Box>
        </Flex>
    )
}

export default DesktopSidebar