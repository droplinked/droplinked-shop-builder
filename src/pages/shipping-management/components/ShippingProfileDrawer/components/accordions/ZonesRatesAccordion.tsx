import { Flex, useDisclosure } from '@chakra-ui/react'
import { DotsMd } from 'assets/icons/Navigation/Dots/DotsMd'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import BlueButton from 'components/redesign/button/BlueButton'
import ProductFormAccordion from 'pages/products/components/ProductDrawer/components/common/ProductFormAccordion'
import SectionContainer from 'pages/shipping-management/components/common/SectionContainer'
import React, { useState } from 'react'
import { SHIPPING_METHOD, Zone } from '../../../../types/shipping'
import ShippingRateDrawer from '../../../ShippingRateDrawer/ShippingRateDrawer'
import ShippingZoneDrawer from '../../../ShippingZoneDrawer/ShippingZoneDrawer'
import AddRateButton from '../AddRateButton'
import RateItem from '../RateItem'

function ZonesRatesAccordion() {
    const zoneModal = useDisclosure()
    const rateModal = useDisclosure()
    const [activeZoneIndex, setActiveZoneIndex] = useState<number | null>(null)

    const openRateModalForZone = (index: number) => {
        setActiveZoneIndex(index)
        rateModal.onOpen()
    }

    return (
        <>
            <ProductFormAccordion label="Zones and Rates">
                <Flex direction="column" gap={4}>
                    {[].map((zone, index) => {
                        const shouldShowAddButton = (
                            zone.shippingMethod === SHIPPING_METHOD.THIRD_PARTY &&
                            (!zone.thirdParty || zone.thirdParty.length === 0)
                        ) || (
                                zone.shippingMethod === SHIPPING_METHOD.CUSTOM &&
                                (!zone.custom || !zone.custom.rateName)
                            )

                        return (
                            <SectionContainer
                                key={zone.name}
                                title={zone.name}
                                description={`${zone.countries.length} Locations Selected`}
                                rightAction={
                                    <button type='button' onClick={() => openRateModalForZone(index)}>
                                        <DotsMd color='#fff' />
                                    </button>
                                }
                            >
                                {shouldShowAddButton
                                    ? <AddRateButton onClick={() => openRateModalForZone(index)} />
                                    : <RateItem zone={zone} />
                                }
                            </SectionContainer>
                        )
                    })}

                    <BlueButton
                        gap="6px"
                        border="1px solid"
                        borderColor="neutral.gray.800"
                        padding="10px 14px"
                        fontSize={14}
                        onClick={zoneModal.onOpen}
                    >
                        <PlusMd color='currentColor' />
                        Add Shipping Zone
                    </BlueButton>
                </Flex>
            </ProductFormAccordion>

            {/* Modals */}
            <ShippingZoneDrawer {...zoneModal} />
            <ShippingRateDrawer {...rateModal} zone={null} />
        </>
    )
}

export default ZonesRatesAccordion