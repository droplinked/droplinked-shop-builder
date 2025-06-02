import { Box, Center, Flex, ModalBody, ModalFooter } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import PlanPrice from 'components/redesign/plan-price/PlanPrice'
import React from 'react'
import useSubscriptionPlanPurchaseStore from 'stores/subscription-plan.ts/subscriptionPlanStore'
import { getSubscriptionPlans } from 'utils/constants/subscriptionPlans'
import { ModalStep } from '../types/interfaces'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/subscription/en.json'
import localAr from 'locales/subscription/ar.json'

interface Props {
    setPlanPurchaseModalStep: (step: ModalStep) => void;
    close: () => void;
}

function ConfirmPlan({ setPlanPurchaseModalStep, close }: Props) {
    const selectedPlan = useSubscriptionPlanPurchaseStore((state) => state.selectedPlan)
    const selectedPlanPrice = useSubscriptionPlanPurchaseStore((state) => state.selectedPlanPrice)
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr })

    if (!selectedPlan) {
        return null
    }

    const { title, icon: SubscriptionIcon, description } = getSubscriptionPlans(t)[selectedPlan.type]
    const priceDisplay = typeof selectedPlanPrice === 'string' ? selectedPlanPrice : `$${selectedPlanPrice}`

    return (
        <>
            <ModalHeaderData
                icon={<Box sx={{ "path": { stroke: "#FFFFFF" } }}><AppIcons.Like /></Box>}
                title={t('confirmPlan.title')}
                description={t('confirmPlan.description', { plan: t(title), price: priceDisplay })}
            />
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
                        <SubscriptionIcon color="#fff" />
                    </Center>
                    <AppTypography mt={4} fontSize={20} fontWeight={500} color="white">{t(title)}</AppTypography>
                    <AppTypography fontSize={16} color="#B1B1B1">{t(description)}</AppTypography>
                    <PlanPrice plan={selectedPlan} marginTop={9} height={"fit-content"} />
                </Flex>
            </ModalBody>
            <ModalFooter display="flex" alignItems="center" gap={{ xl: 6, base: 3 }}>
                <BasicButton minWidth="unset" width="50%" variant='outline' onClick={close}>{t('actions.discard')}</BasicButton>
                <BasicButton minWidth="unset" width="50%" onClick={() => setPlanPurchaseModalStep("PaymentMethodSelection")}>{t('actions.next')}</BasicButton>
            </ModalFooter>
        </>
    )
}

export default ConfirmPlan
