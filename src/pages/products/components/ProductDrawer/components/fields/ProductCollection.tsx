import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import Select from 'components/redesign/select/Select'
import useCollections from 'hooks/useCollections/useCollections'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useEffect } from 'react'

function ProductCollection() {
    const { data: collections } = useCollections()
    const { values: { productCollectionID }, errors, setFieldValue } = useProductForm()

    // Set default collection if none is selected
    useEffect(() => {
        if (!productCollectionID && collections?.data?.length > 0) {
            setFieldValue('productCollectionID', collections.data[0]._id)
        }
    }, [productCollectionID, collections, setFieldValue])

    return (
        <FormFieldWrapper
            label="Collections"
            description="Select the collection that will feature this product."
            errorMessage={errors.productCollectionID}
        >
            <Select
                items={collections?.data ?? []}
                valueAccessor="_id"
                labelAccessor="title"
                selectProps={{
                    placeholder: "Select a collection",
                    value: productCollectionID,
                    onChange: (e) => setFieldValue('productCollectionID', e.target.value),
                }}
            />
        </FormFieldWrapper>
    )
}

export default ProductCollection