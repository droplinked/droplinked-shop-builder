import { Grid, GridItem } from '@chakra-ui/react'
import { ProducerLayoutProvider } from 'context/ProducerLayoutContext'
import useAppStore from 'lib/stores/app/appStore'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React, { PropsWithChildren, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'

export const ProducerLayout = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate()
    const { user } = useAppStore()
    const { resetOnboarding } = useOnboardingStore()

    // Redirect users with specific statuses
    useEffect(() => {
        if (['PROFILE_COMPLETED', 'VERIFIED'].includes(user?.status))
            navigate('/onboarding?entry=store-details')
        else resetOnboarding()
    }, [user, navigate, resetOnboarding])

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
                <GridItem as="main" padding={4}>
                    {children ?? <Outlet />}
                </GridItem>
            </Grid>
        </ProducerLayoutProvider>
    )
}