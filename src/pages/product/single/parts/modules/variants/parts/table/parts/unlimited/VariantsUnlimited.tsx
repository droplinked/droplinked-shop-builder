import { Checkbox, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext } from 'react'

interface IProps {
    isDisabled: boolean
    value: any
    name: string
    index: number
}
function VariantsUnlimited({ index, isDisabled, name, value }: IProps) {
    const { state: { sku }, methods: { updateState } } = useContext(productContext)

    const updateSku = useCallback((e: any) => {
        const checked = e.target.checked
        const refactor = sku.map((el, key) => (key === index ? {
            ...el,
            // quantity: '',
            unlimited: checked
        } : el))
        updateState("sku", refactor)
    }, [sku, index, name, value])

    return (
        <>
            <Checkbox size='md' isDisabled={isDisabled} checked={value === true} colorScheme='green' onChange={updateSku}></Checkbox>
        </>
    )
}

export default VariantsUnlimited