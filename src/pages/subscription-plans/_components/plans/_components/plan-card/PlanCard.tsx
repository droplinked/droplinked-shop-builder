import { Box, Center, Divider, Flex, useDisclosure } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import AppTypography from "components/common/typography/AppTypography"
import Button from "components/redesign/button/Button"
import { useProfile } from "hooks/useProfile/useProfile"
import { SubscriptionPlan } from "lib/apis/subscription/interfaces"
import React from "react"
import { useNavigate } from "react-router-dom"
import { subscriptionPlans } from "utils/constants/subscriptionPlans"
import { getSubscriptionPlanIcon } from "utils/helpers"
import useSubscriptionPlanPurchaseStore from "../../../../../../lib/stores/subscription-plan.ts/subscriptionPlanStore"
import SubscriptionPlanCheckoutModal from "../checkout/SubscriptionPlanCheckoutModal"
import PlanPrice from 'components/redesign/plan-price/PlanPrice'
import PlanDescription from "./PlanDescription"
import PopularPlanBadge from "./PopularPlanBadge"

function PlanCard({ plan }: { plan: SubscriptionPlan }) {
    const navigate = useNavigate()
    const purchaseModal = useDisclosure()
    const updateSelectedPlan = useSubscriptionPlanPurchaseStore((state) => state.updateSelectedPlan)
    const { profile } = useProfile()

    const { type } = plan
    const { title, icon: SubscriptionIcon } = getSubscriptionPlanIcon(type)
    const isStarter = type === "STARTER"
    const isEnterprise = type === "ENTERPRISE"
    const isPopular = type === "BUSINESS"

    const handlePlanPurchase = () => {
        if (isEnterprise) return window.location.href = "mailto:Support@droplinked.com"

        updateSelectedPlan(plan)
        profile ? purchaseModal.onOpen() : navigate("/onboarding?entry=signup")
    }

    return (
        <>
            <Flex
                position={"relative"}
                direction="column"
                gap={9}
                borderRadius={8}
                padding={{ lg: 9, base: 7 }}
                bg="neutral.gray.1000"
                {...(isPopular && {
                    border: "2px solid #2BCFA1",
                    backgroundImage: "url('/assets/images/popular-plan-bg.png')",
                    backgroundPosition: "top right",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: { base: "auto 55%", xl: "auto 35%" }
                })}
            >
                {isPopular && <PopularPlanBadge />}

                <Flex direction="column" gap={4}>
                    <Center width="52px" height="52px" p={2} borderRadius="full" bg="linear-gradient(135deg, #383838 0%, #525252 100%)">
                        <SubscriptionIcon color="white" />
                    </Center>
                    <Box>
                        <AppTypography fontSize={20} fontWeight={700} color="white">{title}</AppTypography>
                        <PlanDescription plan={plan} />
                    </Box>
                </Flex>

                <PlanPrice plan={plan} />

                <Button fontWeight={500} isDisabled={isStarter} onClick={handlePlanPurchase}>{isEnterprise ? "Contact Us" : "Select"}</Button>

                <Divider borderColor="neutral.gray.700" />

                <Flex direction="column" gap={4}>
                    <AppTypography fontSize={14} color="#B1B1B1">
                        {subscriptionPlans[plan.type].features.title}
                    </AppTypography>
                    {subscriptionPlans[plan.type].features.items.map((item: string) =>
                        <Flex key={item} gap={2} alignItems={"center"}>
                            <AppIcons.Tick color="white" style={{ flexShrink: 0 }} />
                            <AppTypography fontSize={14} color="white">
                                {item}
                            </AppTypography>
                        </Flex>
                    )}
                </Flex>
            </Flex>

            {purchaseModal.isOpen && (
                <SubscriptionPlanCheckoutModal
                    isOpen={purchaseModal.isOpen}
                    close={purchaseModal.onClose}
                />
            )}
        </>
    )
}

export default PlanCard