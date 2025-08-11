import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { DotsMd } from 'assets/icons/Navigation/Dots/DotsMd'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import { CUSTOM_SHIPPING_TYPE, SHIPPING_METHOD, Zone } from 'pages/shipping-management/types/shipping'
import { currencyFormatter, humanizeCustomType } from 'pages/shipping-management/utils/utils'
import React from 'react'
import ShippingRateDrawer from '../../ShippingRateDrawer/ShippingRateDrawer'

interface Props {
    zone: Zone
    zoneIndex: number
}

export default function RateItem({ zone, zoneIndex }: Props) {
    const rateModal = useDisclosure()

    const isThirdParty = zone?.shippingMethod === SHIPPING_METHOD.THIRD_PARTY
    const customDetails = zone?.custom
    const detailsToRender: Record<string, React.ReactNode> = {}

    if (isThirdParty) {
        if (zone.thirdParty && zone.thirdParty.length > 0) {
            detailsToRender['Shipping Services'] = (
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
                if (customDetails.price !== undefined) {
                    detailsToRender['Price'] = (
                        <Text color='text.white' fontSize={14}>
                            {currencyFormatter.format(customDetails.price)} USD
                        </Text>
                    )
                }
                break
            case CUSTOM_SHIPPING_TYPE.WEIGHT_BASED:
                if (customDetails.pricePerWeight !== undefined) {
                    detailsToRender['Price per Unit'] = (
                        <Text color='text.white' fontSize={14}>
                            {currencyFormatter.format(customDetails.pricePerWeight)} USD
                        </Text>
                    )
                }
                detailsToRender['Weight Unit'] = <Text color='text.white' fontSize={14}>kg</Text>
                break
            case CUSTOM_SHIPPING_TYPE.ITEM_COUNT_BASED:
                if (customDetails.pricePerItem !== undefined) {
                    detailsToRender['Price per Item'] = (
                        <Text color='text.white' fontSize={14}>
                            {currencyFormatter.format(customDetails.pricePerItem)} USD
                        </Text>
                    )
                }
                break
        }

        if (customDetails.estimatedDelivery) {
            const { minDays, maxDays } = customDetails.estimatedDelivery
            detailsToRender['Estimated Time'] = (
                <DotSeparatedList>
                    <Text color='text.white' fontSize={14}>{minDays} days</Text>
                    <Text color='text.white' fontSize={14}>{maxDays} days</Text>
                </DotSeparatedList>
            )
        }
    }

    const headerContent = isThirdParty ? (
        <Text fontSize={14} fontWeight={500} color='text.white'>
            Carrier Services
        </Text>
    ) : (
        <DotSeparatedList>
            <Text fontSize={14} fontWeight={500} color='text.white'>
                {customDetails?.rateName}
            </Text>
            {customDetails?.type &&
                <Text fontSize={14} color='text.subtext.placeholder.dark'>
                    {humanizeCustomType(customDetails.type)}
                </Text>
            }
        </DotSeparatedList>
    );

    return (
        <>
            <Flex
                direction="column"
                padding={4}
                gap={4}
            >
                <Flex justifyContent="space-between" alignItems="center" gap={2}>
                    {headerContent}
                    <button type='button' onClick={rateModal.onOpen}>
                        <DotsMd color='#fff' />
                    </button>
                </Flex>

                <Flex direction="column" gap={3}>
                    {Object.entries(detailsToRender).map(([key, value]) => (
                        <DetailRow key={key} label={key}>
                            {value}
                        </DetailRow>
                    ))}
                </Flex>
            </Flex>

            {rateModal.isOpen && <ShippingRateDrawer {...rateModal} zoneIndex={zoneIndex} />}
        </>
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