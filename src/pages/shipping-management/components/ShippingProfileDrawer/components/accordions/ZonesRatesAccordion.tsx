import { Flex, useDisclosure } from '@chakra-ui/react'
import { DotsMd } from 'assets/icons/Navigation/Dots/DotsMd'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import BlueButton from 'components/redesign/button/BlueButton'
import { useFormikContext } from 'formik'
import ProductFormAccordion from 'pages/products/components/ProductDrawer/components/common/ProductFormAccordion'
import SectionContainer from 'pages/shipping-management/components/common/SectionContainer'
import React, { useState } from 'react'
import { SHIPPING_METHOD, Zone } from '../../../../types/shipping'
import ShippingRateDrawer from '../../../ShippingRateDrawer/ShippingRateDrawer'
import ShippingZoneDrawer from '../../../ShippingZoneDrawer/ShippingZoneDrawer'
import AddRateButton from '../AddRateButton'
import RateItem from '../RateItem'

function ZonesRatesAccordion() {
    const { values, setFieldValue } = useFormikContext<{ zones: Zone[] }>()
    const zones = values.zones || []
    const zoneModal = useDisclosure()
    const rateModal = useDisclosure()
    const [activeZoneIndex, setActiveZoneIndex] = useState<number | null>(null)

    const handleAddZone = (zoneData: Zone) => {
        setFieldValue('zones', [...zones, zoneData])
    }

    const openRateModalForZone = (index: number) => {
        setActiveZoneIndex(index)
        rateModal.onOpen()
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
            <ShippingZoneDrawer {...zoneModal} onSave={handleAddZone} />
            <ShippingRateDrawer {...rateModal} zone={zones[activeZoneIndex]} />
        </>
    )
}

export default ZonesRatesAccordion