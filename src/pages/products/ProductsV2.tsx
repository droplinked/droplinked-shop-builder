import PageGrid from 'components/redesign/page-grid/PageGrid'
import useDebounce from 'hooks/debounce/useDebounce'
import useProducts from 'hooks/products/useProducts'
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
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)
    const { data, isFetching } = useProducts(debouncedSearchTerm)
    const { productFormDrawer, importProductModal, productReorderModal, identifiedItemsModal } = useModalHandlers()
    const { selectedProductType, editingProductId } = useProductPageStore(s => ({
        selectedProductType: s.selectedProductType,
        editingProductId: s.editingProductId
    }))
    const importWithUrl = useImportWithUrl({
        importProductModalController: importProductModal,
        identifiedItemsModalController: identifiedItemsModal
    })

    // Computed values
    const productsCount = data?.pages?.flatMap(page => page.data.data.data)?.length || 0
    const isActionEnabled = !(productsCount === 0 && !searchTerm)

    // Effects
    useEffect(() => {
        if (selectedProductType || editingProductId) {
            productFormDrawer.onOpen()
        }
    }, [selectedProductType, editingProductId])

    return (
        <>
            <PageGrid.Root>
                <PageHeader
                    onImportModalOpen={importProductModal.onOpen}
                    onReorderModalOpen={productReorderModal.onOpen}
                    isActionEnabled={isActionEnabled}
                />

                {(isActionEnabled || isFetching) && (
                    <PageGrid.Actions
                        search={{
                            value: searchTerm,
                            onChange: (e) => setSearchTerm(e.target.value),
                            disabled: !isActionEnabled
                        }}
                    />
                )}

                <PageGrid.Content>
                    <ProductTable searchTerm={debouncedSearchTerm} />
                </PageGrid.Content>
            </PageGrid.Root>

            <ProductDrawer {...productFormDrawer} />

            <ImportProductModal {...importProductModal} importWithUrl={importWithUrl} />

            <IdentifiedItemsModal {...identifiedItemsModal} importWithUrl={importWithUrl} />

            {productReorderModal.isOpen && <ProductReorderModal {...productReorderModal} />}
        </>
    )
}

export default ProductsV2