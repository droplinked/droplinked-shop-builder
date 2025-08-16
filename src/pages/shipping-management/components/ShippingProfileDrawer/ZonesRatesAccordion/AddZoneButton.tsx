import { UseDisclosureReturn } from '@chakra-ui/react'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import BlueButton from 'components/redesign/button/BlueButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import ShippingZoneDrawer from '../../ShippingZoneDrawer/ShippingZoneDrawer'

function AddZoneButton({ zoneModal }: { zoneModal: UseDisclosureReturn }) {
    const { isOpen, onOpen } = zoneModal
    const { t } = useLocaleResources("shipping-management")

    return (
        <>
            <BlueButton
                gap="6px"
                border="1px solid"
                borderColor="neutral.gray.800"
                padding="10px 14px"
                fontSize={14}
                onClick={onOpen}
            >
                <PlusMd color='currentColor' />
                {t('AddZoneButton.title')}
            </BlueButton>

            {isOpen && <ShippingZoneDrawer {...zoneModal} />}
        </>
    )
}

export default AddZoneButton