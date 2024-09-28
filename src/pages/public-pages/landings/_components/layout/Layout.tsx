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
                gap={{ base: 150, md: 200 }}
                paddingInline={{ base: "16px", sm: "28px" }}
                paddingBlock={120}
            >
                {children}
            </Flex>
        </Flex>
    )
}

export default Layout