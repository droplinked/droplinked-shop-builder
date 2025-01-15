import { Td, Text, Tr } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import { useCurrencyConverter } from 'functions/hooks/useCurrencyConverter/useCurrencyConverter'
import { SKU } from 'pages/products/utils/types'
import React from 'react'
import SkuVariants from '../../../common/SkuVariants'

interface Props {
    currentSKU: SKU
    index: number
    onPriceInputChange: (index: number, price: number) => void
}

function SKURow({ currentSKU, index, onPriceInputChange }: Props) {
    const { symbol, convertPrice, abbreviation } = useCurrencyConverter()

    const convertedPrice = `${symbol}${convertPrice({ amount: currentSKU.rawPrice, toUSD: false })}`

    return (
        <Tr>
            <Td>
                <SkuVariants options={currentSKU.options} />
            </Td>
            <Td css={{ path: { stroke: "#7B7B7B" } }}>
                <Input
                    inputProps={{
                        type: 'number',
                        numberType: 'float',
                        step: '0.01',
                        value: currentSKU.price ?? '',
                        onChange: (e) => onPriceInputChange(index, parseFloat(e.target.value) || 0),
                    }}
                    leftElement={<AppIcons.GrayDollar />}
                />
            </Td>
            <Td>
                <Text
                    fontSize={14}
                    fontWeight={500}
                    color="#FFF"
                    css={{ span: { color: '#7B7B7B' } }}
                >
                    {convertedPrice} <span>{abbreviation}</span>
                </Text>
            </Td>
            <Td>
                <Text fontSize={14} color="#FFF">{currentSKU.externalID}</Text>
            </Td>
        </Tr>
    )
}

export default SKURow