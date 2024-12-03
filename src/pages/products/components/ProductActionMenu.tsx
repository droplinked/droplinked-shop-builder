import AppIcons from 'assest/icon/Appicons'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import React from 'react'

function ProductActionMenu({ product }: { product: any }) {
    const actions = [
        {
            title: "Edit",
            onClick: () => console.log("Hi"),
            icon: <AppIcons.EditOutlined />
        }
    ]

    return (
        <TableMenu items={actions} />
    )
}

export default ProductActionMenu