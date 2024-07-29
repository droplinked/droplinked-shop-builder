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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import SubscriptionPlanCheckoutModal from "../checkout/SubscriptionPlanCheckoutModal";
import useHookStore from "functions/hooks/store/useHookStore";
import useAppToast from "functions/hooks/toast/useToast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import { appDevelopment } from "lib/utils/app/variable";

interface Props {
    plan: SubscriptionPlan;
    prevPlanType: string;
    features: SubOptionId[];
    plans?: any;
}

const PlanCard = ({ plan, prevPlanType, features, plans }: Props) => {
    const { profile } = useProfile()
    const purchaseModal = useDisclosure()
    const signInModal = useDisclosure()
    const { price, type } = plan
    const isStarter = type === "STARTER"
    const isEnterprise = type === "ENTERPRISE"
    const prevPlanTitle = subscriptionPlanMap[prevPlanType].title

    const handlePlanPurchase = () => {
        if (!profile) return signInModal.onOpen()
        if (isEnterprise) return window.location.href = "mailto:Support@droplinked.com"
        purchaseModal.onOpen()
    }

    const {
        app: { login, loading },
    } = useHookStore();
    const { showToast } = useAppToast();
    const navigate = useNavigate();
    const { shopNavigate } = useCustomNavigate();

    const [searchParams] = useSearchParams();
    const location = useLocation();
    const isPlansPage = location.pathname === "/plans";

    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(plan);
    const [isLoggedInViaGoogle, setIsLoggedInViaGoogle] = useState<boolean>(false);

    const handleAuthModalClose = () => {
        signInModal.onClose();
        if (isPlansPage && !isEnterprise) {
            purchaseModal.onOpen();
        } else if (isPlansPage && isEnterprise) {
            window.location.href = "mailto:Support@droplinked.com"
        }
    };

    const params_variables = useMemo(
        () => ({
            access_token: searchParams.get("access_token"),
            refresh_token: searchParams.get("refresh_token"),
            subscription_id: searchParams.get("subscriptionId"),
        }),
        [searchParams]
    );

    const loginWithGoogle = useCallback(async () => {
        await login({ type: "get", access_token: params_variables?.access_token, refresh_token: params_variables?.refresh_token, params: { access_token: params_variables?.access_token } })
            .then((res) => {
                const { user } = res;
                const status = user.status;

                if (status === "DELETED") return showToast({ message: "This account has been deleted", type: "error" });

                if (user.type !== "SHOPBUILDER") return showToast({ message: "This account is unable to log in. Please check your credentials.", type: "error" });

                if (!isPlansPage) {
                    const { href, dashboard } = navigating_user_based_on_status(status, res);
                    dashboard ? shopNavigate(href) : navigate(href);
                }
            })
            .catch((err) => {
                showToast({ message: err.message, type: "error" });
            })
            .finally(() => {
                signInModal.onClose();
            });
    }, []);

    useEffect(() => {
        if (params_variables?.access_token && params_variables?.refresh_token && searchParams.get("modal") === "purchase" && params_variables?.subscription_id && !loading) {
            const foundPlan = plans.find((plan) => plan._id === params_variables?.subscription_id);
            if (foundPlan) {
                setSelectedPlan(foundPlan);
                !loading && loginWithGoogle();
                setIsLoggedInViaGoogle(true);
                purchaseModal.onOpen();
            }
        }
    }, []);

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

                {!isStarter && <BasicButton onClick={handlePlanPurchase}>{isEnterprise ? "Contact Us" : "Buy"}</BasicButton>}

                <AppTypography fontSize={12} fontWeight={600} color={"white"}>
                    {
                        isStarter ?
                            "Included in all plans:" :
                            <>Everything in <Box as="span" color={"primary"} fontWeight={600}>{prevPlanTitle}</Box>, plus:</>
                    }
                </AppTypography>

                <Flex direction={"column"} gap={2}>
                    {
                        features.map(featureGroup => {
                            if (featureGroup.value.every(feature => !feature.value)) return null
                            return <Flex key={featureGroup.key} direction={"column"} gap={2}>
                                {/* <AppTypography fontWeight={500} color={"white"}>{featureGroup.title || featureGroup.key}</AppTypography> */}
                                {
                                    featureGroup.value.filter(feature => feature.value).map(feature =>
                                        <Flex key={feature.key} alignItems={"start"} gap={2}>
                                            <AppIcons.Tick style={{ flexShrink: 0 }} />
                                            <AppTypography color={"white"}>
                                                {`${feature.title} ${typeof feature.value === "boolean" ? "" : `: ${feature.value}`}`}
                                            </AppTypography>
                                        </Flex>
                                    )
                                }
                            </Flex>
                        })
                    }
                </Flex>
            </Flex>
            {purchaseModal.isOpen && <SubscriptionPlanCheckoutModal selectedPlan={selectedPlan} isOpen={purchaseModal.isOpen} close={() => purchaseModal.onClose()} isFromPlansPage={isPlansPage} isLoggedInViaGoogle={isLoggedInViaGoogle} hasProfile={profile} />}
            {signInModal.isOpen && <AuthModal show={signInModal.isOpen} close={handleAuthModalClose} type={MODAL_TYPE.SIGNUP} isFromPlansPage={isPlansPage} subscriptionPlan={selectedPlan} />}
        </>
    )
}

export default PlanCard