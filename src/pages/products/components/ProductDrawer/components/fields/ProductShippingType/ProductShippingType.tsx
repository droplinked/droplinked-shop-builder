import { Box, Spinner } from '@chakra-ui/react'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'
import ShippingList from './ShippingList'

function ProductShippingType() {
    const { t } = useLocaleResources('products')
    const [isLoading, setIsLoading] = useState(false)
    const [shippingList, setShippingList] = useState<any[]>([])

    const renderContent = () => {
        if (isLoading) return (
            <Box textAlign='center'>
                <Spinner />
            </Box>
        )

        // if (shippingList.length > 0) return <ShippingList />

        // return <ShippingEmpty />
        return <ShippingList />
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