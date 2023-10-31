import { VStack } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'

function ProductSwitch() {
    const { methods: { dispatch }, state: { shop: { shopDesign: { productListTitle } } } } = useContext(designContext)

    return (
        <VStack align="stretch" spacing="24px">
            <AppInput name='' value={productListTitle} onChange={(e) => dispatch({ type: "updateShop", params: { shopDesign: { productListTitle: e.target.value } } })} placeholder='Outfits for Summer' />
        </VStack>
    )
}

export default ProductSwitch