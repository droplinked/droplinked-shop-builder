import { Center, Flex, ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { subscriptionPlanMap } from 'pages/subscription-plans/_components/PlanHeading'
import React from 'react'
import useSubscriptionPlanPurchaseStore from '../../../store/planPurchaseStore'
import PlanPrice from '../../plan-price/PlanPrice'
import { ModalStep } from '../types/interfaces'

interface Props {
    setplanPurchaseModalStep: (step: ModalStep) => void;
    close: () => void;
    hasProfile?: any;
    isFromPlansPage?: boolean;
}

function ConfirmPlan({ setplanPurchaseModalStep, close, hasProfile, isFromPlansPage }: Props) {
    const selectedPlan = useSubscriptionPlanPurchaseStore((state) => state.selectedPlan)
    const selectedPlanPrice = useSubscriptionPlanPurchaseStore((state) => state.selectedPlanPrice)
    const { logoutUser } = useProfile()
    const { title, icon, description } = subscriptionPlanMap[selectedPlan.type]

    const handleCloseModal = () => {
        isFromPlansPage && logoutUser()
        close()
    }

    return (
        <>
            <ModalHeader>
                <ModalHeaderData
                    icon={<AppIcons.ConfirmPlan />}
                    title='Confirm subscription'
                    description={`Upgrade to the ${title} Plan for $${selectedPlanPrice} per year to access advanced features.`}
                />
            </ModalHeader>
            <ModalBody>
                <Flex
                    direction={"column"}
                    border={"1.5px solid #2BCFA1"}
                    borderRadius={8}
                    padding={{ xl: 9, base: 6 }}
                    backgroundImage={"/assets/images/popular-plan-bg.png"}
                    backgroundPosition={"top right"}
                    backgroundRepeat={"no-repeat"}
                    backgroundSize={"auto 150%"}
                >
                    <Center width="52px" height="52px" p={2} borderRadius="full" bg="linear-gradient(135deg, #383838 0%, #525252 100%)">
                        {icon}
                    </Center>
                    <AppTypography mt={4} fontSize={20} fontWeight={500} color="white">{title}</AppTypography>
                    <AppTypography fontSize={16} color="#B1B1B1">{description}</AppTypography>
                    <PlanPrice marginTop={9} plan={selectedPlan} />
                </Flex>
            </ModalBody>
            <ModalFooter display={"flex"} alignItems={"center"} gap={{ xl: 6, base: 3 }}>
                <BasicButton minWidth={"unset"} width={"50%"} variant='outline' onClick={handleCloseModal}>Discard</BasicButton>
                <BasicButton minWidth={"unset"} width={"50%"} isDisabled={!hasProfile} onClick={() => setplanPurchaseModalStep("PaymentMethodSelection")}>Next</BasicButton>
            </ModalFooter>
        </>
    )
}

export default ConfirmPlan