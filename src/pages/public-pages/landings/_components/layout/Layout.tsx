import { Flex } from '@chakra-ui/react'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Flex justifyContent={"center"}>
            <Flex
                width={{ base: "100%", lg: "80%" }}
                maxWidth="1400px"
                direction="column"
                alignItems={"center"}
                gap={{ base: "64px", md: "120px", lg: "160px" }}
                paddingInline={{ base: 4, sm: 7 }}
                paddingBlock={120}
            >
                {children}
            </Flex>
        </Flex>
    )
}

export default Layout