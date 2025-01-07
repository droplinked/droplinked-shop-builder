import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'
import ProductDrawerLayout from './ProductDrawerLayout'
import ProductForm from './ProductForm'

interface Props {
    isOpen: boolean
    onClose: () => void
}

function ProductDrawer({ isOpen, onClose }: Props) {
    const resetProductPageState = useProductPageStore(s => s.resetProductPageState)

    const handleDrawerClose = () => {
        resetProductPageState()
        onClose()
    }

    return (
        <ProductDrawerLayout isOpen={isOpen} onDrawerClose={handleDrawerClose}>
            <ProductForm onDrawerClose={handleDrawerClose} />
        </ProductDrawerLayout>
    )
}

export default ProductDrawer