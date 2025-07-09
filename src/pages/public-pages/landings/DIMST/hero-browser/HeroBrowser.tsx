import { Flex, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import PanelTitle from './PanelTitle'
import TopBar from './TopBar'

export default function HeroBrowser({ children }) {
    const isMobile = useBreakpointValue({ base: true, md: false })

    return (
        <Flex flexDirection="column">
            {!isMobile &&
                <>
                    <TopBar />
                    <PanelTitle />
                </>
            }
            {children}
        </Flex>
    )
}
