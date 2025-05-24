import { Grid, GridItem } from '@chakra-ui/react'
import { ProducerLayoutProvider } from 'context/ProducerLayoutContext'
import AdminHoc from 'hoc/admin/adminHoc'
import useAppStore from 'stores/app/appStore'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React, { PropsWithChildren, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface ProducerLayoutProps extends PropsWithChildren {
    hideSidebar?: boolean
    showBackground?: boolean
}

function ProducerLayout({ children, hideSidebar = false, showBackground = false }: ProducerLayoutProps) {
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
                templateColumns={{ base: '1fr', md: hideSidebar ? '1fr' : '72px 1fr', xl: hideSidebar ? '1fr' : '288px 1fr' }}
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

export default AdminHoc(ProducerLayout)