import { Input, InputProps } from '@chakra-ui/react'
import { floatNumberRegex } from 'lib/utils/heper/regex'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext } from 'react'

interface IProps extends InputProps {
    value: any
    name: string
    index: number
    isDisabled?: boolean
}

function FieldsSkuTable(props: IProps) {
    const { state: { sku }, methods: { updateState } } = useContext(productContext)
    const { name, index, value, isDisabled } = props

    const updateSku = useCallback((e: any) => {
        let inputvalue: any = e.target.value
        if (!["externalID", "price"].includes(name) && inputvalue) inputvalue = floatNumberRegex.test(inputvalue) ? inputvalue : value
        if(name === "price") inputvalue = (/^[1-9]\d*(\.\d{0,2})?$/).test(inputvalue) ? inputvalue : value
        const isDimensions = ["height", "length", "width"].includes(name)
        const converted_price = name === "price" ? (inputvalue) : Number(inputvalue)
        const refactor = sku.map((el, key) => (key === index ? {
            ...el,
            ...isDimensions ? {
                dimensions: {
                    ...el.dimensions,
                    [name]: Number(inputvalue)
                }
            } : { [name]: converted_price }
        } : el))
        updateState("sku", refactor)
    }, [sku, index, name, value])

    return (
        <Input
            type="text"
            variant={"unstyled"}
            value={value || 0}
            background="#141414"
            border={"none"}
            isDisabled={name === "cost" || isDisabled}
            outline="none"
            _disabled={{ opacity: ".3" }}
            width="auto"
            maxWidth={"70px"}
            padding="3px"
            color="#808080"
            onChange={updateSku}
            {...props}
        />
    )
}

export default FieldsSkuTable