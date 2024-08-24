import { Box, Center, Divider, Flex, useDisclosure } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import BasicButton from "components/common/BasicButton/BasicButton"
import AppTypography from "components/common/typography/AppTypography"
import AuthModal from "components/modals/auth-modal/AuthModal"
import useAppToast from "functions/hooks/toast/useToast"
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate"
import { useProfile } from "functions/hooks/useProfile/useProfile"
import { SubOptionId, SubscriptionPlan } from "lib/apis/subscription/interfaces"
import useAppStore from "lib/stores/app/appStore"
import { navigating_user_based_on_status } from "lib/utils/heper/helpers"
import { MODAL_TYPE } from "pages/public-pages/homePage/HomePage"
import { subscriptionPlanMap } from "pages/subscription-plans/_components/PlanHeading"
import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import useSubscriptionPlanPurchaseStore from "../../store/planPurchaseStore"
import SubscriptionPlanCheckoutModal from "../checkout/SubscriptionPlanCheckoutModal"
import PlanPrice from "../plan-price/PlanPrice"
import PopularPlanBadge from "./PopularPlanBadge"

interface Props {
    plan: SubscriptionPlan
    plans?: SubscriptionPlan[]
    prevPlanType: string
    features: SubOptionId[]
}

const PlanCard = ({ plan, prevPlanType, features, plans }: Props) => {
    const updateSelectedPlan = useSubscriptionPlanPurchaseStore((state) => state.updateSelectedPlan)
    const { profile } = useProfile()
    const purchaseModal = useDisclosure()
    const signInModal = useDisclosure()
    const { type } = plan
    const isStarter = type === "STARTER"
    const isEnterprise = type === "ENTERPRISE"
    const isPopular = type === "BUSINESS"
    const { title, icon, description } = subscriptionPlanMap[plan.type]
    const prevPlanTitle = subscriptionPlanMap[prevPlanType].title
    const { login, loading } = useAppStore()
    const { showToast } = useAppToast()
    const navigate = useNavigate()
    const { shopNavigate } = useCustomNavigate()
    const [searchParams] = useSearchParams()
    const isPlansPage = useLocation().pathname === "/plans"
    const [isLoggedInViaGoogle, setIsLoggedInViaGoogle] = useState<boolean>(false)

    const handlePlanPurchase = () => {
        updateSelectedPlan(plan)
        if (!profile) return signInModal.onOpen()
        if (isEnterprise) return (window.location.href = "mailto:Support@droplinked.com")
        purchaseModal.onOpen()
    }

    const paramsVariables = useMemo(
        () => ({
            access_token: searchParams.get("access_token"),
            refresh_token: searchParams.get("refresh_token"),
            subscription_id: searchParams.get("subscriptionId")
        }),
        [searchParams]
    )

    const loginWithGoogle = useCallback(async () => {
        try {
            const res = await login({
                type: "get",
                access_token: paramsVariables?.access_token,
                refresh_token: paramsVariables?.refresh_token,
                params: { access_token: paramsVariables?.access_token }
            })
            const { user } = res
            const status = user.status

            if (status === "DELETED")
                return showToast({
                    message: "This account has been deleted",
                    type: "error"
                })

            if (user.type !== "SHOPBUILDER")
                return showToast({
                    message:
                        "This account is unable to log in. Please check your credentials.",
                    type: "error"
                })

            if (!isPlansPage) {
                const { href, dashboard } = navigating_user_based_on_status(status, res)
                dashboard ? shopNavigate(href) : navigate(href)
            }
        } catch (err) {
            showToast({ message: err.message, type: "error" })
        } finally {
            signInModal.onClose()
        }
    }, [login, paramsVariables, showToast, isPlansPage, navigate, shopNavigate, signInModal])

    useEffect(() => {
        if (
            paramsVariables?.access_token &&
            paramsVariables?.refresh_token &&
            searchParams.get("modal") === "purchase" &&
            paramsVariables?.subscription_id &&
            !loading
        ) {
            const foundPlan = plans.find((p) => p._id === paramsVariables?.subscription_id)
            if (foundPlan) {
                updateSelectedPlan(foundPlan)
                setIsLoggedInViaGoogle(true)
                loginWithGoogle()
                purchaseModal.onOpen()
            }
        }
    }, [paramsVariables, searchParams, loading, loginWithGoogle, plans, purchaseModal])

    return (
        <>
            <Flex
                position={"relative"}
                direction="column"
                gap={9}
                borderRadius={8}
                padding={{ lg: 9, base: 7 }}
                bg="#222222"
                {...(isPopular && {
                    border: "2px solid #2BCFA1",
                    backgroundImage: "url('/assets/images/popular-plan-bg.png')",
                    backgroundPosition: "top right",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: { base: "auto 60%", xl: "auto 35%" }
                })}
            >
                {isPopular && <PopularPlanBadge />}

                <Flex direction="column" gap={4}>
                    <Center width="52px" height="52px" p={2} borderRadius="full" bg="linear-gradient(135deg, #383838 0%, #525252 100%)">
                        {icon}
                    </Center>
                    <Box>
                        <AppTypography fontSize={20} fontWeight={700} color="white">{title}</AppTypography>
                        <AppTypography minHeight={{ base: "48px", xl: "72px" }} fontSize={16} color="#B1B1B1">
                            {description}
                        </AppTypography>
                    </Box>
                </Flex>

                <PlanPrice plan={plan} />

                <BasicButton isDisabled={isStarter} onClick={handlePlanPurchase}>{isEnterprise ? "Contact Us" : "Select"}</BasicButton>

                <Divider borderColor="#3C3C3C" />

                <Flex direction="column" gap={4}>
                    <AppTypography fontSize={14} color="#B1B1B1">
                        {isStarter ? "Included in all plans:" : `Includes everything in ${prevPlanTitle}, plus:`}
                    </AppTypography>

                    {features.map((featureGroup) =>
                        featureGroup.value.some((feature) => feature.value) ?
                            <Fragment key={featureGroup.key}>
                                {featureGroup.value
                                    .filter((feature) => feature.value)
                                    .map((feature) => (
                                        <Flex key={feature.key} gap={2}>
                                            <AppIcons.Tick style={{ flexShrink: 0 }} />
                                            <AppTypography fontSize={14} color="white">
                                                {`${feature.title} ${typeof feature.value === "boolean" ? "" : `: ${feature.value}`}`}
                                            </AppTypography>
                                        </Flex>
                                    ))}
                            </Fragment> :
                            null
                    )}
                </Flex>
            </Flex>
            {purchaseModal.isOpen && (
                <SubscriptionPlanCheckoutModal
                    isOpen={purchaseModal.isOpen}
                    close={purchaseModal.onClose}
                    isFromPlansPage={isPlansPage}
                    isLoggedInViaGoogle={isLoggedInViaGoogle}
                    hasProfile={profile}
                />
            )}
            {signInModal.isOpen && (
                <AuthModal
                    show={signInModal.isOpen}
                    close={signInModal.onClose}
                    type={MODAL_TYPE.SIGNUP}
                    isFromPlansPage={isPlansPage}
                    openPlanPurchaseModal={purchaseModal.onOpen}
                />
            )}
        </>
    )
}

export default PlanCard