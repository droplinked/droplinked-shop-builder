import Select from 'components/redesign/select/Select'
import { useFormikContext } from 'formik'
import useCollections from 'functions/hooks/useCollections/useCollections'
import { ProductFormValues } from 'pages/products/utils/types'
import React from 'react'
import ProductFieldWrapper from '../common/ProductFieldWrapper'

function ProductCollection() {
    const { data } = useCollections()
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>()

    return (
        <ProductFieldWrapper
            label='Collections'
            description='Select the collection that will feature this product.'
            errorMessage={errors.productCollectionID}
        >
            <Select
                items={data?.data ?? []}
                valueAccessor='_id'
                labelAccessor='title'
                selectProps={{
                    placeholder: "Select a collection",
                    value: values.productCollectionID,
                    onChange: (e) => setFieldValue("productCollectionID", e.target.value)
                }}
            />
        </ProductFieldWrapper>
    )
}

export default ProductCollection