import { HStack, VStack, useDisclosure } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import AppButton from 'components/redesign/button/AppButton';
import { useProfile } from "hooks/useProfile/useProfile";
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSubscriptionPlanPurchaseStore from 'stores/subscription-plan.ts/subscriptionPlanStore';
import { getSubscriptionPlanIcon } from 'utils/helpers';
import SubscriptionPlanCheckoutModal from '../checkout/SubscriptionPlanCheckoutModal';
import { PricePlan } from './PricePlan';


interface IProps {
    plan: SubscriptionPlan
}

function Plan({ plan }: IProps) {
    const navigate = useNavigate()
    const purchaseModal = useDisclosure();
    const updateSelectedPlan = useSubscriptionPlanPurchaseStore((state) => state.updateSelectedPlan);
    const { profile } = useProfile();

    const isEnterprise = plan.type === 'ENTERPRISE';
    const isFree = plan.type === 'STARTER';

    const handlePlanPurchase = () => {
        if (isEnterprise) return window.location.href = "mailto:Support@droplinked.com"

        updateSelectedPlan(plan)
        profile ? purchaseModal.onOpen() : navigate("/onboarding?entry=signup")
    };

    return (
        <VStack gap={plan.type === "BUSINESS" ? "1rem" : "1.2rem"} alignItems={"start"} justifyContent={"start"} padding={"25px"} width={"270px"} height={"180px"}>
            <HStack width={"100%"} justifyContent={"space-between"}>
                <AppTypography fontWeight={400} fontSize={"16px"} color={"#fff"}>{getSubscriptionPlanIcon(plan.type).title}</AppTypography>
                {plan.type === "BUSINESS" && <AppIcons.MedalStar />}
            </HStack>
            <PricePlan plan={plan} />
            {/* TODO: Check with the design */}
            <AppButton size='lg' width={"100%"} mt="1rem" isDisabled={isFree} onClick={handlePlanPurchase}>{isEnterprise ? "Contact Us" : "Select"}</AppButton>
            {purchaseModal.isOpen && (
                <SubscriptionPlanCheckoutModal
                    isOpen={purchaseModal.isOpen}
                    close={purchaseModal.onClose}
                />
            )}
        </VStack>
    );
}

export default Plan;