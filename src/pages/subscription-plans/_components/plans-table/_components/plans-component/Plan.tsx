import { HStack, VStack, useDisclosure } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import AuthModal from "components/modals/auth-modal/AuthModal";
import Button from 'components/redesign/button/Button';
import useAppToast from 'functions/hooks/toast/useToast';
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';
import { useProfile } from "functions/hooks/useProfile/useProfile";
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces';
import useAppStore from 'lib/stores/app/appStore';
import { getSubscriptionIcon, navigating_user_based_on_status } from 'lib/utils/helpers/helpers';
import { MODAL_TYPE } from 'pages/public-pages/homePage/HomePage';
import SubscriptionPlanCheckoutModal from 'pages/subscription-plans/_components/plans/_components/checkout/SubscriptionPlanCheckoutModal';
import useSubscriptionPlanPurchaseStore from 'pages/subscription-plans/_components/plans/store/planPurchaseStore';
import * as React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { PricePlan } from './PricePlan';

interface IProps {
    plan: SubscriptionPlan
    plans: Array<SubscriptionPlan>
}
function Plan({ plan, plans }: IProps) {
    const isEnterprise = plan.type === 'ENTERPRISE';
    const isFree = plan.type === 'STARTER';
    const purchaseModal = useDisclosure();
    const signInModal = useDisclosure();
    const { profile } = useProfile();
    const updateSelectedPlan = useSubscriptionPlanPurchaseStore((state) => state.updateSelectedPlan);
    const [isLoggedInViaGoogle, setIsLoggedInViaGoogle] = React.useState<boolean>(false);
    const { login, loading } = useAppStore();
    const { showToast } = useAppToast();
    const navigate = useNavigate();
    const { shopNavigate } = useCustomNavigate();
    const [searchParams] = useSearchParams();
    const isPlansPage = useLocation().pathname === "/plans"

    const handlePlanPurchase = () => {
        updateSelectedPlan(plan);
        if (!profile) return signInModal.onOpen();
        if (isEnterprise) return (window.location.href = "mailto:Support@droplinked.com");
        purchaseModal.onOpen();
    };

    const paramsVariables = React.useMemo(
        () => ({
            access_token: searchParams.get("access_token"),
            refresh_token: searchParams.get("refresh_token"),
            subscription_id: searchParams.get("subscriptionId")
        }),
        [searchParams]
    );

    const loginWithGoogle = React.useCallback(async () => {
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
                const { href, dashboard } = navigating_user_based_on_status(status, res)
                dashboard ? shopNavigate(href) : navigate(href)
            }
        } catch (err) {
            showToast({ message: err.message, type: "error" })
        } finally {
            signInModal.onClose()
        }
    }, [login, paramsVariables, showToast, isPlansPage, navigate, shopNavigate, signInModal])

    React.useEffect(() => {
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
        <VStack gap={plan.type === "BUSINESS" ? "1rem" : "1.2rem"} alignItems={"start"} justifyContent={"start"} padding={"25px"} width={"270px"} height={"180px"}>
            <HStack width={"100%"} justifyContent={"space-between"}>
                <AppTypography fontWeight={400} fontSize={"16px"} color={"#fff"}>{getSubscriptionIcon(plan.type).title}</AppTypography>
                {plan.type === "BUSINESS" && <AppIcons.MedalStar />}
            </HStack>
            <PricePlan plan={plan} />
            <Button width={"100%"} mt="1rem" textColor={"#000"} isDisabled={isFree} color={""} onClick={handlePlanPurchase}>{isEnterprise ? "Contact Us" : "Select"}</Button>
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
        </VStack>
    );
}
export default Plan;