import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";
import { SubscriptionPlan } from "lib/apis/subscription/interfaces";
import PlanHeading from "pages/subscription-plans/_components/PlanHeading";
import React from "react";
import SubscriptionPlanCheckoutModal from "../checkout/SubscriptionPlanCheckoutModal";

const PlanCard = ({ plan, showBuyButton }: { plan: SubscriptionPlan, showBuyButton: boolean }) => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    const { price, type, description, subOptionIds } = plan
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
                <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <PlanHeading planTitle={type} />
                    <Box
                        as="span"
                        borderRadius={16}
                        padding={"4px 12px"}
                        bgColor={isFree ? "rgba(43, 207, 161, 0.25)" : "rgba(156, 78, 255, 0.25)"}
                        color={isFree ? "#2BCFA1" : "#C59CFF"}
                        fontSize={12}
                        fontWeight={500}
                    >
                        {isNaN(Number(price)) ? price : `$${price}`}
                    </Box>
                </Flex>
                <AppTypography color={"white"}>{description}</AppTypography>
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