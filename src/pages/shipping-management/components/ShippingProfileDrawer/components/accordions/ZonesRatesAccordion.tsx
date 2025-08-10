import { Flex, useDisclosure } from '@chakra-ui/react'
import { DotsMd } from 'assets/icons/Navigation/Dots/DotsMd'
import ProductFormAccordion from 'pages/products/components/ProductDrawer/components/common/ProductFormAccordion'
import SectionContainer from 'pages/shipping-management/components/common/SectionContainer'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import React, { useState } from 'react'
import { SHIPPING_METHOD } from '../../../../types/shipping'
import ShippingZoneDrawer from '../../../ShippingZoneDrawer/ShippingZoneDrawer'
import AddRateButton from '../AddRateButton'
import AddZoneButton from '../AddZoneButton'
import RateItem from '../RateItem'

function ZonesRatesAccordion() {
    const [activeZoneIndex, setActiveZoneIndex] = useState<number>()
    const zoneModal = useDisclosure()
    const { zones } = useShippingManagementStore(s => ({ zones: s.zones }))

    const openModal = (index: number) => {
        setActiveZoneIndex(index)
        zoneModal.onOpen()
    }

    return (
        <>
            <ProductFormAccordion label="Zones and Rates">
                <Flex direction="column" gap={4}>
                    {zones.map((zone, index) => {
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
                                    <button type='button' onClick={() => openModal(index)}>
                                        <DotsMd color='#fff' />
                                    </button>
                                }
                            >
                                {shouldShowAddButton
                                    ? <AddRateButton zone={zone} />
                                    : <RateItem zone={zone} />
                                }
                            </SectionContainer>
                        )
                    })}

                    <AddZoneButton zoneModal={zoneModal} />
                </Flex>
            </ProductFormAccordion>

            {zoneModal.isOpen && <ShippingZoneDrawer {...zoneModal} zoneIndex={activeZoneIndex} />}
        </>
    )
}

export default ZonesRatesAccordion