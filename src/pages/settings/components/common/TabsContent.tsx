import React from "react";
import { useFormikContext } from "formik";
import AppTab from "components/redesign/AppTab/AppTab";
import General from "../pages/general/General";
import PrivacyAndSecurity from "../pages/privacy-and-security/PrivacyAndSecurity";
import PaymentAndWallets from "../pages/payment-and-wallets/PaymentAndWallets";
import CreditAndCoupons from "../pages/credit-and-coupons/CreditAndCoupons";
import UserManagement from "../pages/user-management/UserManagement";

function TabsContent() {
    const { isSubmitting } = useFormikContext();

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

    return <AppTab tabs={tabs} isDisabled={isSubmitting} />;
}

export default TabsContent;
