import { useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from './components/ConfirmationModal'
import DetailsModal from './components/details-modal/DetailsModal'
import DropInfoModal from './components/drop-info-modal/DropInfoModal'
import ProductShareModal from './components/share-modal/ShareModal'

interface Props {
    product: any // this was any. I just added refetch interface
    refetch: () => void
}

function ProductTableActionMenu({ product, refetch }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false)
    const { onOpen: onShareModalOpen, onClose: onShareModalClose, isOpen: isShareModalOpen } = useDisclosure()
    const { onOpen: onDetailsModalOpen, onClose: onDetailsModalClose, isOpen: isDetailsModalOpen } = useDisclosure()
    const { onOpen: onDropInfoModalOpen, onClose: onDropInfoModalClose, isOpen: isDropInfoModalOpen } = useDisclosure()
    
    const navigate = useNavigate()
    const actions = [
        {
            title: "Details",
            onClick: onDetailsModalOpen,
            icon: <AppIcons.Invoice />
        },
        {
            title: "Edit",
            onClick: () => console.log("Hi"),
            icon: <AppIcons.EditOutlined />
        },
        {
            title: "DROP Information",
            onClick: onDropInfoModalOpen,
            icon: <AppIcons.NFT />
        },
        {
            ...product.product_type === "PRINT_ON_DEMAND" && {
                title: "Order POD Sample",
                //FIXME: Fix this route when you changed route from V2 to normal products route
                onClick: () => navigate("/analytics/products/order/" + product._id),
                icon: <AppIcons.Shirt />
            },
        },
        {
            title: "Share",
            onClick: onShareModalOpen,
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
            <ProductShareModal product={product} key={product._id} close={onShareModalClose} open={isShareModalOpen} />
            <DetailsModal product={product} key={product._id} close={onDetailsModalClose} open={isDetailsModalOpen} />
            <DropInfoModal product={product} key={product._id} close={onDropInfoModalClose} open={isDropInfoModalOpen} />
        </>
    )
}

export default ProductTableActionMenu