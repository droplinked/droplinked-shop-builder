import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import AppSelect from 'components/redesign/select/AppSelect'
import useCollections from 'hooks/useCollections/useCollections'
import useProductForm from 'pages/products/hooks/useProductForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useEffect } from 'react'

function ProductCollection() {
    const { t } = useLocaleResources('products');
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
            label={t('ProductCollection.label')}
            description={t('ProductCollection.description')}
            errorMessage={errors.productCollectionID}
        >
            <AppSelect
                items={collections?.data ?? []}
                valueAccessor="_id"
                labelAccessor="title"
                selectProps={{
                    placeholder: t('ProductCollection.placeholder'),
                    value: productCollectionID,
                    onChange: (e) => setFieldValue('productCollectionID', e.target.value),
                }}
            />
        </FormFieldWrapper>
    )
}

export default ProductCollection