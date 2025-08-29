import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useProductForm from 'pages/products/hooks/useProductForm'
import { SHIPPING_PROFILES_QUERY_KEY } from 'pages/shipping-management/constants/constants'
import React from 'react'
import { useQuery } from 'react-query'
import { getShippingProfiles } from 'services/shipping-management/services'
import ShippingEmpty from './ShippingEmpty'
import ShippingList from './ShippingList'

function ProductShippingType() {
    const { t } = useLocaleResources('products')
    const { errors } = useProductForm()
    const { data } = useQuery({
        queryKey: [SHIPPING_PROFILES_QUERY_KEY],
        queryFn: getShippingProfiles,
        refetchOnWindowFocus: true
    })

    const shippingProfiles = data ?? []

    return (
        <FormFieldWrapper
            label={t('ProductShippingType.label')}
            description={t('ProductShippingType.description')}
            errorMessage={errors.shippingModelId}
            isRequired
        >
            {
                shippingProfiles.length === 0
                    ? <ShippingEmpty />
                    : <ShippingList shippingProfiles={shippingProfiles} />
            }
        </FormFieldWrapper>
    )
}

export default ProductShippingType