import AppIcons from "assest/icon/Appicons";
import Button from "components/redesign/button/Button";
import PremiumBadge from "pages/settings/components/common/PremiumBadge";
import SectionContainer from "pages/settings/components/common/SectionContainer";
import React from "react";
import CouponsTable from "./CouponsTable";
import useAppStore from "lib/stores/app/appStore";
import UpgradePlan from "pages/settings/components/common/upgrade-plan/UpgradePlan";
import { useDisclosure } from "@chakra-ui/react";

export default function Coupons() {
    const { shop: { subscription: { subscriptionId } } } = useAppStore()
    const isPremiumOrHigher = (subscriptionId?.type && subscriptionId?.type !== "STARTER" && subscriptionId?.type !== "BUSINESS")
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <SectionContainer
            description="Manage your discounts and coupons you want to give to users."
            title="Coupons"
            badge={<PremiumBadge />}
            rightContent={
                <Button
                    sx={{ path: { stroke: "#179ef8" } }}
                    color={"#179ef8"}
                    variant="outline"
                    border={"none"}
                    isDisabled={!isPremiumOrHigher}
                    background={"transparent"}
                    onClick={onOpen}
                >
                    <AppIcons.BluePlus />
                    Create
                </Button>
            }
        >
            {isPremiumOrHigher ? <CouponsTable {...{ isOpen, onClose }} /> : <UpgradePlan />}
        </SectionContainer>
    );
}
