import { DownloadMd } from 'assets/icons/Action/Download/DownloadMd'
import { Verticalmove2Md } from 'assets/icons/Navigation/VerticalMove2/Verticalmove2Md'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useEffect } from 'react'
import { useImportWithUrl } from '../hooks/useImportWithUrl'
import useModalHandlers from '../hooks/useModalHandlers'
import useProductPageStore from '../stores/ProductPageStore'
import IdentifiedItemsModal from './IdentifiendItemsModal/IdentifiedItemsModal'
import ImportProductModal from './ImportProductModal/ImportProductModal'
import ProductDrawer from './ProductDrawer/ProductDrawer'
import ProductReorderModal from './ProductReorderModal/ProductReorderModal'
import ProductTypeSelector from './ProductTypeSelector/ProductTypeSelector'

interface ProductHeaderProps {
    isActionEnabled: boolean
}

function PageHeader({ isActionEnabled }: ProductHeaderProps) {
    const { t } = useLocaleResources('products')

    // Modal handlers
    const { productFormDrawer, importProductModal, productReorderModal, identifiedItemsModal } = useModalHandlers()

    // Import with URL hook depends on modal controllers
    const importWithUrl = useImportWithUrl({
        importProductModalController: importProductModal,
        identifiedItemsModalController: identifiedItemsModal,
    })

    // Open product form drawer when a product type is selected or a product is being edited
    const { selectedProductType, editingProductId } = useProductPageStore((s) => ({
        selectedProductType: s.selectedProductType,
        editingProductId: s.editingProductId,
    }))

    useEffect(() => {
        if (selectedProductType || editingProductId) {
            productFormDrawer.onOpen()
        }
    }, [selectedProductType, editingProductId])

    return (
        <>
            <PageGrid.Header
                title={t('PageHeader.title')}
                description={t('PageHeader.description')}
                actionButtons={[
                    {
                        title: t('PageHeader.actions.reorderProducts'),
                        variant: 'secondary',
                        leftIcon: <Verticalmove2Md />,
                        isDisabled: !isActionEnabled,
                        onClick: productReorderModal.onOpen,
                    },
                    {
                        title: t('PageHeader.actions.import'),
                        variant: 'secondary',
                        leftIcon: <DownloadMd />,
                        onClick: importProductModal.onOpen,
                    },
                    {
                        title: t('PageHeader.actions.newProduct'),
                        leftIcon: <PlusMd />,
                        wrapper: <ProductTypeSelector />,
                    }
                ]}
            />

            {/* Modals & Drawer */}
            <ProductDrawer {...productFormDrawer} />
            <ImportProductModal {...importProductModal} importWithUrl={importWithUrl} />
            <IdentifiedItemsModal {...identifiedItemsModal} importWithUrl={importWithUrl} />
            {productReorderModal.isOpen && <ProductReorderModal {...productReorderModal} />}
        </>
    )
}

export default PageHeader