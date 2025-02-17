import { Flex, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import React from 'react'

interface Props {
    image: string
    title: string
    description: string
}

function EmptyState({ image, title, description }: Props) {
    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            padding={12}
            sx={{ p: { textAlign: "center" } }}
        >
            <AppImage height="200px" src={image} objectFit="cover" />
            <Text marginTop={9} fontWeight={500} color="#FFF">{title}</Text>
            <Text marginTop={1} fontSize={14} color="#7B7B7B">{description}</Text>
        </Flex>
    )
}

export default EmptyState