import PageGrid from 'components/redesign/page-grid/PageGrid'
import useDebounce from 'functions/hooks/debounce/useDebounce'
import useProducts from 'functions/hooks/useProducts/useProducts'
import useModalHandlers from 'pages/products/hooks/useModalHandlers'
import React, { useState } from 'react'
import ImportProductModal from './components/ImportProductModal/ImportProductModal'
import PageHeader from './components/PageHeader'
import ProductDrawer from './components/ProductDrawer/ProductDrawer'
import ProductReorderModal from './components/ProductReorderModal/ProductReorderModal'
import ProductTable from './components/ProductTable/ProductTable'

function ProductsV2() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedProductType, setSelectedProductType] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)
    const { productFormDrawer, importProductModal, productReorderModal } = useModalHandlers()
    const productsList = useProducts(debouncedSearchTerm)
    const products = productsList.data?.pages?.flatMap(page => page.data.data.data) || []

    const handleProductTypeSelection = (productType: string) => {
        productFormDrawer.onOpen()
    }

    return (
        <>
            <PageGrid.Root>
                <PageHeader
                    handleProductTypeSelection={handleProductTypeSelection}
                    onImportModalOpen={importProductModal.onOpen}
                    onReorderModalOpen={productReorderModal.onOpen}
                />

                {(products.length || productsList.isLoading) &&
                    <PageGrid.Actions
                        search={{
                            value: searchTerm,
                            onChange: (e) => setSearchTerm(e.target.value)
                        }}
                    />
                }

                <PageGrid.Content>
                    <ProductTable
                        handleProductTypeSelection={handleProductTypeSelection}
                        productsList={productsList}
                        searchTerm={debouncedSearchTerm}
                    />
                </PageGrid.Content>
            </PageGrid.Root>

            <ImportProductModal isOpen={importProductModal.isOpen} onClose={importProductModal.onClose} />
            <ProductReorderModal isOpen={productReorderModal.isOpen} onClose={productReorderModal.onClose} />
            <ProductDrawer isOpen={productFormDrawer.isOpen} onClose={productFormDrawer.onClose} />
        </>
    )
}

export default ProductsV2