import { Box, Flex, Text } from '@chakra-ui/react'
import { ExternalarrowMd } from 'assets/icons/Navigation/ExternalArrow/ExternalarrowMd'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import SwitchBox from 'components/redesign/switch-box/SwitchBox'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'
import { ShopSubscriptionData } from 'services/subscription/interfaces'
import { formatDateToLongStyle, getPlanDetails } from 'utils/helpers'
import TitledText from './TitledText'

interface Props {
    data: ShopSubscriptionData
}

interface IconProps {
    color?: string;
    stroke?: string;
    width?: string;
    height?: string;
}

export default function DetailsTab({ data }: Props) {
    const [isChecked, setIsChecked] = useState(true);
    const { t } = useLocaleResources('subscription');
    const currentSubData = getPlanDetails(data.subscriptionId.type, t);
    const IconComponent = currentSubData.icon as React.ComponentType<IconProps>;
    const billingCycle = data.monthLength === 1 
        ? t('detailsTab.cycles.monthly')
        : data.monthLength === 12 
        ? t('detailsTab.cycles.annual')
        : t('detailsTab.cycles.fiveYear');
    const period = `${formatDateToLongStyle(new Date(data.startsAt))} - ${formatDateToLongStyle(new Date(data.expiresAt))}`;
    const nextBillingDate = formatDateToLongStyle(new Date(data.expiresAt));

    return (
        <>
            <RuledGrid columns={1} borderRadius={16}>
                <Flex flexDirection="column" gap={6} p={6}>
                    <Text color="#fff" fontSize={16} fontWeight={500}>{t('detailsTab.subscriptionDetails')}</Text>
                    <Flex flexDirection="column" gap={4}>
                        <TitledText
                            title={t('detailsTab.subscriptionPlan')}
                            text={
                                <Flex gap={1} alignItems="center">
                                    <IconComponent color="#fff" stroke="#fff" width="16px" height="16px" />
                                    <Text color="#fff" fontSize={16} fontWeight={500}>
                                        {currentSubData.title} {t('detailsTab.planSuffix')}
                                    </Text>
                                </Flex>
                            }
                        />
                        <TitledText title={t('detailsTab.billingCycle')} text={billingCycle} />
                        <TitledText title={t('detailsTab.subscriptionPeriod')} text={period} />
                        <TitledText title={t('detailsTab.nextBillingDate')} text={nextBillingDate} />
                    </Flex>
                </Flex>

                <Flex flexDirection="column" gap={4} p={6}>
                    {/* TODO: We also need Payment Method */}
                    <TitledText title={t('detailsTab.amount')} text={<FormattedPrice price={data.paidAmount} />} />
                </Flex>

                <InteractiveText
                    // TODO: We need payment link
                    to='#'
                    justifyContent="center"
                    px={6}
                    py="14px"
                    iconRight={<ExternalarrowMd color='#179EF8' />}
                >
                    {t('detailsTab.viewPaymentDetails')}
                </InteractiveText>
            </RuledGrid>

            <RuledGrid columns={1} borderRadius={16} mt={4}>
                <Box p={6}>
                    <SwitchBox
                        isChecked={isChecked}
                        onToggle={(e) => setIsChecked(e.target.checked)}
                        title={t('detailsTab.autoRenewal.title')}
                        description={t('detailsTab.autoRenewal.description')}
                    />
                </Box>

                {/* TODO: Implement Cancel sub feature */}
                <InteractiveText
                    to='#'
                    justifyContent="center"
                    px={6}
                    py="14px"
                    color="#F24"
                >
                    {t('detailsTab.cancelSubscription')}
                </InteractiveText>
            </RuledGrid>
        </>
    )
}
