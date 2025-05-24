import { ModalBody, ModalFooter } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import { useQueryClient } from 'react-query'
import { subscriptionPlans } from 'utils/constants/subscriptionPlans'
import useSubscriptionPlanPurchaseStore from '../../../../../../../stores/subscription-plan.ts/subscriptionPlanStore'

interface Props {
    paymentStatus: "success" | "error";
    close: () => void;
}

function PaymentStatus({ paymentStatus, close }: Props) {
    const queryClient = useQueryClient()
    const selectedPlan = useSubscriptionPlanPurchaseStore((state) => state.selectedPlan)
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
                    {isSuccessful ? "You're all set!" : "Payment failed"}
                </AppTypography>
                <AppTypography
                    fontSize={16}
                    textAlign={"center"}
                    color={"white"}
                >
                    {isSuccessful ?
                        `Your ${subscriptionPlans[selectedPlan.type].title} Plan subscription is now active.`
                        :
                        "There was an issue with the payment. Please double-check the details and try again. If the issue persists, please contact us."}
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
                        <BasicButton variant='outline' onClick={fetchShopSubscriptionData}>Return to Dashboard</BasicButton>
                        :
                        <>
                            <BasicButton minWidth="unset" width="50%" variant='outline' onClick={close}>Close</BasicButton>
                            <BasicButton minWidth="unset" width="50%" onClick={() => window.location.href = "mailto:Support@droplinked.com"}>Contact Us</BasicButton>
                        </>
                }
            </ModalFooter>
        </>
    )
}

export default PaymentStatus