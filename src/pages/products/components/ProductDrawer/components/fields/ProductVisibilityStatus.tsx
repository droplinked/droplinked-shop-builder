import { Flex, useRadioGroup } from '@chakra-ui/react'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import CustomRadioCard from '../common/CustomRadioCard'
import ProductFieldWrapper from '../common/ProductFieldWrapper'

function ProductVisibilityStatus() {
    const { values, setFieldValue } = useProductForm()

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-visibility-status',
        onChange: (value: string) => setFieldValue('purchaseAvailable', value === "public" ? true : false),
        value: values.purchaseAvailable ? "public" : "private",
    })

    const statusList = [
        {
            label: "Public",
            tooltipText: "Customers will be able to add it to their cart",
            value: "public"
        },
        {
            label: "Private",
            tooltipText: "Customers won't be able to add it to their cart",
            value: "private"
        }
    ]

    return (
        <ProductFieldWrapper
            label='Visibility Status'
            description='Set the visibility of this product. If deactivated, customers won’t be able to add it to their cart.'
            isRequired
        >
            <Flex
                direction="row"
                gap={4}
                {...getRootProps()}
            >
                {statusList.map(item => (
                    <CustomRadioCard
                        key={item.label}
                        label={item.label}
                        tooltipText={item.tooltipText}
                        {...getRadioProps({ value: item.value })}
                    />
                ))}
            </Flex>
        </ProductFieldWrapper>
    )
}

export default ProductVisibilityStatus