import { useDisclosure } from '@chakra-ui/react'
import { EditMd } from 'assets/icons/Action/Edit/EditMd'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import ShippingZoneDrawer from 'pages/shipping-management/components/ShippingZoneDrawer/ShippingZoneDrawer'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    zoneIndex: number
}

function ZoneActionMenu({ zoneIndex }: Props) {
    const editModal = useDisclosure()
    const { zones, updateShippingProfile } = useShippingManagementStore(s => ({
        zones: s.shippingProfile.zones,
        updateShippingProfile: s.updateShippingProfile
    }))

    const { t } = useLocaleResources("shipping-management")

    const handleDeleteZone = () => {
        const newZones = [...zones]
        newZones.splice(zoneIndex, 1)
        updateShippingProfile("zones", newZones)
    }

    const actions = [
        {
            icon: <EditMd color='#fff' />,
            title: t('common:edit'),
            color: "text.white",
            onClick: editModal.onOpen
        },
        {
            icon: <TrashMd color='#ff2244' />,
            title: t('common:delete'),
            color: "system.error",
            onClick: handleDeleteZone
        }
    ]

    return (
        <>
            <TableMenu items={actions} />
            {editModal.isOpen && <ShippingZoneDrawer {...editModal} zoneIndex={zoneIndex} />}
        </>
    )
}

export default ZoneActionMenu