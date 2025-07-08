import { Flex } from '@chakra-ui/react'
import React from 'react'
import PageHeader from './PageHeader'
import PanelTitle from './PanelTitle'
import TopBar from './TopBar'

export default function HeroBrowser({ children }: { children?: React.ReactNode }) {
    return (
        <Flex flexDirection="column">
            <TopBar />
            <PanelTitle />
            <PageHeader />
            {children}
        </Flex>
    )
}
