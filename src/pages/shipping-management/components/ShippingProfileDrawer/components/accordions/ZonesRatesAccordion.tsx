import { Flex, Text } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import ProductFormAccordion from 'pages/products/components/ProductDrawer/components/common/ProductFormAccordion'
import SectionContainer from 'pages/shipping-management/components/common/SectionContainer'
import React, { useState } from 'react'
import AddShippingRateModal from '../modals/AddShippingRateModal'
import AddShippingZoneModal, { ShippingRate, ShippingZone } from '../modals/AddShippingZoneModal'

function ZonesRatesAccordion() {
    const [zones, setZones] = useState<ShippingZone[]>([])
    const [isZoneModalOpen, setZoneModalOpen] = useState(false)

    const [isRateModalOpen, setRateModalOpen] = useState(false)
    const [activeZoneId, setActiveZoneId] = useState<number | null>(null)

    const handleAddZone = (zoneData: Omit<ShippingZone, 'id' | 'rates'>) => {
        const newZone: ShippingZone = {
            id: Date.now(),
            name: zoneData.name,
            countries: zoneData.countries,
            rates: [],
        }
        setZones((prev) => [...prev, newZone])
    }

    const handleAddRate = (rateName: string) => {
        if (activeZoneId === null) return
        const newRate: ShippingRate = { id: Date.now(), name: rateName }
        setZones((prev) =>
            prev.map((z) => (z.id === activeZoneId ? { ...z, rates: [...z.rates, newRate] } : z))
        )
    }

    const openRateModalForZone = (zoneId: number) => {
        setActiveZoneId(zoneId)
        setRateModalOpen(true)
    }

    return (
        <>
            <ProductFormAccordion label="Zones and Rates">
                <Flex direction="column" gap={4}>
                    {zones.map((zone) => (
                        <SectionContainer
                            key={zone.id}
                            title={zone.name}
                            rightAction={
                                <AppButton size="sm" onClick={() => openRateModalForZone(zone.id)}>
                                    Add New Rate
                                </AppButton>
                            }
                        >
                            {zone.rates.length > 0 ? (
                                <Flex flexDir="column" gap={2} padding={4}>
                                    {zone.rates.map((rate) => (
                                        <Text key={rate.id} color="text.white">
                                            {rate.name}
                                        </Text>
                                    ))}
                                </Flex>
                            ) : (
                                <Flex padding={4}>
                                    <Text fontSize={14} color="text.subtext.placeholder.dark">
                                        No rates added yet.
                                    </Text>
                                </Flex>
                            )}
                        </SectionContainer>
                    ))}

                    <AppButton onClick={() => setZoneModalOpen(true)}>Add Shipping Zone</AppButton>
                </Flex>
            </ProductFormAccordion>

            {/* Modals */}
            <AddShippingZoneModal
                isOpen={isZoneModalOpen}
                onClose={() => setZoneModalOpen(false)}
                onSave={handleAddZone}
            />

            <AddShippingRateModal
                isOpen={isRateModalOpen}
                onClose={() => setRateModalOpen(false)}
                onSave={handleAddRate}
            />
        </>
    )
}

export default ZonesRatesAccordion
