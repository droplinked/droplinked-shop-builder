import { Flex } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useEffect, useState } from 'react'

function DigitalProductRoyalty() {
    const { methods: { updateState }, state: { sku } } = useContext(productContext)
    const [showInput, setInputVisibility] = useState(() => Boolean(sku[0].royalty))

    const updateRoyalty = useCallback((value: number) => {
        updateState('sku', [{
            ...sku[0],
            royalty: value
        }])
    }, [sku])

    useEffect(() => {
        if (!showInput) updateRoyalty(null)
    }, [showInput])

    return (
        <Flex direction={"column"} gap={6}>
            <Flex alignItems={"center"} gap={3}>
                <AppSwitch isChecked={sku[0].royalty ? true : showInput} onChange={(e) => setInputVisibility(e.target.checked)} />
                <AppTypography fontSize={14} color="#C2C2C2" fontWeight='bold'>Activate Royalty for this product and ensures receiving a percentage from each resale</AppTypography>
            </Flex>
            {
                showInput &&
                <AppInput
                    name='digital-product-royalty'
                    type='number'
                    value={sku[0].royalty}
                    min={1}
                    max={99}
                    placeholder='%25'
                    onKeyDown={(e) => {
                        const invalidKeys = ['+', '-', 'e'];
                        if (invalidKeys.includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 99)) {
                            updateRoyalty(value === '' ? null : parseInt(value));
                        }
                    }}
                />
            }
        </Flex>
    )
}

export default DigitalProductRoyalty