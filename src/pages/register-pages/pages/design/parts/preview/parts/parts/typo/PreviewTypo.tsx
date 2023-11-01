import { Text, TextProps } from '@chakra-ui/layout'
import React from 'react'

interface IProps extends TextProps { }
function PreviewTypo(props: IProps) {
    return (
        <Text {...props}>{props.children}</Text>
    )
}

export default PreviewTypo