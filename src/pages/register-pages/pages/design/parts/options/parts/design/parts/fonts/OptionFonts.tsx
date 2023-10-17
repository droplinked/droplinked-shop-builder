import { SimpleGrid, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import ActiveBox from '../../../active/ActiveBox'
import OptionsCaption from '../../../caption/OptionsCaption'

function OptionFonts() {
    const fonts = ['Montserrat', 'Manrope', 'Source Serif Pro', 'Fredoka One', 'Montserrat', 'Nunito Sans', 'Allerta']

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Font Family' isRequired />
            <SimpleGrid columns={2} spacing="12px">
                {fonts.map((el, key: number) => (
                    <ActiveBox active={false} props={{ cursor: "pointer" }}>
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