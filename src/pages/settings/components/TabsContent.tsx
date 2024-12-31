import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React, { useState } from "react";
import General from "./pages/general/General";
import PrivacyAndSecurity from "./pages/privacy-and-security/PrivacyAndSecurity";
import PaymentAndWallets from "./pages/payment-and-wallets/PaymentAndWallets";
import CreditAndCoupons from "./pages/credit-and-coupons/CreditAndCoupons";
import UserManagement from "./pages/user-management/PrivacyAndSecurity";

function TabsContent() {
    const [selectedTab, setSelectedTab] = useState("General");

    const tabs = [
        {
            title: "General",
            content: <General />
        },
        {
            title: "Privacy and Security",
            content: <PrivacyAndSecurity />
        },
        {
            title: "Payments and Wallets",
            content: <PaymentAndWallets />
        },
        {
            title: "Credits and Coupons",
            content: <CreditAndCoupons />
        },
        {
            title: "User Management",
            content: <UserManagement />
        },
    ];

    return (
        <Tabs
            variant={"unstyled"} width={"100%"} borderTop={"1px solid #292929"} borderBottom={"none"}
        >
            <TabList borderBottom={"1px solid #292929"}>
                {tabs.map((tab, index) => {
                    const isSelected = selectedTab === tab.title;

                    return (
                        <Tab
                            aria-selected={"false"}
                            _focusWithin={{
                                background: "transparent",
                                borderBottom: "1px solid #fff",
                            }}
                            _selected={{
                                borderBottom: `1px solid #fff`
                            }}
                            px={6} py={4}
                            key={index}
                            onClick={() => setSelectedTab(tab.title)}
                        >
                            <AppTypography color={isSelected ? "#fff" : "#7B7B7B"} fontWeight={isSelected ? 500 : 400} fontSize={16}
                            >
                                {tab.title}
                            </AppTypography>
                        </Tab>
                    );
                })}
            </TabList>
            <TabPanels>
                {tabs.map((tab, index) => (
                    <TabPanel padding={0} key={index}>
                        {tab.content}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}

export default TabsContent;
