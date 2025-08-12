import { useDisclosure } from '@chakra-ui/react'
import { EditMd } from 'assets/icons/Action/Edit/EditMd'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import { DotsMd } from 'assets/icons/Navigation/Dots/DotsMd'
import { WarningLg } from 'assets/icons/Sign/Warning/WarningLg'
import AppConfirmationDialog from 'components/redesign/app-confirmation-dialog/AppConfirmationDialog'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import { SHIPPING_METHOD } from 'pages/shipping-management/types/shipping'
import React from 'react'
import ShippingRateDrawer from '../../ShippingRateDrawer/ShippingRateDrawer'

interface Props {
    zoneIndex: number
}

function RateActionMenu({ zoneIndex }: Props) {
    const editDrawer = useDisclosure()
    const deleteModal = useDisclosure()
    const { t } = useLocaleResources("shipping-management")
    const { zones, updateShippingProfile } = useShippingManagementStore(s => ({
        zones: s.shippingProfile.zones,
        updateShippingProfile: s.updateShippingProfile
    }))

    const handleDeleteRate = () => {
        const newZones = [...zones]
        newZones[zoneIndex] = {
            ...newZones[zoneIndex],
            shippingMethod: SHIPPING_METHOD.THIRD_PARTY,
            custom: undefined,
            thirdParty: undefined
        }
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
            {editDrawer.isOpen && <ShippingRateDrawer {...editDrawer} zoneIndex={zoneIndex} />}
            {deleteModal.isOpen && (
                <AppConfirmationDialog
                    isOpen={deleteModal.isOpen}
                    onClose={deleteModal.onClose}
                    icon={<WarningLg color="#fff" />}
                    title={t('DeleteShippingRateModal.title')}
                    description={t('DeleteShippingRateModal.description')}
                    variant="delete"
                    confirmButtonProps={{
                        children: t('common:delete'),
                        onClick: handleDeleteRate
                    }}
                />
            )}
        </>
    )
}

export default RateActionMenu