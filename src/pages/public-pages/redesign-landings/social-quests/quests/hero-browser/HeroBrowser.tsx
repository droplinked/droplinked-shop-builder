import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import TopBar from './TopBar'
import PanelTitle from './PanelTitle'
import PageHeader from './PageHeader'

export default function HeroBrowser({ children }: { children?: React.ReactNode }) {
    return (
        <Flex flexDirection="column">
            <TopBar />
            <PanelTitle />
            <PageHeader />
            <Box mt={6}>
                {children}
            </Box>
        </Flex>
    )
}
