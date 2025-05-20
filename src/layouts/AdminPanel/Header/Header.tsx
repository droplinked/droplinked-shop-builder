import { GridItem } from '@chakra-ui/react'
import { useProducerLayout } from 'context/ProducerLayoutContext'
import React from 'react'
import { DesktopHeader } from './DesktopHeader'
import MobileHeader from './MobileHeader'

export const Header = () => {
    const { breakpoint } = useProducerLayout()

    return (
        <GridItem
            position="sticky"
            top={0}
            borderBottom="1px solid"
            borderColor="neutral.gray.800"
            backgroundColor="neutral.background"
            zIndex={999}
        >
            {breakpoint === 'mobile' ? <MobileHeader /> : <DesktopHeader />}
        </GridItem>
    )
}