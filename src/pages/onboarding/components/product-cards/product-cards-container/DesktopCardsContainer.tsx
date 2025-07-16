import { Box } from "@chakra-ui/react"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import React, { PropsWithChildren } from "react"
import DroplinkedBrand from "../../common/DroplinkedBrand"

function DesktopCardsContainer({ children }: PropsWithChildren) {
    const { isRTL } = useLocaleResources('onboarding')

    return (
        <Box
            as="section"
            height="100%"
            borderTop="8px solid #141414"
            borderLeft={isRTL ? "unset" : "8px solid #141414"}
            borderRight={isRTL ? "8px solid #141414" : "unset"}
            borderTopLeftRadius={isRTL ? "unset" : 24}
            borderTopRightRadius={isRTL ? 24 : "unset"}
            bgColor="neutral.gray.1000"
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