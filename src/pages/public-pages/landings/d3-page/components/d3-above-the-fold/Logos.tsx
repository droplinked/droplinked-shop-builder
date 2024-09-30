import { Circle, Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'

export default function Logos() {
    return (
        <Flex justifyContent="center" gap={8}>
            <LogoCircle gradient="radial-gradient(50% 100% at 50% 0%, rgba(43, 207, 161, 0.04) 0%, rgba(43, 207, 161, 0.16) 100%)">
                <AppIcons.SidebarDroplinked width={64} height={64} />
            </LogoCircle>
            <LogoCircle gradient="radial-gradient(50% 100% at 50% 0%, rgba(88, 68, 231, 0.08) 0%, rgba(88, 68, 231, 0.16) 100%)">
                <AppIcons.D3Logo />
            </LogoCircle>
        </Flex>
    )
}

const LogoCircle = ({ children, gradient }) => {
    return (
        <Circle
            size={120}
            borderRadius="50%"
            border="1px solid rgba(255, 255, 255, 0.16)"
            padding={6}
            bg={gradient}
            boxShadow="inset 0px -2px 4px rgba(255, 255, 255, 0.16)"
            backdropFilter="blur(6px)"
            sx={{ svg: { path: { fill: "white" } } }}
        >
            {children}
        </Circle>
    )
}