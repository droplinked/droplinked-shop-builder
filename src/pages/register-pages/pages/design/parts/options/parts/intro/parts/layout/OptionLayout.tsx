import { SimpleGrid, VStack } from '@chakra-ui/react'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import ActiveBox from '../../../active/ActiveBox'
import OptionsCaption from '../../../caption/OptionsCaption'
import OptionLayoutModel from './model'

function OptionLayout() {
    const { methods: { dispatch }, state: { shop: { shopDesign: { hiroLayout } } } } = useContext(designContext)

    return (
        <VStack align="stretch">
            <OptionsCaption caption='hero section layout' />
            <SimpleGrid columns={4} spacing="15px">
                {OptionLayoutModel.items.map((el, key) => (
                    <ActiveBox active={el.key === hiroLayout} key={key} props={{ padding: "8px", display: "flex", justifyContent: "center", borderRadius: "8px", onClick: () => dispatch({ type: 'updateShop', params: { shopDesign: { hiroLayout: el.key } } }), cursor: "pointer" }}>{el.icon}</ActiveBox>
                ))}
            </SimpleGrid>
        </VStack >
    )
}

export default OptionLayout