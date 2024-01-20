import { Checkbox, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function M2MPlaceholder() {
    const { state: { isAddToCartDisabled }, methods: { dispatch } } = useContext(productContext)
    return (
        <Checkbox size='md' isChecked={isAddToCartDisabled} onChange={el => dispatch({ type: "updateState", params: { element: "isAddToCartDisabled", value: el.target.checked } })} alignItems="flex-start" boxShadow="unset" outline="unset" colorScheme='green'>
            <VStack align="stretch" color="#C2C2C2" spacing="0" position="relative" bottom="4px">
                <AppTypography fontSize='14px' fontWeight='bold'>Mint To Merch Placeholder Item</AppTypography>
                <AppTypography fontSize='14px'>This item is only a placeholder for mint to merch and and customers can not add it to the cart!</AppTypography>
            </VStack>
        </Checkbox>
    )
}

export default M2MPlaceholder