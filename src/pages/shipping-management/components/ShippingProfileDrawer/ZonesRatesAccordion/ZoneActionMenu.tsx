import { useDisclosure } from '@chakra-ui/react'
import { EditMd } from 'assets/icons/Action/Edit/EditMd'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import { DotsMd } from 'assets/icons/Navigation/Dots/DotsMd'
import { WarningLg } from 'assets/icons/Sign/Warning/WarningLg'
import AppConfirmationDialog from 'components/redesign/app-confirmation-dialog/AppConfirmationDialog'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import ShippingZoneDrawer from 'pages/shipping-management/components/ShippingZoneDrawer/ShippingZoneDrawer'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import React from 'react'

interface Props {
    zoneIndex: number
}

function ZoneActionMenu({ zoneIndex }: Props) {
    const editDrawer = useDisclosure()
    const deleteModal = useDisclosure()
    const { t } = useLocaleResources("shipping-management")
    const { zones, updateShippingProfile } = useShippingManagementStore(s => ({
        zones: s.shippingProfile.zones,
        updateShippingProfile: s.updateShippingProfile
    }))

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
            onClick: editDrawer.onOpen
        },
        {
            icon: <TrashMd color='#ff2244' />,
            title: t('common:delete'),
            color: "system.error",
            onClick: deleteModal.onOpen
        }
    ]

    return (
        <>
            <TableMenu items={actions} menuButtonIcon={<DotsMd color="#fff" />} />
            {editDrawer.isOpen && <ShippingZoneDrawer {...editDrawer} zoneIndex={zoneIndex} />}
            {deleteModal.isOpen && (
                <AppConfirmationDialog
                    isOpen={deleteModal.isOpen}
                    onClose={deleteModal.onClose}
                    icon={<WarningLg color="#fff" />}
                    title={t('DeleteShippingZoneModal.title')}
                    description={t('DeleteShippingZoneModal.description')}
                    variant="delete"
                    confirmButtonProps={{
                        children: t('common:delete'),
                        onClick: handleDeleteZone
                    }}
                />
            )}
        </>
    )
}

export default ZoneActionMenu