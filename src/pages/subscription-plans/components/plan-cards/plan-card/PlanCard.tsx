import { Box, Center, Divider, Flex, IconProps, useDisclosure } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import AppTypography from "components/common/typography/AppTypography"
import AppButton from "components/redesign/button/AppButton"
import PlanPrice from 'components/redesign/plan-price/PlanPrice'
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import { useProfile } from "hooks/useProfile/useProfile"
import localAr from "locales/subscription/ar.json"
import localEn from "locales/subscription/en.json"
import React from "react"
import { useNavigate } from "react-router-dom"
import { SubscriptionPlan } from "services/subscription/interfaces"
import { getPlanDetails } from "utils/helpers"
import useSubscriptionPlanPurchaseStore from "stores/subscription-plan.ts/subscriptionPlanStore"
import SubscriptionPlanCheckoutModal from "../../checkout/SubscriptionPlanCheckoutModal"
import PlanDescription from "./PlanDescription"
import PopularPlanBadge from "./PopularPlanBadge"

type PlanDetails = { title: string; icon: React.ComponentType<IconProps>; features: { title: string; items: string[] } }

const PlanCard = ({ plan }: { plan: SubscriptionPlan }) => {
    const navigate = useNavigate()
    const purchaseModal = useDisclosure()
    const updateSelectedPlan = useSubscriptionPlanPurchaseStore((state) => state.updateSelectedPlan)
    const { profile } = useProfile()
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr })

    const { type } = plan
    const planDetails = getPlanDetails(type, t) as PlanDetails
    const { title, icon: SubscriptionIcon, features } = planDetails
    
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
                        <AppTypography fontSize={20} fontWeight={700} color="white">{t(title)}</AppTypography>
                        <PlanDescription plan={plan} />
                    </Box>
                </Flex>

                <PlanPrice plan={plan} />

                <AppButton isDisabled={isStarter} onClick={handlePlanPurchase}>
                    {isEnterprise ? t('plans.cta.contact') : t('plans.cta.select')}
                </AppButton>

                <Divider borderColor="neutral.gray.700" />

                <Flex direction="column" gap={4}>
                    <AppTypography fontSize={14} color="#B1B1B1">
                        {features.title}
                    </AppTypography>
                    {features.items.map((item: string) => (
                        <Flex key={item} gap={2} alignItems={"center"}>
                            <AppIcons.Tick color="white" style={{ flexShrink: 0 }} />
                            <AppTypography fontSize={14} color="white">
                                {t(item)}
                            </AppTypography>
                        </Flex>
                    ))}
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