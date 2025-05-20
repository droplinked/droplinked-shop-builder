import { useProducerLayout } from 'context/ProducerLayoutContext'
import React from 'react'
import { DesktopHeader } from './DesktopHeader'
import MobileHeader from './MobileHeader'

export const Header = () => {
    const { breakpoint } = useProducerLayout()

    return breakpoint === 'mobile' ? <MobileHeader /> : <DesktopHeader />
}