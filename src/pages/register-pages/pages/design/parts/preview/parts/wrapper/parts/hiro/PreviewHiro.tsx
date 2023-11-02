import { Image } from '@chakra-ui/image'
import { Box, Flex } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import PreviewTypo from '../../../parts/typo/PreviewTypo'

function PreviewHiro() {
    const { state: { shop: { backgroundImage, backgroundText, backgroundColor, shopDesign: { hiroTextColor, hiroLayout }, template_options } } } = useContext(designContext)

    return (
        <Flex backgroundColor={backgroundColor} justifyContent="space-between" padding="3%" {...template_options?.['--dlk-wrp']?.['--dlk-wrp-hiro']?.['--dlk-wrp-hiro-styles']}>
            <Box width="50%"><PreviewTypo fontSize="20px" fontWeight="bold" color={hiroTextColor} {...template_options?.['--dlk-wrp']?.['--dlk-wrp-hiro']?.['--dlk-wrp-hiro-caption']}>{backgroundText}</PreviewTypo></Box>
            {backgroundImage && <Image width="50%" {...template_options?.['--dlk-wrp']?.['--dlk-wrp-hiro']?.['--dlk-wrp-hiro-image']} src={backgroundImage} />}
        </Flex>
    )
}

export default PreviewHiro