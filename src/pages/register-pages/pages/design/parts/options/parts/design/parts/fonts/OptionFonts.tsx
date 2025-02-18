import { SimpleGrid, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import PreviewTypo from 'pages/register-pages/pages/design/parts/preview/components/common/typo/PreviewTypo'
import React, { useContext } from 'react'
import ActiveBox from '../../../active/ActiveBox'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionFonts() {
    const { methods: { dispatch }, state: { shop: { shopDesign: { fontfamily } } } } = useContext(designContext)

    const fonts = ['Nunito Sans', 'Montserrat', 'Manrope', 'Source Serif Pro', 'Fredoka One', 'Allerta']

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Font Style' isRequired />
            <SimpleGrid columns={2} spacing="7px">
                {fonts.map((el, key: number) => (
                    <ActiveBox key={key} active={el === fontfamily} props={{ cursor: "pointer", backgroundColor: "#141414", borderRadius: "12px", onClick: () => dispatch({ type: 'updateShop', params: { shopDesign: { fontfamily: el } } }) }}>
                        <VStack padding="12px" align="stretch" spacing="0">
                            <AppTypography fontSize="10px"  fontWeight='bold' color="#FFF">{el}</AppTypography>
                            <PreviewTypo fontSize="10px" fontFamily={el} color="#c2c2c2">{el}</PreviewTypo>
                        </VStack>
                    </ActiveBox>
                ))}
            </SimpleGrid>
        </VStack>
    )
}

export default OptionFonts