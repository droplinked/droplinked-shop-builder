import PageGrid from 'components/redesign/page-grid/PageGrid'
import useDebounce from 'functions/hooks/debounce/useDebounce'
import useModalHandlers from 'pages/products/hooks/useModalHandlers'
import React, { useState } from 'react'
import ImportProductModal from './components/ImportProductModal/ImportProductModal'
import PageHeader from './components/PageHeader'
import ProductDrawer from './components/ProductDrawer/ProductDrawer'
import ProductReorderModal from './components/ProductReorderModal/ProductReorderModal'
import ProductTable from './components/ProductTable/ProductTable'
import ProductTypesModal from './components/ProductTypesModal/ProductTypesModal'

function ProductsV2() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedProductType, setSelectedProductType] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)
    const { productTypeModal, productFormDrawer, importProductModal, productReorderModal } = useModalHandlers()

    const handleProductTypeSelection = () => {
        productTypeModal.onClose()
        productFormDrawer.onOpen()
    }

    return (
        <>
            <PageGrid.Root>
                <PageHeader
                    onProductTypeModalOpen={productTypeModal.onOpen}
                    onImportModalOpen={importProductModal.onOpen}
                    onReorderModalOpen={productReorderModal.onOpen}
                />
                <PageGrid.Actions
                    search={{ value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }}
                />
                <PageGrid.Content>
                    <ProductTable searchTerm={debouncedSearchTerm} />
                </PageGrid.Content>
            </PageGrid.Root>
            <ProductTypesModal isOpen={productTypeModal.isOpen} onClose={productTypeModal.onClose} onProductTypeSelection={handleProductTypeSelection} />
            <ImportProductModal isOpen={importProductModal.isOpen} onClose={importProductModal.onClose} />
            <ProductReorderModal isOpen={productReorderModal.isOpen} onClose={productReorderModal.onClose} />
            <ProductDrawer isOpen={productFormDrawer.isOpen} onClose={productFormDrawer.onClose} />
        </>
    )
}

export default ProductsV2