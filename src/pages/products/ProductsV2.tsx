import PageGrid from 'components/redesign/page-grid/PageGrid'
import useProducts from 'hooks/products/useProducts'
import useDebounce from 'hooks/useDebounce/useDebounce'
import useModalHandlers from 'pages/products/hooks/useModalHandlers'
import React, { useEffect, useState } from 'react'
import IdentifiedItemsModal from './components/IdentifiendItemsModal/IdentifiedItemsModal'
import ImportProductModal from './components/ImportProductModal/ImportProductModal'
import PageHeader from './components/PageHeader'
import ProductDrawer from './components/ProductDrawer/ProductDrawer'
import ProductReorderModal from './components/ProductReorderModal/ProductReorderModal'
import ProductTable from './components/ProductTable/ProductTable'
import { useImportWithUrl } from './hooks/useImportWithUrl'
import useProductPageStore from './stores/ProductPageStore'

function ProductsV2() {
    const { selectedProductType, editingProductId } = useProductPageStore(s => ({
        selectedProductType: s.selectedProductType,
        editingProductId: s.editingProductId
    }))

    const { productFormDrawer, importProductModal, productReorderModal, identifiedItemsModal } = useModalHandlers()
    const importWithUrl = useImportWithUrl({
        importProductModalController: importProductModal,
        identifiedItemsModalController: identifiedItemsModal
    })
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)
    const { data, isFetching } = useProducts(debouncedSearchTerm)
    const productsCount = data?.pages?.flatMap(page => page.data.data.data)?.length || 0
    const isActionEnabled = !(productsCount === 0 && !searchTerm)

    useEffect(() => {
        if (selectedProductType || editingProductId)
            productFormDrawer.onOpen()
    }, [selectedProductType, editingProductId])

    return (
        <>
            <PageGrid.Root>
                <PageHeader
                    onImportModalOpen={importProductModal.onOpen}
                    onReorderModalOpen={productReorderModal.onOpen}
                    isActionEnabled={isActionEnabled}
                />
                {(isActionEnabled || isFetching) &&
                    <PageGrid.Actions
                        search={{
                            value: searchTerm,
                            onChange: (e) => setSearchTerm(e.target.value),
                            disabled: !isActionEnabled
                        }}
                    />}
                <PageGrid.Content>
                    <ProductTable searchTerm={debouncedSearchTerm} />
                </PageGrid.Content>
            </PageGrid.Root>

            {/* Modals */}
            <ProductDrawer isOpen={productFormDrawer.isOpen} onClose={productFormDrawer.onClose} />
            <ImportProductModal
                isOpen={importProductModal.isOpen}
                onClose={importProductModal.onClose}
                importWithUrl={importWithUrl}
            />
            <IdentifiedItemsModal isOpen={identifiedItemsModal.isOpen} onClose={identifiedItemsModal.onClose} importWithUrl={importWithUrl} />
            {productReorderModal.isOpen &&
                <ProductReorderModal isOpen={productReorderModal.isOpen} onClose={productReorderModal.onClose} />
            }
        </>
    )
}

export default ProductsV2