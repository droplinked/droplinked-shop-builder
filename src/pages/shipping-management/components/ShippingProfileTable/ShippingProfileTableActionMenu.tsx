import { CopyMd } from 'assets/icons/Action/Copy/CopyMd'
import { EditMd } from 'assets/icons/Action/Edit/EditMd'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import React from 'react'

interface Props {
    shippingProfile: any
}

function ShippingProfileTableActionMenu({ shippingProfile }: Props) {
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
            onClick: () => console.log("Remove!")
        }
    ]

    return (
        <>
            <TableMenu items={actions} />
        </>
    )
}

export default ShippingProfileTableActionMenu