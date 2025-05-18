import { Box, Grid, GridItem } from '@chakra-ui/react'
import { ProducerLayoutProvider } from 'context/ProducerLayoutContext'
import React, { ReactNode } from 'react'
import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'

interface ProducerLayoutProps {
    children?: ReactNode
}

export const ProducerLayout = ({ children }: ProducerLayoutProps) => {
    return (
        <ProducerLayoutProvider>
            <Grid
                templateColumns={{ base: '1fr', md: '288px 1fr' }}
                templateRows="auto 1fr auto"
                minH="100vh"
            >
                <Sidebar />
                <Header />
                <GridItem>
                    <Box as="main">{children}</Box>
                </GridItem>
            </Grid>
        </ProducerLayoutProvider>
    )
}