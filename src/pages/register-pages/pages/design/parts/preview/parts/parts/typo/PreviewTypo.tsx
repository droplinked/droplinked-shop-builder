import { Text, TextProps } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import classes from './style.module.scss'

interface IProps extends TextProps { }
function PreviewTypo(props: IProps) {
    const { state: { shop: { shopDesign: { fontfamily, textColorParagraphs } } } } = useContext(designContext)

    return (
        <Text {...props} className={classes.fonts} fontFamily={fontfamily} color={textColorParagraphs || "#FFF"}>{props.children}</Text>
    )
}

export default PreviewTypo