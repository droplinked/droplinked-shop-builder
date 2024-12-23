import React, { useState } from 'react'
import ProductFieldWrapper from '../../../common/ProductFieldWrapper'
import CategoryTree from './CategoryTree/CategoryTree'
import ProductList from './ProductList/ProductList'
import SelectedProductDetails from './SelectedProductDetails'

function ProductCatalog() {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const handleCategorySelect = categoryId => setSelectedCategory(categoryId)
    const handleProductSelect = product => setSelectedProduct(product)

    const handleBack = () => {
        if (selectedProduct) setSelectedProduct(null)
        else if (selectedCategory) setSelectedCategory(null)
    }

    return (
        <ProductFieldWrapper
            label="Product Catalog"
            description="Select a category, product, or view product details."
            isRequired
        >
            {
                selectedProduct ?
                    <SelectedProductDetails
                        product={selectedProduct}
                        onBack={handleBack}
                    />
                    :
                    selectedCategory ?
                        <ProductList
                            categoryId={selectedCategory}
                            onProductSelect={handleProductSelect}
                            onBack={handleBack}
                        />
                        :
                        <CategoryTree onCategorySelect={handleCategorySelect} />
            }
        </ProductFieldWrapper>
    )
}

export default ProductCatalog