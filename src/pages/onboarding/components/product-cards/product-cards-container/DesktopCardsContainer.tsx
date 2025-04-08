import { Box } from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"
import DroplinkedBrand from "../../common/DroplinkedBrand"

function DesktopCardsContainer({ children }: PropsWithChildren) {
    return (
        <Box
            as="section"
            height="100%"
            borderTop="8px solid #141414"
            borderLeft="8px solid #141414"
            borderTopLeftRadius={24}
            bgColor="#1C1C1C"
        >
            <Box as="header" padding={6} paddingRight={9} borderBottom="1px solid #292929">
                <DroplinkedBrand
                    dropProps={{ width: "32px", height: "32px", color: "#616161" }}
                    typographyProps={{ width: "127px", height: "24px", color: "#616161" }}
                />
            </Box>
            <Box as="main" padding={6} paddingRight={9}>
                <Box w="216px" h="36px" marginBottom={1} borderRadius={8} bgColor="#292929" />
                <Box w="400px" h="24px" marginBottom={9} borderRadius={4} bgColor="#222222" />
                {children}
            </Box>
        </Box>
    )
}

export default DesktopCardsContainer