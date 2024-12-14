import { Flex, useRadioGroup } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { ShippingMethod } from 'pages/products/hooks/useShippingMethods'
import { ProductFormValues } from 'pages/products/utils/types'
import React from 'react'
import CustomRadioCard from '../../common/CustomRadioCard'

interface Props {
    shippingMethods: ShippingMethod[]
}

function ShippingMethodSelector({ shippingMethods }: Props) {
    const { values, setFieldValue } = useFormikContext<ProductFormValues>()
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