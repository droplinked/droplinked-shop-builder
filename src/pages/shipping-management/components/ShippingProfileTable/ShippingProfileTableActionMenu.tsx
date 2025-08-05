import { useDisclosure } from '@chakra-ui/react'
import { CopyMd } from 'assets/icons/Action/Copy/CopyMd'
import { EditMd } from 'assets/icons/Action/Edit/EditMd'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import React from 'react'
import DeleteShippingProfileModal from './DeleteShippingProfileModal'

interface Props {
    shippingProfile: any
}

function ShippingProfileTableActionMenu({ shippingProfile }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const actions = [
        {
            icon: <EditMd color='#fff' />,
            title: "Edit",
            onClick: () => console.log("Edit!")
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
            onClick: onOpen
        }
    ]

    return (
        <>
            <TableMenu items={actions} />
            <DeleteShippingProfileModal
                isOpen={isOpen}
                onClose={onClose}
                shippingProfile={shippingProfile}
            />
        </>
    )
}

export default ShippingProfileTableActionMenu