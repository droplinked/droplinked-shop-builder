import { useDisclosure } from '@chakra-ui/react'
import { CopyMd } from 'assets/icons/Action/Copy/CopyMd'
import { EditMd } from 'assets/icons/Action/Edit/EditMd'
import { ShareMd } from 'assets/icons/Action/Share/ShareMd'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import { InvoiceMd } from 'assets/icons/Finance/Invoice/InvoiceMd'
import { TransferMd } from 'assets/icons/Navigation/Transfer/TransferMd'
import { NftMd } from 'assets/icons/System/NFT/NftMd'
import TableMenu from 'components/redesign/table-menu/TableMenu'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import { checkIfProductIsRecorded } from 'pages/products/utils/skuUtils'
import React, { useState } from 'react'
import ConfirmationModal from './components/ConfirmationModal'
import DetailsModal from './components/details-modal/DetailsModal'
import DropInfoModal from './components/drop-info-modal/DropInfoModal'
import ProductShareModal from './components/share-modal/ShareModal'

export type action = "DELETE" | "DUPLICATE" | "PUBLISH" | "DRAFT"

function ProductTableActionMenu({ product }: { product: any }) {
    const { t } = useLocaleResources('products')
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
            icon: <InvoiceMd color='#fff' />,
            title: t('common:details'),
            onClick: onDetailsModalOpen
        },
        {
            icon: <EditMd color='#fff' />,
            title: t('common:edit'),
            onClick: () => updateProductPageState("editingProductId", product._id)
        },
        {
            ...product.nftData && {
                icon: <NftMd color='#fff' />,
                title: t('ProductTableActionMenu.actions.dropInfo'),
                onClick: onDropInfoModalOpen
            }
        },
        {
            icon: <ShareMd color='#fff' />,
            title: t('common:share'),
            onClick: onShareModalOpen
        },
        {
            icon: <CopyMd color='#fff' />,
            title: t('common:duplicate'),
            onClick: () => handleActionClick("DUPLICATE")
        },
        {
            ...!isProductRecorded &&
            {
                icon: <TransferMd color='#fff' />,
                title: t('ProductTableActionMenu.actions.makeStatus', { status: isProductPublished ? t('common:draft') : t('common:public') }),
                onClick: () => handleActionClick(isProductPublished ? "DRAFT" : "PUBLISH"),
            }
        },
        {
            icon: <TrashMd color='#ff2244' />,
            title: t('common:delete'),
            color: "system.error",
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