import PageGrid from 'components/redesign/page-grid/PageGrid'
import useDebounce from 'hooks/debounce/useDebounce'
import useModalHandlers from 'pages/products/hooks/useModalHandlers'
import React, { useEffect, useState } from 'react'
import ImportProductModal from './components/ImportProductModal/ImportProductModal'
import PageHeader from './components/PageHeader'
import ProductDrawer from './components/ProductDrawer/ProductDrawer'
import ProductReorderModal from './components/ProductReorderModal/ProductReorderModal'
import ProductTable from './components/ProductTable/ProductTable'
import useProductPageStore from './stores/ProductPageStore'
import useProducts from 'hooks/products/useProducts'

function ProductsV2() {
    const { selectedProductType, editingProductId } = useProductPageStore(s => ({
        selectedProductType: s.selectedProductType,
        editingProductId: s.editingProductId
    }))

    const { productFormDrawer, importProductModal, productReorderModal } = useModalHandlers()
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)
    const { data } = useProducts(debouncedSearchTerm)
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
                    productsCount={productsCount}
                    isActionEnabled={isActionEnabled}
                />
                <PageGrid.Actions
                    search={{
                        value: searchTerm,
                        onChange: (e) => setSearchTerm(e.target.value),
                        disabled: !isActionEnabled
                    }}
                />
                <PageGrid.Content>
                    <ProductTable searchTerm={debouncedSearchTerm} />
                </PageGrid.Content>
            </PageGrid.Root>

            {/* Modals */}
            <ImportProductModal isOpen={importProductModal.isOpen} onClose={importProductModal.onClose} />
            <ProductReorderModal isOpen={productReorderModal.isOpen} onClose={productReorderModal.onClose} />
            <ProductDrawer isOpen={productFormDrawer.isOpen} onClose={productFormDrawer.onClose} />
        </>
    )
}

export default ProductsV2