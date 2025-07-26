import { ModalBody, ModalFooter } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { useQueryClient } from 'react-query'
import { getSubscriptionPlans } from 'data/subscriptionPlans'
import useSubscriptionPlanPurchaseStore from 'stores/subscription-plan.ts/subscriptionPlanStore'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/subscription/en.json'
import localAr from 'locales/subscription/ar.json'

interface Props {
    paymentStatus: "success" | "error";
    close: () => void;
}

function PaymentStatus({ paymentStatus, close }: Props) {
    const queryClient = useQueryClient()
    const selectedPlan = useSubscriptionPlanPurchaseStore((state) => state.selectedPlan)
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr })
    const isSuccessful = paymentStatus === "success"
    const imageSrc = `/assets/images/subscription/${isSuccessful ? "subscription-successful-payment" : "subscription-failed-payment"}.png`

    const fetchShopSubscriptionData = () => {
        queryClient.invalidateQueries({ queryKey: ["shop-subscription-plan"] })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        close()
    }

    return (
        <>
            <ModalBody display={"flex"} flexDirection={"column"}>
                <AppImage
                    width={{ xl: "349px", md: "249px", base: "100%" }}
                    height={{ xl: "326px", md: "236px", base: "auto" }}
                    alignSelf={"center"}
                    src={imageSrc}
                    objectFit={"cover"}
                />
                <AppTypography
                    marginTop={{ lg: 16, md: 12, base: 8 }}
                    textAlign={"center"}
                    fontSize={32}
                    fontWeight={700}
                    color={"white"}
                >
                    {t(isSuccessful ? 'PaymentStatus.paymentSuccess' : 'PaymentStatus.paymentFailed')}
                </AppTypography>
                <AppTypography
                    fontSize={16}
                    textAlign={"center"}
                    color={"white"}
                >
                    {isSuccessful ?
                        t('PaymentStatus.subscriptionActive', { plan: getSubscriptionPlans(t)[selectedPlan.type].title })
                        :
                        t('PaymentStatus.paymentError')}
                </AppTypography>
            </ModalBody>

            <ModalFooter
                display={"flex"}
                justifyContent={isSuccessful ? "center" : "unset"}
                alignItems={isSuccessful ? "center" : "unset"}
                gap={{ xl: 6, base: 3 }}
            >
                {
                    isSuccessful ?
                        <BasicButton variant='outline' onClick={fetchShopSubscriptionData}>{t('actions.returnToDashboard')}</BasicButton>
                        :
                        <>
                            <BasicButton minWidth="unset" width="50%" variant='outline' onClick={close}>{t('common:close')}</BasicButton>
                            <BasicButton minWidth="unset" width="50%" onClick={() => window.location.href = "mailto:Support@droplinked.com"}>{t('common:contactUs')}</BasicButton>
                        </>
                }
            </ModalFooter>
        </>
    )
}

export default PaymentStatus