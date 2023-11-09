import { VStack } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import OptionsCaption from '../../../caption/OptionsCaption'

function ProductSwitch() {
    const { methods: { dispatch }, state: { shop: { shopDesign: { productListTitle } } } } = useContext(designContext)

    return (
        <VStack align="stretch" >
            <OptionsCaption caption='Products list title' />
            <AppInput name='' value={productListTitle} onChange={(e) => dispatch({ type: "updateShop", params: { shopDesign: { productListTitle: e.target.value } } })} placeholder='Enter a slogan' />
        </VStack>
    )
}

export default ProductSwitch