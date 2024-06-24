import { Box, Flex } from '@chakra-ui/react'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useEffect } from 'react'

function CommissionDigital() {
    const { productID, methods: { updateState }, state: { sku } } = useContext(productContext)
    console.log(sku)

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

    useEffect(() => {
        if (productID || sku[0]?.recordData?.commision !== undefined) return
        const updatedSku = {
            ...sku[0],
            recordData: {
                commision: 0
            }
        }
        updateState('sku', [updatedSku])
    }, [productID, sku])

    return (
        <Flex gap={3} alignItems="center">
            <Box><AppSwitch onChange={(e: any) => change(e.target.checked)} isChecked={sku.length && sku[0].recordData?.commision === 10} /></Box>
            <AppTypography fontSize='14px' color="#C2C2C2" fontWeight='bold'>I want to available this NFT to affiliate purchases with %10 commission for collaborators</AppTypography>
        </Flex>
    )
}

export default CommissionDigital