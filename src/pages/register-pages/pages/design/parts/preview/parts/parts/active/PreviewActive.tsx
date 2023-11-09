import { Box, BoxProps } from '@chakra-ui/react'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import { IPreviewSections } from 'pages/register-pages/pages/design/reducer'
import React, { useContext, useEffect, useRef } from 'react'
import designPreviewContext from '../../../context'

interface IProps {
    section: IPreviewSections
    children: any
    props?: BoxProps
}

function PreviewActive({ children, section, props }: IProps) {
    const { state: { optionSelected } } = useContext(designContext)

    return <Box {...props} border={`1px solid ${optionSelected === section ? '#E63F43' : 'transparent'}`} borderRadius="8px">{children}</Box>
}

export default PreviewActive