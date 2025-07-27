import { useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
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
    const { t } = useLocaleResources('products');
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
            title: t('common:details'),
            onClick: onDetailsModalOpen
        },
        {
            icon: <AppIcons.EditOutlined />,
            title: t('common:edit'),
            onClick: () => updateProductPageState("editingProductId", product._id)
        },
        {
            ...product.nftData && {
                icon: <AppIcons.DropProduct />,
                title: t('ProductTableActionMenu.actions.dropInfo'),
                onClick: onDropInfoModalOpen
            }
        },
        {
            ...product.product_type === "PRINT_ON_DEMAND" &&
            {
                icon: <AppIcons.Shirt />,
                title: t('ProductTableActionMenu.actions.orderPodSample'),
                onClick: () => navigate("/analytics/products/order/" + product._id)
            },
        },
        {
            icon: <AppIcons.Share />,
            title: t('common:share'),
            onClick: onShareModalOpen
        },
        {
            icon: <AppIcons.Copy />,
            title: t('common:duplicate'),
            onClick: () => handleActionClick("DUPLICATE")
        },
        {
            ...!isProductRecorded &&
            {
                icon: <AppIcons.Transfer />,
                title: t('ProductTableActionMenu.actions.makeStatus', { status: isProductPublished ? t('common:draft') : t('common:public') }),
                onClick: () => handleActionClick(isProductPublished ? "DRAFT" : "PUBLISH"),
            }
        },
        {
            icon: <AppIcons.RedTrash />,
            title: t('common:delete'),
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