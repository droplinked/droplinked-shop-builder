import { Box, Grid, GridItem } from '@chakra-ui/react'
import { ProducerLayoutProvider } from 'context/ProducerLayoutContext'
import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'

interface ProducerLayoutProps {
    children?: ReactNode
}

export const ProducerLayout = ({ children }: ProducerLayoutProps) => {
    return (
        <ProducerLayoutProvider>
            <Grid
                position="relative"
                templateColumns={{ base: '1fr', md: '72px 1fr', xl: '288px 1fr' }}
                templateRows="auto 1fr auto"
                minH="100vh"
            >
                <Sidebar />
                <Header />
                <GridItem padding={4}>
                    <Box as="main">{children ?? <Outlet />}</Box>
                </GridItem>
            </Grid>
        </ProducerLayoutProvider>
    )
}