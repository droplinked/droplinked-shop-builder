import { useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from './components/ConfirmationModal'
import DetailsModal from './components/details-modal/DetailsModal'
import DropInfoModal from './components/drop-info-modal/DropInfoModal'
import ProductShareModal from './components/share-modal/ShareModal'

interface Props {
    product: any
}

function ProductTableActionMenu({ product }: Props) {
    const navigate = useNavigate()
    const updateProductPageState = useProductPageStore(s => s.updateProductPageState)
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { onOpen: onShareModalOpen, onClose: onShareModalClose, isOpen: isShareModalOpen } = useDisclosure()
    const { onOpen: onDetailsModalOpen, onClose: onDetailsModalClose, isOpen: isDetailsModalOpen } = useDisclosure()
    const { onOpen: onDropInfoModalOpen, onClose: onDropInfoModalClose, isOpen: isDropInfoModalOpen } = useDisclosure()

    const actions = [
        {
            title: "Details",
            onClick: onDetailsModalOpen,
            icon: <AppIcons.Invoice />
        },
        {
            title: "Edit",
            onClick: () => updateProductPageState("editingProductId", product._id),
            icon: <AppIcons.EditOutlined />
        },
        {
            ...product.nftData && {
                title: "DROP Information",
                onClick: onDropInfoModalOpen,
                icon: <AppIcons.DropProduct />
            }
        },
        {
            ...product.product_type === "PRINT_ON_DEMAND" && {
                title: "Order POD Sample",
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
            icon: <AppIcons.RedTrash />
        },
    ]

    return (
        <>
            <TableMenu items={actions} />
            <ConfirmationModal product={product} onClose={onClose} isOpen={isOpen} action={isDeleteModal ? "DELETE" : "DUPLICATE"} />
            <ProductShareModal product={product} close={onShareModalClose} open={isShareModalOpen} />
            <DetailsModal product={product} close={onDetailsModalClose} open={isDetailsModalOpen} />
            <DropInfoModal product={product} isOpen={isDropInfoModalOpen} onClose={onDropInfoModalClose} />
        </>
    )
}

export default ProductTableActionMenu