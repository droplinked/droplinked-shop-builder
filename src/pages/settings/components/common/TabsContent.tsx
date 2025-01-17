import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React, { useState } from "react";
import General from "../pages/general/General";
import PrivacyAndSecurity from "../pages/privacy-and-security/PrivacyAndSecurity";
import PaymentAndWallets from "../pages/payment-and-wallets/PaymentAndWallets";
import CreditAndCoupons from "../pages/credit-and-coupons/CreditAndCoupons";
import UserManagement from "../pages/user-management/UserManagement";
import { useFormikContext } from "formik";

function TabsContent() {
    const [selectedTab, setSelectedTab] = useState("General");
    const { isSubmitting } = useFormikContext()

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
                    return (
                        <Tab
                            isDisabled={isSubmitting}
                            aria-selected={"false"}
                            _focusWithin={{
                                background: "transparent",
                                borderBottom: "1px solid #fff",
                            }}
                            _selected={{
                                borderBottom: `1px solid #fff`,
                                color: "#fff",
                                fontWeight: 500
                            }}
                            px={6} py={4}
                            color={"#7b7b7b"}
                            fontWeight={400}
                            fontSize={14}
                            key={index}
                            onClick={() => setSelectedTab(tab.title)}
                        >
                            {tab.title}
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
