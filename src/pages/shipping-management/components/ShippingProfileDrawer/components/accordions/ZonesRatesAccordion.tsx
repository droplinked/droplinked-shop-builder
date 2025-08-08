import { Flex } from '@chakra-ui/react'
import { DotsMd } from 'assets/icons/Navigation/Dots/DotsMd'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import BlueButton from 'components/redesign/button/BlueButton'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import ProductFormAccordion from 'pages/products/components/ProductDrawer/components/common/ProductFormAccordion'
import SectionContainer from 'pages/shipping-management/components/common/SectionContainer'
import React, { useState } from 'react'
import { Zone } from '../../../../types/shipping'
import ShippingRateDrawer from '../../../ShippingRateDrawer/ShippingRateDrawer'
import ShippingZoneDrawer from '../../../ShippingZoneDrawer/ShippingZoneDrawer'
import AddRateButton from '../AddRateButton'
import RateItem from '../RateItem'

function ZonesRatesAccordion() {
    const [zones, setZones] = useState<Zone[]>([])
    const [isZoneModalOpen, setZoneModalOpen] = useState(false)
    const [isRateModalOpen, setRateModalOpen] = useState(false)

    const handleAddZone = (zoneData: Zone) => {
        setZones((prev) => [...prev, zoneData])
    }

    return (
        <>
            <ProductFormAccordion label="Zones and Rates">
                <Flex direction="column" gap={4}>
                    {zones.map((zone) => (
                        <SectionContainer
                            key={zone.name}
                            title={zone.name}
                            description={`${zone.countries.length} Locations Selected`}
                            rightAction={<DotsMd color='#fff' />}
                        >
                            <RuledGrid columns={1} nested>
                                <RateItem zone={zone} />
                                <AddRateButton onClick={() => setRateModalOpen(true)} />
                            </RuledGrid>
                        </SectionContainer>
                    ))}

                    <BlueButton
                        gap="6px"
                        border="1px solid"
                        borderColor="neutral.gray.800"
                        padding="10px 14px"
                        fontSize={14}
                        onClick={() => setZoneModalOpen(true)}
                    >
                        <PlusMd color='currentColor' />
                        Add Shipping Zone
                    </BlueButton>
                </Flex>
            </ProductFormAccordion>

            {/* Modals */}
            <ShippingZoneDrawer
                isOpen={isZoneModalOpen}
                onClose={() => setZoneModalOpen(false)}
                onSave={handleAddZone}
            />

            <ShippingRateDrawer
                isOpen={isRateModalOpen}
                onClose={() => setRateModalOpen(false)}
                onSave={() => { }}
            />
        </>
    )
}

export default ZonesRatesAccordion