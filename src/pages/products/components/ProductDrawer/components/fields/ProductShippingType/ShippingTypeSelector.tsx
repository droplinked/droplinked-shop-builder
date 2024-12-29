import { Flex, useRadioGroup } from '@chakra-ui/react'
import useProductForm from 'pages/products/hooks/useProductForm'
import { ShippingType } from 'pages/products/hooks/useShippingTypes'
import React from 'react'
import CustomRadioCard from '../../common/CustomRadioCard'

interface Props {
    shippingTypes: ShippingType[]
}

function ShippingTypeSelector({ shippingTypes }: Props) {
    const { values, setFieldValue } = useProductForm()
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-shipping-type',
        onChange: (value: string) => setFieldValue('shippingType', value),
        value: values.shippingType
    })

    return (
        <Flex
            direction="column"
            gap={4}
            {...getRootProps()}
        >
            {shippingTypes.map(st => (
                <CustomRadioCard
                    key={st.shippingType}
                    label={st.title}
                    description={st.description}
                    {...getRadioProps({ value: st.shippingType })}
                />
            ))}
        </Flex>
    )
}

export default ShippingTypeSelector