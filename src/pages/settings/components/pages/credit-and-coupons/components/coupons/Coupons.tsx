import AppIcons from "assest/icon/Appicons";
import SectionContainer from "pages/settings/components/common/SectionContainer";
import React from "react";
import CouponsTable from "./CouponsTable";
import useAppStore from "lib/stores/app/appStore";
import UpgradePlan from "pages/settings/components/common/upgrade-plan/UpgradePlan";
import { useDisclosure } from "@chakra-ui/react";
import AccessLevelBadge from "components/redesign/access-level-badge/AccessLevelBadge";
import BlueButton from "components/redesign/button/BlueButton";

export default function Coupons() {
    const { shop: { subscription: { subscriptionId } } } = useAppStore()
    const isPremiumOrHigher = (subscriptionId?.type && subscriptionId?.type !== "STARTER" && subscriptionId?.type !== "BUSINESS")
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <SectionContainer
            description="Manage your discounts and coupons you want to give to users."
            title="Coupons"
            badge={<AccessLevelBadge justLevel level="Premium" />}
            rightContent={
                <BlueButton
                    fontSize={12}
                    fontWeight={500}
                    sx={{ path: { stroke: "#179ef8" } }}
                    isDisabled={!isPremiumOrHigher}
                    onClick={onOpen}
                >
                    <AppIcons.BluePlus style={{ width: "16px", height: "16px" }} />
                    Create
                </BlueButton>
            }
        >
            {isPremiumOrHigher ? <CouponsTable {...{ isOpen, onClose }} /> : <UpgradePlan />}
        </SectionContainer>
    );
}
