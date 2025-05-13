import { Box, Flex } from '@chakra-ui/react'
import DashboardLayoutHeader from 'components/layouts/dashboard/components/header/DashboardLayoutHeader'
import AdminHoc from 'hoc/admin/adminHoc'
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

interface StandaloneLayoutProps {
    showBackground?: boolean;
    padding?: string;
    children?: React.ReactNode;
}

function StandaloneLayout({ showBackground = true, padding = "86px 36px 24px 36px", children }: StandaloneLayoutProps) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);

    return (
        <Flex minHeight={"100dvh"} direction={"column"} bgColor="neutral.background">
            <DashboardLayoutHeader isDashboard={false} />
            <Box
                minHeight={"80dvh"}
                flex={1}
                padding={padding}
                bgImage={showBackground ? "assets/images/multi-shop-bg.jpg" : "none"}
                bgSize={"cover"}
                bgPosition={"center"}
            >
                {children || <Outlet />}
            </Box>
        </Flex>
    )
}

export default AdminHoc(StandaloneLayout)