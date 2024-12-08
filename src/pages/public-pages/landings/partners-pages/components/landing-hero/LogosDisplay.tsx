import { Circle, Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import { usePartnerContext } from '../../context/partner.context'


// Displays the main Droplinked logo alongside the partner's logo
export default function LogosDisplay() {
    const { partnerLogo } = usePartnerContext()
    return (
        <Flex justifyContent="center" gap={8}>
            <GradientCircle gradient="radial-gradient(50% 100% at 50% 0%, rgba(43, 207, 161, 0.04) 0%, rgba(43, 207, 161, 0.16) 100%)">
                <AppIcons.SidebarDroplinked />
            </GradientCircle>
            <GradientCircle gradient="radial-gradient(50% 100% at 50% 0%, rgba(88, 68, 231, 0.08) 0%, rgba(88, 68, 231, 0.16) 100%)">
                {partnerLogo}
            </GradientCircle>
        </Flex>
    )
}

const GradientCircle = ({ children, gradient }) => {
    return (
        <Circle
            size={{ base: "80px", md: "96px", lg: "120px" }}
            borderRadius="50%"
            border="1px solid rgba(255, 255, 255, 0.16)"
            bg={gradient}
            boxShadow="inset 0px -2px 4px rgba(255, 255, 255, 0.16)"
            backdropFilter="blur(6px)"
            sx={{
                svg: {
                    width: { base: "40px !important", md: "48px !important", lg: "64px !important" },
                    height: { base: "40px !important", md: "48px !important", lg: "64px !important" },
                    path: { fill: "white" }
                }
            }}
        >
            {children}
        </Circle>
    )
}
