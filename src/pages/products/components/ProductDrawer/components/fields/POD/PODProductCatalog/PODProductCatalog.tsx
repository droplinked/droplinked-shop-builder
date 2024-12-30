import React, { useState } from 'react'
import ProductFieldWrapper from '../../../common/ProductFieldWrapper'
import CategoryTree from './CategoryTree/CategoryTree'
import ProductList from './ProductList/ProductList'
import SelectedProductDetails from './SelectedProductDetails'

function PODProductCatalog() {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const handleCategorySelect = (categoryId: number) => setSelectedCategory(categoryId)

    const handleBack = () => {
        if (selectedProduct) setSelectedProduct(null)
        else if (selectedCategory) setSelectedCategory(null)
    }

    const renderContent = () => {
        if (selectedProduct) return (
            <SelectedProductDetails
                product={selectedProduct}
                onBack={handleBack}
            />
        )

        else if (selectedCategory) return (
            <ProductList
                categoryId={selectedCategory}
                onProductSelect={(product) => setSelectedProduct(product)}
                onBack={handleBack}
            />
        )

        return <CategoryTree onCategorySelect={handleCategorySelect} />
    }

    return (
        <ProductFieldWrapper
            label="Product Catalog"
            description="Select a category, product, or view product details."
            isRequired
        >
            {renderContent()}
        </ProductFieldWrapper>
    )
}

export default PODProductCatalog