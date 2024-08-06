import { Flex } from '@chakra-ui/react'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext } from 'react'

function CommissionDigital() {
    const { methods: { updateState }, state: { sku } } = useContext(productContext)

    const change = useCallback((checked: boolean) => {
        const updatedSku = {
            ...sku[0],
            recordData: {
                ...sku[0].recordData,
                commision: checked ? 10 : 0
            }
        }
        updateState('sku', [updatedSku])
    }, [sku, updateState])

    return (
        <Flex gap={3} alignItems="center">
            <AppSwitch onChange={(e: any) => change(e.target.checked)} isChecked={sku.length && sku[0].recordData?.commision === 10} />
            <AppTypography fontSize='14px' color="#C2C2C2" fontWeight='bold'>Activate this product for affiliate purchase with a 10% commission for collaborators</AppTypography>
        </Flex>
    )
}

export default CommissionDigital