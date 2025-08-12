import { Box, Flex, Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { CUSTOM_SHIPPING_TYPE, SHIPPING_METHOD, Zone } from 'pages/shipping-management/types/shipping'
import React from 'react'
import RateActionMenu from './RateActionMenu'

interface Props {
    zone: Zone
    zoneIndex: number
}

export default function RateItem({ zone, zoneIndex }: Props) {
    const { t } = useLocaleResources("shipping-management")

    const isThirdParty = zone?.shippingMethod === SHIPPING_METHOD.THIRD_PARTY
    const customDetails = zone?.custom
    const detailsToRender: Record<string, React.ReactNode> = {}

    if (isThirdParty) {
        if (zone.thirdParty && zone.thirdParty.length > 0) {
            detailsToRender[t('ThirdPartyServiceSelector.label')] = (
                <DotSeparatedList>
                    {zone.thirdParty.map((service) => (
                        <Text key={service} color='text.white' fontSize={14}>
                            {service}
                        </Text>
                    ))}
                </DotSeparatedList>
            )
        }
    } else if (customDetails) {
        switch (customDetails.type) {
            case CUSTOM_SHIPPING_TYPE.FLAT_RATE:
                detailsToRender[t('CustomRateForm.price')] = (
                    <FormattedPrice
                        price={customDetails.price}
                        abbreviationProps={{ color: 'text.subtext.placeholder.dark' }}
                    />
                )
                break

            case CUSTOM_SHIPPING_TYPE.WEIGHT_BASED:
                detailsToRender[t('CustomRateForm.pricePerUnit')] = (
                    <FormattedPrice
                        price={customDetails.pricePerWeight}
                        abbreviationProps={{ color: 'text.subtext.placeholder.dark' }}
                    />
                )
                break

            case CUSTOM_SHIPPING_TYPE.ITEM_COUNT_BASED:
                detailsToRender[t('CustomRateForm.pricePerItem')] = (
                    <FormattedPrice
                        price={customDetails.pricePerItem}
                        abbreviationProps={{ color: 'text.subtext.placeholder.dark' }}
                    />
                )
                break
        }

        if (customDetails.estimatedDelivery) {
            const { minDays, maxDays } = customDetails.estimatedDelivery
            detailsToRender[t('RateItem.estimatedTime')] = (
                <DotSeparatedList>
                    <Text color='text.white' fontSize={14}>
                        {minDays}{' '}
                        <Box as='span' color='text.subtext.placeholder.dark'>
                            {minDays === 1 ? t('RateItem.daySingular') : t('RateItem.dayPlural')}
                        </Box>
                    </Text>
                    <Text color='text.white' fontSize={14}>
                        {maxDays}{' '}
                        <Box as='span' color='text.subtext.placeholder.dark'>
                            {maxDays === 1 ? t('RateItem.daySingular') : t('RateItem.dayPlural')}
                        </Box>
                    </Text>
                </DotSeparatedList>
            )
        }
    }

    const headerContent = isThirdParty ? (
        <Text fontSize={14} fontWeight={500} color='text.white'>
            {t('ShippingMethodSelect.items.carrierServices')}
        </Text>
    ) : (
        <DotSeparatedList>
            <Text fontSize={14} fontWeight={500} color='text.white'>
                {customDetails?.rateName}
            </Text>
            {customDetails?.type &&
                <Text fontSize={14} color='text.subtext.placeholder.dark'>
                    {customDetails.type === CUSTOM_SHIPPING_TYPE.FLAT_RATE && t('CustomRateForm.select.options.flatRate')}
                    {customDetails.type === CUSTOM_SHIPPING_TYPE.WEIGHT_BASED && t('CustomRateForm.select.options.weightBasedRate')}
                    {customDetails.type === CUSTOM_SHIPPING_TYPE.ITEM_COUNT_BASED && t('CustomRateForm.select.options.perItemRate')}
                </Text>
            }
        </DotSeparatedList>
    );

    return (
        <Flex
            direction="column"
            padding={4}
            gap={4}
        >
            <Flex justifyContent="space-between" alignItems="center" gap={2}>
                {headerContent}
                <RateActionMenu zoneIndex={zoneIndex} />
            </Flex>

            <Flex direction="column" gap={3}>
                {Object.entries(detailsToRender).map(([key, value]) => (
                    <DetailRow key={key} label={key}>
                        {value}
                    </DetailRow>
                ))}
            </Flex>
        </Flex>
    )
}

function DetailRow({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <Flex alignItems="center" justifyContent="space-between" fontSize={14}>
            <Text color='text.subtext.placeholder.dark'>{label}</Text>
            {children}
        </Flex>
    )
}