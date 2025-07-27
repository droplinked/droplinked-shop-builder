import { Box, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'

export default function HeroChildFrame({ children }: { children?: React.ReactNode }) {
    const paddingInline = useBreakpointValue({ base: "8px", md: "20px", xl: "36px", "2xl": "48px" })
    const isMobile = useBreakpointValue({ base: true, md: false })

    const boxBackground = isMobile ? "neutral.websiteBackground" : "radial-gradient(50% 100% at 50% 0%, rgba(43, 207, 161, 0.24) 0%, rgba(43, 207, 161, 0.00) 100%), linear-gradient(180deg, rgba(43, 207, 161, 0.08) 0%, rgba(43, 207, 161, 0.00) 100%)"

    return (
        <Box paddingInline={paddingInline} margin={{ base: "-28rem 8px 8px", md: "48px auto auto" }} width={{ base: "auto", "2xl": "100%" }}>
            <Box
                padding={{ base: "0px", md: "8px 8px 0px 8px" }}
                border="1px solid rgba(43, 207, 161, 0.32)"
                borderRadius={{ base: "24px", md: "24px 24px 0px 0px" }}
                borderBottom="none"
                background={boxBackground}
                backdropFilter="blur(50px)"
            >
                <Box
                    background="neutral.websiteBackground"
                    borderRadius={{ base: "24px", md: "16px 16px 0 0" }}
                    overflowY="scroll"
                    height={{ base: "auto", md: "648px", xl: "544px", "2xl": "616px" }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}
