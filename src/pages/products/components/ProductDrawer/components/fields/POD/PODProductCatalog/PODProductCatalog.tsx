import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState } from 'react'
import CategoryTree from './CategoryTree/CategoryTree'
import ProductList from './ProductList/ProductList'
import SelectedProductDetails from './SelectedProductDetails'

function PODProductCatalog() {
    const { values: { pod_blank_product_id } } = useProductForm()
    const [selection, setSelection] = useState({ categoryId: null, productId: null })

    const handleCategorySelect = (categoryId: number) =>
        setSelection(() => ({ categoryId, productId: null }))

    const handleProductSelect = (productId: number) =>
        setSelection((prev) => ({ ...prev, productId }))

    const handleBack = () => {
        if (selection.productId) setSelection((prev) => ({ ...prev, productId: null }))
        else if (selection.categoryId) setSelection((prev) => ({ ...prev, categoryId: null }))
    }

    const renderContent = () => {
        const { categoryId, productId } = selection

        if (productId || pod_blank_product_id) {
            return (
                <SelectedProductDetails
                    productId={productId || pod_blank_product_id}
                    onBack={handleBack}
                />
            )
        }

        if (categoryId) {
            return (
                <ProductList
                    categoryId={categoryId}
                    onProductSelect={handleProductSelect}
                    onBack={handleBack}
                />
            )
        }

        return <CategoryTree onCategorySelect={handleCategorySelect} />
    }

    return (
        <FormFieldWrapper
            label="Product Catalog"
            description="Select a category, product, or view product details."
            isRequired
        >
            {renderContent()}
        </FormFieldWrapper>
    )
}

export default PODProductCatalog