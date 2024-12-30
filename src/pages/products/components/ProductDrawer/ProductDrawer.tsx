import React from 'react'
import ProductDrawerLayout from './ProductDrawerLayout'
import ProductForm from './ProductForm'

interface Props {
    isOpen: boolean
    onClose: () => void
}

function ProductDrawer({ isOpen, onClose }: Props) {
    return (
        <ProductDrawerLayout isOpen={isOpen} onClose={onClose}>
            <ProductForm onClose={onClose} />
        </ProductDrawerLayout>
    )
}

export default ProductDrawer