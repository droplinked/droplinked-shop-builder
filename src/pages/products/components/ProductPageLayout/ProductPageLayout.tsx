import PageGrid from 'components/redesign/page-grid/PageGrid'
import useDebounce from 'functions/hooks/debounce/useDebounce'
import useModalHandlers from 'pages/products/hooks/useModalHandlers'
import React, { useState } from 'react'
import ImportProductModal from '../ImportProductModal/ImportProductModal'
import ProductFormDrawer from '../ProductFormDrawer/ProductFormDrawer'
import ProductReorderModal from '../ProductReorderModal/ProductReorderModal'
import ProductTable from '../ProductTable/ProductTable'
import ProductTypesModal from '../ProductTypesModal/ProductTypesModal'
import PageHeader from './PageHeader'

function ProductPageLayout() {
    const [searchTerm, setSearchTerm] = useState("")
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
            <ProductFormDrawer isOpen={productFormDrawer.isOpen} onClose={productFormDrawer.onClose} />
        </>
    )
}

export default ProductPageLayout