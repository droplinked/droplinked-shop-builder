import AppIcons from "assets/icon/Appicons";
import SectionContainer from "pages/settings/components/common/SectionContainer";
import React from "react";
import CouponsTable from "./CouponsTable";
import useAppStore from "stores/app/appStore";
import UpgradePlan from "pages/settings/components/common/upgrade-plan/UpgradePlan";
import { useDisclosure } from "@chakra-ui/react";
import AccessLevelBadge from "components/redesign/access-level-badge/AccessLevelBadge";
import BlueButton from "components/redesign/button/BlueButton";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

export default function Coupons() {
    const { t } = useLocaleResources('settings');
    const { shop: { subscription: { subscriptionId } } } = useAppStore()
    const isPremiumOrHigher = (subscriptionId?.type && subscriptionId?.type !== "STARTER" && subscriptionId?.type !== "BUSINESS")
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <SectionContainer
            description={t("Coupons.description")}
            title={t("Coupons.title")}
            badge={<AccessLevelBadge justLevel level="Premium" />}
            rightContent={
                <BlueButton
                    fontSize={12}
                    fontWeight={500}
                    sx={{ path: { stroke: !isPremiumOrHigher && "#4F4F4F" } }}
                    isDisabled={!isPremiumOrHigher}
                    onClick={onOpen}
                >
                    <AppIcons.BluePlus style={{ width: "16px", height: "16px" }} />
                    {t("Coupons.create")}
                </BlueButton>
            }
        >
            {isPremiumOrHigher ? <CouponsTable {...{ isOpen, onClose }} /> : <UpgradePlan />}
        </SectionContainer>
    );
}
