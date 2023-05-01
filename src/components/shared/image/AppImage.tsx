import { Image, ImageProps } from '@chakra-ui/react'
import React from 'react'
import imagePlaceholder from 'assest/icon/imagePlaceholder.png'

interface Iprops extends ImageProps { }

function AppImage(props: Iprops) {
    return (
        <Image fallbackSrc={imagePlaceholder} {...props} />
    )
}

export default AppImage