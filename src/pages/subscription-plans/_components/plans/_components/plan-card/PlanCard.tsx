import { Flex, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";
import { SubscriptionPlan } from "lib/apis/subscription/interfaces";
import { capitalizeFirstLetter } from "lib/utils/heper/helpers";
import PlanHeading from "pages/subscription-plans/_components/PlanHeading";
import React from "react";
import SubscriptionPlanCheckoutModal from "../checkout/SubscriptionPlanCheckoutModal";

const PlanCard = ({ plan, showBuyButton }: { plan: SubscriptionPlan, showBuyButton: boolean }) => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    const { price, type, subOptionIds } = plan
    const isFree = type === "STARTER"
    const isEnterprise = type === "ENTERPRISE"

    const handlePlanPurchase = () => {
        if (isEnterprise) {
            window.location.href = "mailto:Support@droplinked.com"
            return
        }
        onOpen()
    }

    return (
        <>
            <Flex
                direction={"column"}
                gap={4}
                borderRadius={8}
                padding={4}
                bgColor={"#262626"}
            >
                <Flex justifyContent={"center"}>
                    <PlanHeading planTitle={type} fontSize={24} iconSize={24} />
                </Flex>

                <AppTypography
                    textAlign={"center"}
                    color={isFree ? "#2BCFA1" : "#9C4EFF"}
                    fontSize={24}
                    fontWeight={600}
                >
                    {isNaN(Number(price)) ? capitalizeFirstLetter(plan.price) : `$${price}/mo`}
                </AppTypography>

                {showBuyButton && !isFree && <BasicButton onClick={handlePlanPurchase}>{isEnterprise ? "Contact Us" : "Buy"}</BasicButton>}

                {
                    subOptionIds.map(featureGroup =>
                        <Flex key={featureGroup.key} direction={"column"} gap={2}>
                            <AppTypography fontWeight={500} color={"white"}>{featureGroup.title || featureGroup.key}</AppTypography>
                            {
                                featureGroup.value.filter(feature => feature.value).map(feature =>
                                    <Flex key={feature.key} alignItems={"center"} gap={2}>
                                        <AppIcons.Tick />
                                        <AppTypography color={"white"}>
                                            {`${feature.title} ${(isNaN(Number(feature.value)) || typeof feature.value === "boolean") ? "" : `: ${feature.value}`}`}
                                        </AppTypography>
                                    </Flex>
                                )
                            }
                        </Flex>
                    )
                }
            </Flex>
            {isOpen && <SubscriptionPlanCheckoutModal selectedPlan={plan} open={isOpen} close={onClose} />}
        </>
    )
}

export default PlanCard