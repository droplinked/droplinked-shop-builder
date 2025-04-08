import LoadingSpinner from 'components/common/loading-spinner/LoadingSpinner'
import useProduct from 'hooks/products/useProduct'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'
import ProductDrawerLayout from './ProductDrawerLayout'
import ProductForm from './ProductForm'

interface Props {
    isOpen: boolean
    onClose: () => void
}

function ProductDrawer({ isOpen, onClose }: Props) {
    const { selectedProductType, editingProductId, resetProductPageState } = useProductPageStore()
    const { isFetching, data } = useProduct(editingProductId)

    const editingProduct = data?.data?.data

    const handleDrawerClose = () => {
        resetProductPageState()
        onClose()
    }

    return (
        <ProductDrawerLayout
            isOpen={isOpen}
            onDrawerClose={handleDrawerClose}
        >
            {
                isFetching ?
                    <LoadingSpinner height="100%" />
                    :
                    <ProductForm
                        selectedProductType={selectedProductType}
                        onDrawerClose={handleDrawerClose}
                        product={editingProduct}
                    />
            }
        </ProductDrawerLayout>
    )
}

export default ProductDrawer