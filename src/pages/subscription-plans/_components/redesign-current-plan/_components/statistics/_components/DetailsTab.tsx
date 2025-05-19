import { Box, Flex, Text } from '@chakra-ui/react'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import { ShopSubscriptionData } from 'lib/apis/subscription/interfaces'
import React, { useState } from 'react'
import TitledText from './TitledText'
import { formatDateToLongStyle, getSubscriptionPlanIcon } from 'utils/helpers'
import { ICurrentSubData } from '../../../CurrentPlan'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import { ExternalarrowMd } from 'assets/icons/Navigation/ExternalArrow/ExternalarrowMd'
import SwitchBox from 'components/redesign/switch-box/SwitchBox'
import AppButton from 'components/redesign/button/AppButton'

interface Props {
    data: ShopSubscriptionData
}

export default function DetailsTab({ data }: Props) {
    const [isChecked, setIsChecked] = useState(true);

    const currentSubData: ICurrentSubData = getSubscriptionPlanIcon(data.subscriptionId.type);
    const IconComponent = currentSubData.icon;
    const billingCycle = data.monthLength === 1 ? "Monthly" : data.monthLength === 12 ? "Annual" : "5-Year";
    const period = `${formatDateToLongStyle(new Date(data.startsAt))} - ${formatDateToLongStyle(new Date(data.expiresAt))}`
    const nextBillingDate = `${formatDateToLongStyle(new Date(data.expiresAt))}`;

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
                        <TitledText title='Subscription Period' text={period} />
                        <TitledText title='Next Billing Date' text={nextBillingDate} />
                    </Flex>
                </Flex>

                <Flex flexDirection="column" gap={4} p={6}>
                    {/* TODO: We also need Payment Method */}
                    <TitledText title='Amount' text={<FormattedPrice price={data.paidAmount} />} />
                </Flex>

                <InteractiveText
                    // TODO: We need payment link
                    to='#'
                    justifyContent="center"
                    px={6}
                    py="14px"
                    iconRight={<ExternalarrowMd color='#179EF8' />}
                >
                    View Full Payment Details
                </InteractiveText>
            </RuledGrid>

            <RuledGrid columns={1} borderRadius={16} mt={4}>
                <Box p={6}>
                    <SwitchBox
                        isChecked={isChecked}
                        onToggle={(e) => setIsChecked(e.target.checked)}
                        title='Auto Renewal'
                        description='Auto-renewal keeps your subscription running without interruption. If turned off, it won’t renew automatically and can only be re-enabled by purchasing a new plan.'
                    />
                </Box>

                {/* TODO: Implement Cancel sub feature */}
                <Box px={6} py="10px">
                    <AppButton
                        mx="auto"
                        color="#F24"
                        variant='normal'
                    >
                        Cancel Subscription
                    </AppButton>
                </Box>
            </RuledGrid>
        </>
    )
}
