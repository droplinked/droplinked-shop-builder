import { Box, Center, Divider, Flex, useDisclosure } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import AppTypography from "components/common/typography/AppTypography"
import AuthModal from "components/modals/auth-modal/AuthModal"
import Button from "components/redesign/button/Button"
import useAppToast from "hooks/toast/useToast"
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate"
import { useProfile } from "hooks/useProfile/useProfile"
import { IFeature, SubOptionId, SubscriptionPlan } from "lib/apis/subscription/interfaces"
import useAppStore from "lib/stores/app/appStore"
import { navigateUserBasedOnStatus, getSubscriptionPlanIcon} from "utils/helpers"
import { MODAL_TYPE } from "pages/public-pages/homePage/HomePage"
import { cardData } from "pages/subscription-plans/data/cardData"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import useSubscriptionPlanPurchaseStore from "../../../../../../lib/stores/subscription-plan.ts/subscriptionPlanStore"
import SubscriptionPlanCheckoutModal from "../checkout/SubscriptionPlanCheckoutModal"
import PlanPrice from "../plan-price/PlanPrice"
import PlanDescription from "./PlanDescription"
import PopularPlanBadge from "./PopularPlanBadge"

interface Props {
    plan: SubscriptionPlan
    plans?: SubscriptionPlan[]
    prevPlanType: string
    features: SubOptionId[]
}
interface IPlanFeatures {
    STARTER: IFeature,
    BUSINESS: IFeature,
    BUSINESS_PRO: IFeature,
    ENTERPRISE: IFeature,
}

const PlanCard = ({ plan, prevPlanType, plans }: Props) => {
    const updateSelectedPlan = useSubscriptionPlanPurchaseStore((state) => state.updateSelectedPlan)
    const planFeature: IPlanFeatures = cardData;
    const { profile } = useProfile()
    const purchaseModal = useDisclosure()
    const signInModal = useDisclosure()
    const { type } = plan
    const isStarter = type === "STARTER"
    const isEnterprise = type === "ENTERPRISE"
    const isPopular = type === "BUSINESS"
    const { title, icon: SubscriptionIcon } = getSubscriptionPlanIcon(plan.type)
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
                return showToast({ message: "This account has been deleted", type: "error" })

            if (user.type !== "SHOPBUILDER")
                return showToast({ message: "This account is unable to log in. Please check your credentials.", type: "error" })

            if (!isPlansPage) {
                const { href, dashboard } = navigateUserBasedOnStatus(status, res)
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
                bg="#1C1C1C"
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

                <Divider borderColor="#3C3C3C" />

                <Flex direction="column" gap={4}>
                    <AppTypography fontSize={14} color="#B1B1B1">
                        {planFeature[plan.type].title}
                    </AppTypography>
                    {planFeature[plan.type].items.map((item: Array<string>) =>
                        <Flex gap={2} alignItems={"center"}>
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