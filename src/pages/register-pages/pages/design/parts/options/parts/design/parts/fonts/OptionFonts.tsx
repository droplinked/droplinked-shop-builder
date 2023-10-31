import { SimpleGrid, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useState } from 'react'
import ActiveBox from '../../../active/ActiveBox'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionFonts() {
    const { methods: { dispatch }, state: { shop: { shopDesign: { fontfamily } } } } = useContext(designContext)

    const fonts = ['Montserrat', 'Manrope', 'Source Serif Pro', 'Fredoka One', 'Nunito Sans', 'Allerta']

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Font Style' isRequired />
            <SimpleGrid columns={2} spacing="12px">
                {fonts.map((el, key: number) => (
                    <ActiveBox active={el === fontfamily} props={{ cursor: "pointer", onClick: () => dispatch({ type: 'updateShop', params: { shopDesign: { fontfamily: el } } }) }}>
                        <VStack key={key} backgroundColor="#141414" padding="12px" borderRadius="12px" align="stretch" spacing="0">
                            <AppTypography size="12px" weight='bolder'>{el}</AppTypography>
                            <AppTypography size="12px" color="#c2c2c2">{el}</AppTypography>
                        </VStack>
                    </ActiveBox>
                ))}
            </SimpleGrid>
        </VStack>
    )
}

export default OptionFonts