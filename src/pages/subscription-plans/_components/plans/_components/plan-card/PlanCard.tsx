import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";
import { SubOptionId, SubscriptionPlan } from "lib/apis/subscription/interfaces";
import { capitalizeFirstLetter } from "lib/utils/heper/helpers";
import PlanHeading, { subscriptionPlanMap } from "pages/subscription-plans/_components/PlanHeading";
import React from "react";
import { useLocation } from "react-router-dom";
import SubscriptionPlanCheckoutModal from "../checkout/SubscriptionPlanCheckoutModal";

interface Props {
    plan: SubscriptionPlan;
    prevPlanType: string;
    features: SubOptionId[];
}

const PlanCard = ({ plan, prevPlanType, features }: Props) => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    const pathname = useLocation().pathname
    const { price, type } = plan
    const isStarter = type === "STARTER"
    const isEnterprise = type === "ENTERPRISE"
    const prevPlanTitle = subscriptionPlanMap[prevPlanType].title

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

                <AppTypography textAlign={"center"} fontSize={24} fontWeight={600} color={isStarter ? "#2BCFA1" : "#9C4EFF"}>
                    {isNaN(Number(price)) ? capitalizeFirstLetter(plan.price) : `$${price}/mo`}
                </AppTypography>

                {pathname.includes("dashboard") && !isStarter && <BasicButton onClick={handlePlanPurchase}>{isEnterprise ? "Contact Us" : "Buy"}</BasicButton>}

                <AppTypography fontSize={12} fontWeight={600} color={"white"}>
                    {
                        isStarter ?
                            "Included in all plans:" :
                            <>Everything in <Box as="span" color={"primary"} fontWeight={600}>{prevPlanTitle}</Box>, plus:</>
                    }
                </AppTypography>

                {
                    features.map(featureGroup => {
                        if (featureGroup.value.every(feature => !feature.value)) return null
                        return <Flex key={featureGroup.key} direction={"column"} gap={2}>
                            <AppTypography fontWeight={500} color={"white"}>{featureGroup.title || featureGroup.key}</AppTypography>
                            {
                                featureGroup.value.filter(feature => feature.value).map(feature =>
                                    <Flex key={feature.key} alignItems={"start"} gap={2}>
                                        <AppIcons.Tick style={{ flexShrink: 0 }} />
                                        <AppTypography color={"white"}>
                                            {`${capitalizeFirstLetter(feature.title)} ${typeof feature.value === "boolean" ? "" : `: ${feature.value}`}`}
                                        </AppTypography>
                                    </Flex>
                                )
                            }
                        </Flex>
                    })
                }
            </Flex>
            {isOpen && <SubscriptionPlanCheckoutModal selectedPlan={plan} open={isOpen} close={onClose} />}
        </>
    )
}

export default PlanCard