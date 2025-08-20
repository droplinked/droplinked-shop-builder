import { Flex, useDisclosure } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import ProductFormAccordion from 'pages/products/components/ProductDrawer/components/common/ProductFormAccordion'
import SectionContainer from 'pages/shipping-management/components/common/SectionContainer'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import { SHIPPING_METHOD } from 'pages/shipping-management/types/shipping'
import React from 'react'
import AddRateButton from './AddRateButton'
import AddZoneButton from './AddZoneButton'
import RateItem from './RateItem'
import ZoneActionMenu from './ZoneActionMenu'

function ZonesRatesAccordion() {
    const { t } = useLocaleResources("shipping-management")
    const zoneActionModal = useDisclosure()
    const zones = useShippingManagementStore(s => s.shippingProfile.zones)

    return (
        <ProductFormAccordion label={t('ZonesRatesAccordion.label')}>
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
                            description={t('ZonesRatesAccordion.locationsSelected', { count: zone.countries.length })}
                            rightAction={<ZoneActionMenu zoneIndex={index} />}
                        >
                            {shouldShowAddButton
                                ? <AddRateButton zoneIndex={index} />
                                : <RateItem zone={zone} zoneIndex={index} />
                            }
                        </SectionContainer>
                    )
                })}

                <AddZoneButton zoneModal={zoneActionModal} />
            </Flex>
        </ProductFormAccordion>
    )
}

export default ZonesRatesAccordion