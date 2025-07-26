import React from "react";
import { useFormikContext } from "formik";
import AppTab from "components/redesign/tab/AppTab";
import General from "../pages/general/General";
import PrivacyAndSecurity from "../pages/privacy-and-security/PrivacyAndSecurity";
import PaymentAndWallets from "../pages/payment-and-wallets/PaymentAndWallets";
import CreditAndCoupons from "../pages/credit-and-coupons/CreditAndCoupons";
import UserManagement from "../pages/user-management/UserManagement";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

function TabsContent() {
    const { isSubmitting, dirty } = useFormikContext();
    const { t } = useLocaleResources('settings');

    const tabs = [
        {
            title: t("TabsContent.tabs.general"),
            content: <General />
        },
        {
            title: t("TabsContent.tabs.privacySecurity"),
            content: <PrivacyAndSecurity />
        },
        {
            title: t("TabsContent.tabs.paymentsWallets"),
            content: <PaymentAndWallets />
        },
        {
            title: t("TabsContent.tabs.creditsCoupons"),
            content: <CreditAndCoupons />
        },
        {
            title: t("TabsContent.tabs.userManagement"),
            content: <UserManagement />
        },
    ];

    return (
        <AppTab
            tabs={tabs}
            isDisabled={isSubmitting}
            tabListStyle={{
                overflowY: "hidden",
                sx: {
                    scrollbarWidth: 'none',
                    '::-webkit-scrollbar': {
                        display: 'none',
                    },
                }
            }}
            tabStyle={{ minWidth: { base: "13rem", lg: "unset" } }}
            tabsStyle={{ marginBottom: dirty ? { base: "15rem", lg: "8rem" } : "unset" }}
        />
    );
}

export default TabsContent;