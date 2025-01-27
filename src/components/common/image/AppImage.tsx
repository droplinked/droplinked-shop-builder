import { Image, ImageProps } from '@chakra-ui/react'
import React from 'react'

function AppImage(props: ImageProps) {
    return (
        <Image
            fallbackSrc='https://upload-file-droplinked.s3.amazonaws.com/4a7a9605254cc8d0b64a6b0ee1250c09aa8b476907b67fd9afc1a180f1b6ad17.png'
            {...props}
        />
    )
}

export default AppImage