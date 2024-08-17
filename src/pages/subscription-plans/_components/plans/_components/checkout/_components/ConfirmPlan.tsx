import { Center, Flex, ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { subscriptionPlanMap } from 'pages/subscription-plans/_components/PlanHeading'
import React from 'react'
import useSubscriptionPlanPurchaseStore from '../../../store/planPurchaseStore'
import PlanPrice from '../../plan-price/PlanPrice'
import { ModalStep } from '../SubscriptionPlanCheckoutModal'
import PurchaseStepInformation from './PurchaseStepInformation'

interface Props {
    setplanPurchaseModalStep: (step: ModalStep) => void;
    close: () => void;
    hasProfile?: any;
    isFromPlansPage?: boolean;
}

function ConfirmPlan({ setplanPurchaseModalStep, close, hasProfile, isFromPlansPage }: Props) {
    const selectedPlan = useSubscriptionPlanPurchaseStore((state) => state.selectedPlan)
    const selectedPlanPrice = useSubscriptionPlanPurchaseStore((state) => state.selectedPlanPrice)
    const { showToast } = useAppToast()
    const { logoutUser } = useProfile()
    const { title, icon, description } = subscriptionPlanMap[selectedPlan.type]

    const handleCloseModal = () => {
        isFromPlansPage && logoutUser()
        close()
    }

    return (
        // <Flex direction={"column"} gap={20}>
        //     <Flex direction={"column"} gap={5}>
        //         <Flex direction={"column"}>
        //             <Heading textAlign={"center"} fontSize={36} fontWeight={700} color={"primary"}>Confirm Your Subscription</Heading>
        //             <AppTypography textAlign={"center"} fontSize={20} color={"#C2C2C2"}>
        //                 Unlock Premium Features for {isNaN(+price) ? "free" : `Just $${price}/month`}
        //             </AppTypography>
        //         </Flex>

        //         <Divider height={"1px"} borderColor={"#292929"} />

        //         <AppTypography textAlign={"center"} fontSize={20} color={"#C2C2C2"}>Upgrade to the Business Plan for advanced customization, exclusive features, and priority support. Confirm your subscription now to enhance your store.</AppTypography>

        //         <Flex
        //             justifyContent={"space-between"}
        //             alignItems={"center"}
        //             border={"1px solid"}
        //             borderColor={"primary"}
        //             borderRadius={16}
        //             padding={8}
        //             bgColor={"rgba(43, 207, 161, 0.03)"}
        //         >
        //             <AppTypography fontSize={24} fontWeight={700} color={"white"}>
        //                 {isNaN(+price) ? price : `$${price} per month`}
        //             </AppTypography>
        //         </Flex>
        //     </Flex>

        //     {/* actions */}
        //     <Flex justifyContent={"space-between"} alignItems={"center"}>
        //         <BasicButton variant='outline' onClick={handleCloseModal}>Back</BasicButton>
        //         <BasicButton isLoading={isLoading} isDisabled={isLoading || !hasProfile} onClick={handleConfirmPlan}>Confirm</BasicButton>
        //     </Flex>
        // </Flex>
        <>
            <ModalHeader paddingBlock={0}>
                <PurchaseStepInformation
                    icon={<AppIcons.ConfirmPlan />}
                    title='Confirm subscription'
                    description={`Upgrade to the ${title} Plan for $${selectedPlanPrice} per year to access advanced features.`}
                />
            </ModalHeader>
            <ModalBody paddingBlock={0}>
                <Flex direction={"column"} border={"1.5px solid #2BCFA1"} borderRadius={8} padding={8}>
                    <Center width="52px" height="52px" p={2} borderRadius="full" bg="linear-gradient(135deg, #383838 0%, #525252 100%)">
                        {icon}
                    </Center>
                    <AppTypography mt={4} fontSize={20} fontWeight={500} color="white">{title}</AppTypography>
                    <AppTypography fontSize={16} color="#B1B1B1">{description}</AppTypography>
                    <PlanPrice marginTop={9} plan={selectedPlan} />
                </Flex>
            </ModalBody>
            <ModalFooter display={"flex"} alignItems={"center"} gap={{ xl: 6, base: 1 }}>
                <BasicButton width={"50%"} variant='outline' onClick={handleCloseModal}>Discard</BasicButton>
                <BasicButton width={"50%"} onClick={() => setplanPurchaseModalStep("PaymentMethodSelection")}>Next</BasicButton>
            </ModalFooter>
        </>
    )
}

export default ConfirmPlan