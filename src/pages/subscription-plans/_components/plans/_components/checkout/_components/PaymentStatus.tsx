import { Box, Divider, Flex, Heading, Image } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import { getShopSubscriptionDataService } from 'lib/apis/subscription/subscriptionServices'
import { useUpdateShopPermissions } from 'lib/stores/app/shopPermissionsStore'
import AppErrors from 'lib/utils/statics/errors/errors'
import { subscriptionPlanMap } from 'pages/subscription-plans/_components/PlanHeading'
import React, { Dispatch, SetStateAction, useState } from 'react'

interface Props {
    paymentStatus: "success" | "error",
    setPaymentStatus: Dispatch<SetStateAction<"success" | "error">>;
    selectedPlan: SubscriptionPlan
    close: () => void
}

function PaymentStatus({ paymentStatus, setPaymentStatus, selectedPlan, close }: Props) {
    const updateShopSubscriptionData = useUpdateShopPermissions()
    const { showToast } = useAppToast()
    const [isLoading, setLoading] = useState(false)
    const isSuccessful = paymentStatus === "success"

    const fetchShopSubscriptionData = async () => {
        try {
            setLoading(true)
            const { data } = await getShopSubscriptionDataService()
            updateShopSubscriptionData(data)
            close()
        } catch (error) {
            showToast({ message: AppErrors.permission.shop_subscription_data_unavailable, type: "error" })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Flex direction={"column"} gap={5}>
            <Heading textAlign={"center"} fontSize={36} fontWeight={700} color={"primary"}>
                {isSuccessful ? "Subscription Confirmed" : "Payment Failed"}
            </Heading>

            <Divider m={0} height={"1px"} borderColor={"#292929"} />

            <Image
                src={
                    isSuccessful ?
                        "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/4cfd82e7a9d58675c6acad5dffe9725e6a836a162a0a658e541d0a8bf870636d.png_or.png" :
                        "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/6a17656baa42fae845213dd5c060842ee27598a8eac4975c0400b3cb4b254828.png_or.png"
                }
                width={"349px"}
                height={"auto"}
                objectFit={"cover"}
            />

            <AppTypography fontSize={20} color={"#C2C2C2"}>
                {isSuccessful ?
                    <>
                        Thank you for subscribing to the {" "}
                        <Box as="span" color={"primary"}>{subscriptionPlanMap[selectedPlan.type]} Plan!</Box> {" "}
                        Your payment was successful.
                    </>
                    :
                    "Oops! Something went wrong with your payment. Please check your payment details and try again"
                }
            </AppTypography>

            {
                isSuccessful ?
                    <Flex justifyContent={"center"}>
                        <BasicButton isLoading={isLoading} isDisabled={isLoading} onClick={fetchShopSubscriptionData}>Great</BasicButton>
                    </Flex>
                    :
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <BasicButton variant='outline' isLoading={isLoading} isDisabled={isLoading} onClick={close}>Cancel</BasicButton>
                        <BasicButton isLoading={isLoading} isDisabled={isLoading} onClick={() => setPaymentStatus(null)}>Try Again</BasicButton>
                    </Flex>
            }
        </Flex>
    )
}

export default PaymentStatus