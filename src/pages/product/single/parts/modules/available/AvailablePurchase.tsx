import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function AvailablePurchase() {
    const { state: { purchaseAvailable }, methods: { updateState } } = useContext(productContext)

    return (
        <Flex gap={3}>
            <Box><AppSwitch onChange={(e) => updateState('purchaseAvailable', e.target.checked)} isChecked={purchaseAvailable} /></Box>
            <VStack align='stretch' color="#C2C2C2" spacing={1}>
                <AppTypography size='14px' weight='bolder'>Available to purchase</AppTypography>
                <AppTypography size='14px'>If you deactivate this field the customer will not be able to add the item to the cart.</AppTypography>
            </VStack>
        </Flex>
    )
}

export default AvailablePurchase