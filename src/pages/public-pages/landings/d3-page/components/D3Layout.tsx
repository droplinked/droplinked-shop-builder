import { Flex } from '@chakra-ui/react'
import React from 'react'

function D3Layout({ children }) {
    return (
        <Flex
            direction={"column"}
            gap={{ base: "120px", lg: "160px", xl: "200px" }}
            paddingTop={{ base: "48px", xl: "72px" }}
            paddingInline={{ base: "16px", md: "36px", lg: "60px" }}
            paddingBottom={"120px"}
            backgroundColor={"#010101"}
            sx={{
                ".d3-icon": {
                    width: { base: "40px !important", md: "56px !important" },
                    height: { base: "40px !important", md: "56px !important" }
                }
            }}
        >
            {children}
        </Flex>
    )
}

export default D3Layout