import { useDisclosure } from '@chakra-ui/react'
import { CopyMd } from 'assets/icons/Action/Copy/CopyMd'
import { EditMd } from 'assets/icons/Action/Edit/EditMd'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import React from 'react'
import ShippingProfileDrawer from '../ShippingProfileDrawer/ShippingProfileDrawer'
import DeleteShippingProfileModal from './DeleteShippingProfileModal'

interface Props {
    shippingProfile: ShippingProfile
}

function ShippingProfileTableActionMenu({ shippingProfile }: Props) {
    const shippingProfileDrawer = useDisclosure()
    const deleteModal = useDisclosure()

    const actions = [
        {
            icon: <EditMd color='#fff' />,
            title: "Edit",
            onClick: shippingProfileDrawer.onOpen
        },
        {
            icon: <CopyMd color='#fff' />,
            title: "Duplicate",
            onClick: () => console.log("Duplicate!")
        },
        {
            icon: <TrashMd color='#ff2244' />,
            title: "Remove",
            color: "system.error",
            onClick: deleteModal.onOpen
        }
    ]

    return (
        <>
            <TableMenu items={actions} />
            <DeleteShippingProfileModal {...deleteModal} shippingProfile={shippingProfile} />
            <ShippingProfileDrawer {...shippingProfileDrawer} shippingProfile={shippingProfile} />
        </>
    )
}

export default ShippingProfileTableActionMenu