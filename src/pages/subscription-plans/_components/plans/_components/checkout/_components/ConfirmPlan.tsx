import { Divider, Flex, Heading } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import { buySubscriptionPlanService } from 'lib/apis/subscription/subscriptionServices'
import PlanHeading from 'pages/subscription-plans/_components/PlanHeading'
import React, { Dispatch, SetStateAction } from 'react'
import { useMutation } from 'react-query'

interface Props {
    selectedPlan: SubscriptionPlan;
    setClientSecret: Dispatch<SetStateAction<string>>;
    close: () => void;
}

function ConfirmPlan({ selectedPlan: { price, _id, type }, setClientSecret, close }: Props) {
    const { isLoading, mutateAsync: confirmPlan } = useMutation(() => buySubscriptionPlanService({ amount: +price, subId: _id }))
    const { showToast } = useAppToast()

    const handleConfirmPlan = async () => {
        try {
            const { data: { clientSecret } } = await confirmPlan()
            setClientSecret(clientSecret)
        }
        catch (e) {
            showToast({ message: e.message, type: "error" })
        }
    }

    return (
        <Flex direction={"column"} gap={20}>
            <Flex direction={"column"} gap={5}>
                <Flex direction={"column"}>
                    <Heading textAlign={"center"} fontSize={36} fontWeight={700} color={"primary"}>Confirm Your Subscription</Heading>
                    <AppTypography textAlign={"center"} fontSize={20} color={"#C2C2C2"}>
                        Unlock Premium Features for {isNaN(+price) ? "free" : `Just $${price}/month`}
                    </AppTypography>
                </Flex>

                <Divider m={0} height={"1px"} borderColor={"#292929"} />

                <AppTypography textAlign={"center"} fontSize={20} color={"#C2C2C2"}>Upgrade to the Business Plan for advanced customization, exclusive features, and priority support. Confirm your subscription now to enhance your store.</AppTypography>

                <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    border={"1px solid"}
                    borderColor={"primary"}
                    borderRadius={16}
                    padding={8}
                    bgColor={"rgba(43, 207, 161, 0.03)"}
                >
                    <PlanHeading planTitle={type} fontSize={24} />
                    <AppTypography fontSize={24} fontWeight={700} color={"white"}>
                        {isNaN(+price) ? price : `${price} per month`}
                    </AppTypography>
                </Flex>
            </Flex>

            {/* actions */}
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <BasicButton variant='outline' onClick={close}>Back</BasicButton>
                <BasicButton isLoading={isLoading} isDisabled={isLoading} onClick={handleConfirmPlan}>Confirm</BasicButton>
            </Flex>
        </Flex>
    )
}

export default ConfirmPlan