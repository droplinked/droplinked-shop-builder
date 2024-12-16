import AppIcons from 'assest/icon/Appicons'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import React, { useState } from 'react'
import ConfirmationModal from './components/ConfirmationModal'
import { useDisclosure } from '@chakra-ui/react'

interface Props {
    product: any // this was any. I just added refetch interface
    refetch: () => void
}

function ProductTableActionMenu({ product, refetch }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false)
    const actions = [
        {
            title: "Edit",
            onClick: () => console.log("Hi"),
            icon: <AppIcons.EditOutlined />
        },
        {
            title: "Order POD Sample",
            onClick: () => console.log("Hi"),
            icon: <AppIcons.Shirt />
        },
        {
            title: "Share",
            onClick: () => console.log("Hi"),
            icon: <AppIcons.Share />
        },
        {
            title: "Duplicate",
            onClick: () => {
                setIsDeleteModal(false)
                onOpen()
            },
            icon: <AppIcons.Copy style={{ transform: "scaleX(-1)" }} />
        },
        {
            title: "Remove",
            onClick: () => {
                setIsDeleteModal(true)
                onOpen()
            },
            color: "#F24",
            icon: <AppIcons.TrashRed />
        },
    ]

    return (
        <>
            <TableMenu items={actions} />
            <ConfirmationModal reFetch={refetch} onClose={onClose} isOpen={isOpen} product={product} type={isDeleteModal ? "DELETE" : "DUPLICATE"} />
        </>
    )
}

export default ProductTableActionMenu