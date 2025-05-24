import { Box, Flex, Text } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import { ShopSubscriptionData } from 'lib/apis/subscription/interfaces'
import React from 'react'
import { formatDateToLongStyle, getSubscriptionPlanIcon } from 'utils/helpers'
import { ICurrentSubData } from '../../../CurrentPlan'
import TitledText from './TitledText'
import { useMutation, useQueryClient } from 'react-query'
import { cancelSubscription } from 'lib/apis/subscription/subscriptionServices'
import useAppToast from 'hooks/toast/useToast'

interface Props {
    data: ShopSubscriptionData
    handleCloseModal: () => void
}

export default function DetailsTab({ data, handleCloseModal }: Props) {
    const { showToast } = useAppToast()
    const queryClient = useQueryClient();
    const { isLoading, mutateAsync } = useMutation({
        mutationFn: () => cancelSubscription(),
        onSuccess: () => {
            showToast({ message: "Subscription cancelled successfully", type: "success" });
            queryClient.invalidateQueries({ queryKey: ["shop-subscription-plan"] });
            handleCloseModal();
        },
        onError: (error: any) => {
            showToast({ message: error?.response?.data?.message || "Failed to cancel subscription", type: "error" });
        }
    })
    const currentSubData: ICurrentSubData = getSubscriptionPlanIcon(data.subscriptionId.type);
    const IconComponent = currentSubData.icon;
    const billingCycle = data.monthLength === 1 ? "Monthly" : data.monthLength === 12 ? "Annual" : "5-Year";
    const period = `${formatDateToLongStyle(new Date(data.startsAt))} - ${formatDateToLongStyle(new Date(data.expiresAt))}`
    const nextBillingDate = `${formatDateToLongStyle(new Date(data.expiresAt))}`;
    const autoRenew = data.autoRenew ? "Enabled" : "Disabled";
    const autoRenewTooltip = data.autoRenew ? `Your Subscription will renew on ${nextBillingDate}` : `Subscription will remain active until ${nextBillingDate}. It won’t renew after this date.`;


    return (
        <>
            <RuledGrid columns={1} borderRadius={16}>
                <Flex flexDirection="column" gap={6} p={6}>
                    <Text color="#fff" fontSize={16} fontWeight={500}>Subscription Details</Text>
                    <Flex flexDirection="column" gap={4}>
                        <TitledText
                            title='Subscription Plan'
                            text={
                                <Flex gap={1} alignItems="center">
                                    <IconComponent color="#fff" stroke="#fff" width="16px" height="16px" />
                                    <Text color="#fff" fontSize={14} fontWeight={500}>{currentSubData.title} Plan</Text>
                                </Flex>
                            }
                        />
                        <TitledText title='Billing Cycle' text={billingCycle} />
                        <TitledText title='Auto Renewal' toolTipText={autoRenewTooltip} text={autoRenew} />
                        <TitledText title='Subscription Period' text={period} />
                        <TitledText title='Next Billing Date' text={nextBillingDate} />
                    </Flex>
                </Flex>

                <Flex flexDirection="column" gap={4} p={6}>
                    {/* TODO: We also need Payment Method */}
                    <TitledText title='Amount' text={<FormattedPrice price={data.paidAmount} />} />
                </Flex>

                {currentSubData.title !== "Starter" &&
                    <Box px={6} py="10px">
                        <AppButton
                            mx="auto"
                            color="#F24"
                            variant='normal'
                            onClick={() => mutateAsync()}
                            isLoading={isLoading}
                            isDisabled={!data.autoRenew}
                        >
                            {data.autoRenew ? "Cancel Subscription" : "Subscription Canceled"}
                        </AppButton>
                    </Box>
                }
            </RuledGrid>
        </>
    )
}
