import { Box, Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";
import { SubscriptionPlan } from "lib/apis/subscription/interfaces";
import React from "react";

function getPlanDetails(plan: SubscriptionPlan) {
    const planMap = {
        "STARTER": { icon: <AppIcons.Starter />, title: "Starter", price: "Free" },
        "BASIC": { icon: <AppIcons.Starter />, title: "Basic", price: `$ ${plan.price}` },
        "BUSINESS": { ison: <AppIcons.Business />, title: "Business", price: `$ ${plan.price}` },
        "BUSINESS_PRO": { icon: <AppIcons.Premium />, title: "Business Pro", price: `$ ${plan.price}` },
        "ENTERPRISE": { icon: <AppIcons.Enterprise />, title: "Enterprise", price: "Contact Us" },
    }
    return planMap[plan.type]
}

const PlanCard = ({ plan, showBuyButton }: { plan: SubscriptionPlan, showBuyButton: boolean }) => {
    const { icon, title, price } = getPlanDetails(plan)
    const isFree = plan.price == "FREE"

    const handleBuy = () => { }

    return (
        <Flex
            direction={"column"}
            gap={4}
            borderRadius={8}
            padding={4}
            bgColor={"#262626"}
        >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Flex alignItems={"center"} gap={2}>
                    {icon}
                    <AppTypography color="white" fontSize="18px" fontWeight="700">{title}</AppTypography>
                </Flex>
                <Box
                    as="span"
                    borderRadius={16}
                    padding={"4px 12px"}
                    bgColor={isFree ? "rgba(43, 207, 161, 0.25)" : "rgba(156, 78, 255, 0.25)"}
                    color={isFree ? "#2BCFA1" : "#C59CFF"}
                    fontSize={12}
                    fontWeight={500}
                >
                    {price}
                </Box>
            </Flex>
            <AppTypography color={"white"}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt ipsum, voluptas unde</AppTypography>
            {showBuyButton && <BasicButton onClick={handleBuy}>Buy</BasicButton>}
            {/* {plan.subOptionIds.filter(feature => ["payment_options", "shipping_options", "services", "", ""].includes(feature.key)).map(feature => feature.key)} */}
        </Flex>
    )
}

export default PlanCard