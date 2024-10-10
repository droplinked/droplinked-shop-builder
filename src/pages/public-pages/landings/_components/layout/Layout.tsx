import { Flex } from '@chakra-ui/react'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Flex justifyContent="center">
            <Flex
                maxWidth="1400px"
                direction="column"
                alignItems={"center"}
                gap={{ base: "120px", lg: "160px", xl: "200px" }}
                paddingBlock={120}
                paddingInline={{ base: 4, md: 9, lg: "60px", xl: "72px" }}
                paddingBottom={{ base: "120px", lg: "160px", xl: "200px" }}
                sx={{ "&>*": { width: "100%" } }}
            >
                {children}
            </Flex>
        </Flex>
    )
}

export default Layout