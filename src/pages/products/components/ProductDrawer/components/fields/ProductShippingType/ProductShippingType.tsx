import { Box, Spinner } from '@chakra-ui/react'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useQuery } from 'react-query'
import { getShippingProfiles } from 'services/shipping-management/services'
import ShippingEmpty from './ShippingEmpty'
import ShippingList from './ShippingList'

function ProductShippingType() {
    const { t } = useLocaleResources('products')
    const { data: shippingProfiles, isLoading } = useQuery({
        queryKey: ['shipping-profiles'],
        queryFn: getShippingProfiles
    })

    const renderContent = () => {
        if (isLoading) return (
            <Box textAlign='center'>
                <Spinner />
            </Box>
        )

        return (shippingProfiles?.length === 0)
            ? <ShippingEmpty />
            : <ShippingList shippingProfiles={shippingProfiles} />
    }

    return (
        <FormFieldWrapper
            label={t('ProductShippingType.label')}
            description={t('ProductShippingType.description')}
            isRequired
        >
            {renderContent()}
        </FormFieldWrapper>
    )
}

export default ProductShippingType