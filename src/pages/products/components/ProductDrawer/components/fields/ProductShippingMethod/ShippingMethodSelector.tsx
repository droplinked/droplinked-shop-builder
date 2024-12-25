import { Flex, useRadioGroup } from '@chakra-ui/react'
import useProductForm from 'pages/products/hooks/useProductForm'
import { ShippingMethod } from 'pages/products/hooks/useShippingMethods'
import React from 'react'
import CustomRadioCard from '../../common/CustomRadioCard'

interface Props {
    shippingMethods: ShippingMethod[]
}

function ShippingMethodSelector({ shippingMethods }: Props) {
    const { values, setFieldValue } = useProductForm()
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-variants-style',
        onChange: (value: string) => setFieldValue('shippingType', value),
        value: values.shippingType
    })

    return (
        <Flex
            direction="column"
            gap={4}
            {...getRootProps()}
        >
            {shippingMethods.map(m => (
                <CustomRadioCard
                    key={m.value}
                    label={m.label}
                    description={m.description}
                    {...getRadioProps({ value: m.value })}
                />
            ))}
        </Flex>
    )
}

export default ShippingMethodSelector