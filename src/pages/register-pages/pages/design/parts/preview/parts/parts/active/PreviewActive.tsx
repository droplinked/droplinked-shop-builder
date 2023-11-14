import { Box, BoxProps } from '@chakra-ui/react'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import { IPreviewSections } from 'pages/register-pages/pages/design/reducer'
import React, { useContext } from 'react'

interface IProps {
    section: IPreviewSections
    children: any
    props?: BoxProps
}

function PreviewActive({ children, section, props }: IProps) {
    const { state: { optionSelected } } = useContext(designContext)

    return <Box borderRadius="8px" {...props} border={`1px solid ${optionSelected === section ? '#E63F43' : 'transparent'}`}>{children}</Box>
}

export default PreviewActive