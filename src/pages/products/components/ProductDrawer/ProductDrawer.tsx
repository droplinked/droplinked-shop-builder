import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import useProduct from 'functions/hooks/products/useProduct'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'
import ProductDrawerLayout from './ProductDrawerLayout'
import ProductForm from './ProductForm'

interface Props {
    isOpen: boolean
    onClose: () => void
}

function ProductDrawer({ isOpen, onClose }: Props) {
    const { selectedProductType, editingProductId, resetProductPageState } = useProductPageStore(state => ({
        selectedProductType: state.selectedProductType,
        editingProductId: state.editingProductId,
        resetProductPageState: state.resetProductPageState
    }))

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
                    <LoadingComponent height="100%" />
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