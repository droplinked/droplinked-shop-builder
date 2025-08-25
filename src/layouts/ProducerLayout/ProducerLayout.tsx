import { Grid, GridItem } from '@chakra-ui/react'
import { ProducerLayoutProvider } from 'context/ProducerLayoutContext'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/layout/ProducerLayout/ar.json'
import enLocale from 'locales/layout/ProducerLayout/en.json'
import React, { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface ProducerLayoutProps extends PropsWithChildren {
    hideSidebar?: boolean
    showBackground?: boolean
}

function ProducerLayout({ children, hideSidebar = false, showBackground = false }: ProducerLayoutProps) {
    useLocaleResources('layout/ProducerLayout', { en: enLocale, ar: arLocale })

    return (
        <ProducerLayoutProvider>
            <Grid
                position="relative"
                templateColumns={hideSidebar ? '1fr' : { md: '72px 1fr', xl: '288px 1fr' }}
                templateRows="auto 1fr auto"
                minH="100vh"
            >
                {!hideSidebar && <Sidebar />}
                <Header />
                <GridItem
                    as="main"
                    padding={4}
                    overflow="auto"
                    bgImage={showBackground ? "assets/images/multi-shop-bg.jpg" : "none"}
                    bgSize="cover"
                    bgPosition="center"
                >
                    {children ?? <Outlet />}
                </GridItem>
            </Grid>
        </ProducerLayoutProvider>
    )
}

export default ProducerLayout