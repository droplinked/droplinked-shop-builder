import { UseDisclosureReturn } from '@chakra-ui/react'
import React from 'react'
import { DesktopHeader } from './DesktopHeader'
import { MobileHeader } from './MobileHeader'

interface HeaderProps {
    breakpoint: 'mobile' | 'tablet' | 'desktop'
    disclosure: Pick<UseDisclosureReturn, 'onOpen'>
}

export const Header = ({ breakpoint, disclosure }: HeaderProps) => {
    return breakpoint === 'mobile'
        ? <MobileHeader disclosure={disclosure} />
        : <DesktopHeader />
}