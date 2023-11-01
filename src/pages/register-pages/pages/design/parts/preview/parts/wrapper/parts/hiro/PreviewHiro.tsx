import { Image } from '@chakra-ui/image'
import { Box, Flex } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import PreviewTypo from '../../../parts/typo/PreviewTypo'

function PreviewHiro() {
    const { state: { shop: { backgroundImage, backgroundText, backgroundColor, shopDesign: { hiroTextColor, hiroLayout } } } } = useContext(designContext)

    return (
        <Flex backgroundColor={backgroundColor} justifyContent="space-between" padding="3%">
            <Box width="50%"><PreviewTypo fontSize="20px" fontWeight="bold" color={hiroTextColor}>{backgroundText}</PreviewTypo></Box>
            {backgroundImage && <Image width="50%" src={backgroundImage} />}
        </Flex>
    )
}

export default PreviewHiro