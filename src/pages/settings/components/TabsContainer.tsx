import { Tab, TabList, Tabs } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TabsContainer() {
    const navigate = useNavigate()
    const location = useLocation()
    const tabs = [
        {
            title: "General",
            route: "general",
        },
        {
            title: "Privacy and Security",
            route: "privacy-and-security",
        },
        {
            title: "Payments and Wallets",
            route: "payments-and-wallets",
        },
        {
            title: "Credits and Coupons",
            route: "credits-and-coupons",
        },
        {
            title: "User Management",
            route: "user-management",
        },
    ]

    return (
        <Tabs variant={"unstyled"} width={"100%"} borderTop={"1px solid #292929"} borderBottom={"none"}>
            <TabList borderBottom={"1px solid #292929"}>
                {
                    tabs.map((tab, index) => {
                        const isSelected = location.pathname.endsWith(tab.route);

                        return (
                            <Tab aria-selected={"false"} {...isSelected && { borderBottom: "1px solid #fff" }} _focusWithin={{ background: "transparent", borderBottom: "1px solid #fff" }} px={6} py={4} onClick={() => navigate(tab.route)} key={index}>
                                <AppTypography color={location.pathname.endsWith(tab.route) ? "#fff" : "#7B7B7B"} fontSize={16}>{tab.title}</AppTypography>
                            </Tab>
                        )
                    })
                }
            </TabList>
        </Tabs >
    );
}

export default TabsContainer;