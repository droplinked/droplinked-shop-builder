import React, { useCallback, useEffect, useState } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppTypography from "components/common/typography/AppTypography";
import AuthModal from "components/modals/auth-modal/AuthModal";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import { SubOptionId, SubscriptionPlan } from "lib/apis/subscription/interfaces";
import { capitalizeFirstLetter, navigating_user_based_on_status } from "lib/utils/heper/helpers";
import { MODAL_TYPE } from "pages/public-pages/homePage/HomePage";
import PlanHeading, { subscriptionPlanMap } from "pages/subscription-plans/_components/PlanHeading";
import SubscriptionPlanCheckoutModal from "../checkout/SubscriptionPlanCheckoutModal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useHookStore from "functions/hooks/store/useHookStore";
import useAppToast from "functions/hooks/toast/useToast";
import { appDevelopment } from "lib/utils/app/variable";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";

interface Props {
    plan: SubscriptionPlan;
    plans?: any;
    prevPlanType: string;
    features: SubOptionId[];
}

const PlanCard = ({ plan, prevPlanType, features, plans }: Props) => {
    const { profile } = useProfile();
    const purchaseModal = useDisclosure();
    const signInModal = useDisclosure();
    const { price, type } = plan;
    const isStarter = type === "STARTER";
    const isEnterprise = type === "ENTERPRISE";
    const prevPlanTitle = subscriptionPlanMap[prevPlanType].title;

    const { app: { login, loading } } = useHookStore();
    const { showToast } = useAppToast();
    const navigate = useNavigate();
    const { shopNavigate } = useCustomNavigate();

    const [searchParams] = useSearchParams();
    const location = useLocation();
    const isPlansPage = location.pathname === "/plans";

    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(plan);

    const handlePlanPurchase = () => {
        if (!profile) return signInModal.onOpen();
        if (isEnterprise) return window.location.href = "mailto:Support@droplinked.com";
        purchaseModal.onOpen();
    };

    const handleAuthModalClose = useCallback(() => {
        signInModal.onClose();
        openPurchaseModal()
    }, [signInModal]);

    const openPurchaseModal = useCallback(() => {
        if (profile && !signInModal.isOpen && isPlansPage) {
            purchaseModal.onOpen();
        }
    }, [profile, signInModal.isOpen, isPlansPage]);

    const processLogin = async (data: any) => {
        try {
            const { user } = data;
            const status = appDevelopment && user.status === "NEW" ? "VERIFIED" : user.status;
            if (status === "DELETED")
                return showToast({ message: "This account has been deleted", type: "error" });

            if (user.type !== "SHOPBUILDER")
                return showToast({ message: "This account is unable to log in. Please check your credentials.", type: "error" });

            if (!isPlansPage) {
                const { href, dashboard } = navigating_user_based_on_status(status, data);
                dashboard ? shopNavigate(href) : navigate(href);
            }
            signInModal.onClose();
        } catch (error) {
            showToast({ message: error.message, type: "error" });
        }
    };

    const loginWithGoogle = useCallback(async (access_token: string, refresh_token: string) => {
        let result = await login({ type: "get", access_token, refresh_token, params: { access_token } });
        if (result) await processLogin(result);
        signInModal.onClose();
    }, [login, processLogin]);

    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");
    const subscription_id = searchParams.get("subscriptionId");
    useEffect(() => {

        if (access_token && refresh_token) {
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
        }

        if (access_token && refresh_token && searchParams.get("modal") === "purchase" && subscription_id && !loading) {
            const foundPlan = plans.find(plan => plan._id === subscription_id);
            if (foundPlan) {
                setSelectedPlan(foundPlan);
                loginWithGoogle(access_token, refresh_token);
            }
        }
    }, [searchParams, plans, loading, loginWithGoogle]);

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
                    {isNaN(Number(price)) ? capitalizeFirstLetter(selectedPlan?.price) : `$${price}/mo`}
                </AppTypography>

                {!isStarter && <BasicButton onClick={handlePlanPurchase}>{isEnterprise ? "Contact Us" : "Buy"}</BasicButton>}

                <AppTypography fontSize={12} fontWeight={600} color={"white"}>
                    {
                        isStarter ?
                            "Included in all plans:" :
                            <>Everything in <Box as="span" color={"primary"} fontWeight={600}>{prevPlanTitle}</Box>, plus:</>
                    }
                </AppTypography>

                {
                    features.map(featureGroup => {
                        if (featureGroup.value.every(feature => !feature.value)) return null;
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
            {purchaseModal.isOpen && <SubscriptionPlanCheckoutModal selectedPlan={selectedPlan} open={purchaseModal.isOpen} close={purchaseModal.onClose} isFromPlansPage={isPlansPage} />}
            {signInModal.isOpen && <AuthModal show={signInModal.isOpen} close={handleAuthModalClose} type={MODAL_TYPE.SIGNUP} isFromPlansPage={isPlansPage} subscriptionPlan={selectedPlan} />}
        </>
    );
};

export default PlanCard;
