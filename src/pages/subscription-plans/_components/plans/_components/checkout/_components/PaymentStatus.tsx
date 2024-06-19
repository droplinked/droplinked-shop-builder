import { Box, Divider, Flex, Heading, Image } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import { subscriptionPlanMap } from 'pages/subscription-plans/_components/PlanHeading'
import React from 'react'
import { useQueryClient } from 'react-query'

interface Props {
    paymentStatus: "success" | "error",
    selectedPlan: SubscriptionPlan
    close: () => void
}

function PaymentStatus({ paymentStatus, selectedPlan, close }: Props) {
    const queryClient = useQueryClient()
    const isSuccessful = paymentStatus === "success"
    const headingText = isSuccessful ? "Subscription Confirmed" : "Payment Failed"
    const imageSrc = isSuccessful ?
        "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/4cfd82e7a9d58675c6acad5dffe9725e6a836a162a0a658e541d0a8bf870636d.png_or.png" :
        "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/6a17656baa42fae845213dd5c060842ee27598a8eac4975c0400b3cb4b254828.png_or.png"

    const fetchShopSubscriptionData = () => {
        queryClient.invalidateQueries({ queryKey: ["shop-subscription-plan"] })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        close()
    }

    return (
        <Flex direction={"column"} alignItems={"center"} gap={5}>
            <Heading textAlign={"center"} fontSize={36} fontWeight={700} color={"primary"}>{headingText}</Heading>

            <Divider m={0} height={"1px"} borderColor={"#292929"} />

            <Image src={imageSrc} width={"349px"} height={"auto"} objectFit={"cover"} />

            <AppTypography fontSize={20} color={"#C2C2C2"}>
                {isSuccessful ?
                    <>
                        Thank you for subscribing to the {" "}
                        <Box as="span" color={"primary"}>{subscriptionPlanMap[selectedPlan.type].title} Plan!</Box> {" "}
                        Your payment was successful.
                    </>
                    :
                    "Oops! Something went wrong with your payment. Please check your payment details and try again"
                }
            </AppTypography>

            {
                isSuccessful ?
                    <BasicButton onClick={fetchShopSubscriptionData}>Great</BasicButton> :
                    <BasicButton variant='outline' onClick={close}>Cancel</BasicButton>
            }
        </Flex>
    )
}

export default PaymentStatus