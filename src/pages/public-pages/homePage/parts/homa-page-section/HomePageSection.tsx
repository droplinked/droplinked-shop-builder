import { Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

function HomePageSection({ children }: { children: ReactNode | ReactNode[] }) {
    return (
        <Flex justifyContent={"center"} position={"relative"}>
            <Flex
                width={{ base: "100%", lg: "80%" }}
                direction={"column"}
                paddingInline={{ base: "16px", sm: "28px" }}
            >
                {children}
            </Flex>
        </Flex>
    )
}

export default HomePageSection