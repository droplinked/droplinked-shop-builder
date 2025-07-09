import { Image, ImageProps } from '@chakra-ui/react'
import React from 'react'

function CardImage({ ...rest }: ImageProps) {
    return (
        <Image
            width="100%"
            height="100%"
            objectFit="contain"
            objectPosition="bottom"
            {...rest}
        />
    )
}

export default CardImage