import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext } from 'react'

function CommissionDigital() {
    const { methods: { updateState }, state: { sku }, productID } = useContext(productContext)

    const change = useCallback((checked: boolean) => {
        updateState('sku', [{
            ...sku[0],
            'recordData': {
                ...sku[0].recordData,
                commision: checked ? 20 : 0
            }
        }])
    }, [sku])

    return (
        <Flex gap={3}>
            <Box><AppSwitch onChange={(e: any) => change(e.target.checked)} isDisabled={true} isChecked={sku.length ? sku[0].recordData.commision === 20 : false} /></Box>
            <VStack align='stretch' color="#C2C2C2" spacing={1}>
                <AppTypography size='14px' weight='bolder'>I want to available this NFT to affiliate purchases with %10 commission for collaborators</AppTypography>
                <AppTypography size='14px'>Description</AppTypography>
            </VStack>
        </Flex>
    )
}

export default CommissionDigital