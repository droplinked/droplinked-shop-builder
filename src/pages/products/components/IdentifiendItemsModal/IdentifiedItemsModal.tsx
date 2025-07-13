import { DownloadMd } from 'assets/icons/Action/Download/DownloadMd'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { UseImportWithUrl } from 'pages/products/hooks/useImportWithUrl'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React, { useState } from 'react'
import { useIdentifiedItems } from '../../hooks/useIdentifiedItems'
import IdentifiedItemsBody from './IdentifiedItemsBody'
import IdentifiedItemsFooter from './IdentifiedItemsFooter'

interface Props {
    isOpen: boolean
    onClose: () => void
    importWithUrl: UseImportWithUrl
}

export default function IdentifiedItemsModal({ isOpen, onClose, importWithUrl }: Props) {
    const { t } = useLocaleResources('products');
    const [shouldRecord, setshouldRecord] = useState(false)
    const { crawledProducts } = useProductPageStore()
    const { crawlingSelectedLoading, crawlSelectedProducts } = importWithUrl
    const crawledProductsCount = crawledProducts?.length || 0
    const maxSelectableItems = 200

    const {
        selectedProducts,
        headerCheckState,
        handleItemSelection,
        isSelectionDisabled,
        handleHeaderCheckboxChange,
        resetSelection
    } = useIdentifiedItems({
        crawledProducts,
        maxSelectableItems
    })

    const handleImport = async () => {
        if (selectedProducts.length > 0) {
            await crawlSelectedProducts({ selectedProducts, shouldRecord })
            setshouldRecord(false)
            resetSelection()
        }
    }

    const handleDiscard = () => {
        resetSelection()
        setshouldRecord(false)
        onClose()
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose: handleDiscard, size: "6xl", isCentered: true }}
            modalContentProps={{ gap: 0, paddingBlock: 0 }}
        >
            <ModalHeaderData
                icon={<DownloadMd color='#fff' />}
                title={t('identifiedItemsModal.title')}
                description={t('identifiedItemsModal.description', { count: crawledProductsCount })}
                descriptionProps={{
                    color: "#B1B1B1 !important",
                }}
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }
                }}
            />
            <IdentifiedItemsBody
                handleItemSelection={handleItemSelection}
                headerCheckState={headerCheckState}
                handleHeaderCheckboxChange={handleHeaderCheckboxChange}
                selectedProducts={selectedProducts}
                crawledProduct={crawledProducts}
                maxSelectableItems={maxSelectableItems}
                isSelectionDisabled={isSelectionDisabled}
                shouldRecord={shouldRecord}
                setshouldRecord={setshouldRecord}
            />
            <IdentifiedItemsFooter
                selectedProductsCount={selectedProducts.length}
                onDiscard={handleDiscard}
                onImport={handleImport}
                isLoading={crawlingSelectedLoading}
            />
        </AppModal>
    )
}
