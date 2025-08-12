import { useDisclosure } from '@chakra-ui/react'
import { EditMd } from 'assets/icons/Action/Edit/EditMd'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import React from 'react'
import ShippingProfileDrawer from '../ShippingProfileDrawer/ShippingProfileDrawer'
import DeleteShippingProfileModal from './DeleteShippingProfileModal'
import DuplicateShippingProfileModal from './DuplicateShippingProfileModal'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    shippingProfile: ShippingProfile
}

function ShippingProfileTableActionMenu({ shippingProfile }: Props) {
    const { t } = useLocaleResources("shipping-management")
    const shippingProfileDrawer = useDisclosure()
    const deleteModal = useDisclosure()
    const duplicateModal = useDisclosure()

    const actions = [
        {
            icon: <EditMd color='#fff' />,
            title: t('common:edit'),
            onClick: shippingProfileDrawer.onOpen
        },
        // {
        //     icon: <CopyMd color='#fff' />,
        //     title: "Duplicate",
        //     onClick: duplicateModal.onOpen
        // },
        {
            icon: <TrashMd color='#ff2244' />,
            title: t('common:remove'),
            color: "system.error",
            onClick: deleteModal.onOpen
        }
    ]

    return (
        <>
            <TableMenu items={actions} />
            <DeleteShippingProfileModal {...deleteModal} shippingProfile={shippingProfile} />
            <ShippingProfileDrawer {...shippingProfileDrawer} editingShippingProfile={shippingProfile} />
            <DuplicateShippingProfileModal {...duplicateModal} shippingProfile={shippingProfile} />
        </>
    )
}

export default ShippingProfileTableActionMenu