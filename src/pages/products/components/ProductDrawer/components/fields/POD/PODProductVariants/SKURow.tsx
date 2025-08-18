import { Td, Text, Tr } from '@chakra-ui/react'
import CurrencyIcon from 'components/redesign/currency-icon/CurrencyIcon'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import AppInput from 'components/redesign/input/AppInput'
import { SKU } from 'pages/products/utils/types'
import React from 'react'
import SkuVariants from '../../../common/SkuVariants'

interface Props {
    currentSKU: SKU
    index: number
    onPriceInputChange: (index: number, price: number) => void
}

function SKURow({ currentSKU, index, onPriceInputChange }: Props) {

    return (
        <Tr>
            <Td>
                <SkuVariants options={currentSKU.options} />
            </Td>
            <Td>
                <AppInput
                    inputProps={{
                        type: 'number',
                        numberType: 'float',
                        step: '0.01',
                        value: currentSKU.price ?? '',
                        onChange: (e) => onPriceInputChange(index, parseFloat(e.target.value) || 0)
                    }}
                    leftElement={<CurrencyIcon color="#7B7B7B" size='sm'/>}
                />
            </Td>
            <Td>
                <FormattedPrice price={currentSKU.rawPrice} abbreviationProps={{ color: '#7B7B7B' }} fontSize={14} fontWeight={500} color="#FFF" />
            </Td>
            <Td>
                <Text fontSize={14} color="#FFF">{currentSKU.externalID}</Text>
            </Td>
        </Tr>
    )
}

export default SKURow