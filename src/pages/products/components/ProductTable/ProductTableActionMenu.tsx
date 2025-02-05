import { Spinner, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import { checkIfProductIsRecorded } from 'pages/products/utils/skuUtils'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from './components/ConfirmationModal'
import DetailsModal from './components/details-modal/DetailsModal'
import DropInfoModal from './components/drop-info-modal/DropInfoModal'
import ProductShareModal from './components/share-modal/ShareModal'

export type action = "DELETE" | "DUPLICATE" | "PUBLISH" | "DRAFT"

function ProductTableActionMenu({ product }: { product: any }) {
    const navigate = useNavigate()
    const [action, setAction] = useState<action>("DELETE")
    const updateProductPageState = useProductPageStore(s => s.updateProductPageState)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { onOpen: onShareModalOpen, onClose: onShareModalClose, isOpen: isShareModalOpen } = useDisclosure()
    const { onOpen: onDetailsModalOpen, onClose: onDetailsModalClose, isOpen: isDetailsModalOpen } = useDisclosure()
    const { onOpen: onDropInfoModalOpen, onClose: onDropInfoModalClose, isOpen: isDropInfoModalOpen } = useDisclosure()

    const isProductRecorded = checkIfProductIsRecorded(product?.skuIDs)
    const isProductPublished = product?.publish_status === "PUBLISHED"

    const handleActionClick = (selectedAction: action) => {
        setAction(selectedAction)
        onOpen()
    }

    const actions = [
        {
            icon: <AppIcons.Invoice />,
            title: "Details",
            onClick: onDetailsModalOpen
        },
        {
            icon: <AppIcons.EditOutlined />,
            title: "Edit",
            onClick: () => updateProductPageState("editingProductId", product._id)
        },
        {
            ...product.nftData && {
                icon: <AppIcons.DropProduct />,
                title: "DROP Information",
                onClick: onDropInfoModalOpen
            }
        },
        {
            ...product.product_type === "PRINT_ON_DEMAND" &&
            {
                icon: <AppIcons.Shirt />,
                title: "Order POD Sample",
                onClick: () => navigate("/analytics/products/order/" + product._id)
            },
        },
        {
            icon: <AppIcons.Share />,
            title: "Share",
            onClick: onShareModalOpen
        },
        {
            icon: <AppIcons.Copy />,
            title: "Duplicate",
            onClick: () => handleActionClick("DUPLICATE")
        },
        {
            ...!isProductRecorded &&
            {
                icon: <AppIcons.Transfer />,
                title: `Make ${isProductPublished ? "Draft" : "Public"}`,
                onClick: () => handleActionClick(isProductPublished ? "DRAFT" : "PUBLISH"),
            }
        },
        {
            icon: <AppIcons.RedTrash />,
            title: "Remove",
            color: "#F24",
            onClick: () => handleActionClick("DELETE")
        }
    ]

    return (
        <>
            <TableMenu items={actions} />
            <ConfirmationModal product={product} isOpen={isOpen} onClose={onClose} action={action} />
            <ProductShareModal product={product} isOpen={isShareModalOpen} onClose={onShareModalClose} />
            <DetailsModal product={product} isOpen={isDetailsModalOpen} onClose={onDetailsModalClose} />
            <DropInfoModal product={product} isOpen={isDropInfoModalOpen} onClose={onDropInfoModalClose} />
        </>
    )
}

export default ProductTableActionMenu