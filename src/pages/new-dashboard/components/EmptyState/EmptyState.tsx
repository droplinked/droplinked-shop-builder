import { Flex, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import ExternalLink from 'components/redesign/external-link/ExternalLink'
import React from 'react'

interface Props {
    image: string
    title: string
    description: string
    linkText: string
    linkTo: string
    isExternalLink?: boolean
}

function EmptyState({ image, title, description, linkText, linkTo, isExternalLink }: Props) {
    return (
        <Flex
            direction="column"
            gap={9}
            padding={12}
        >
            <AppImage height="161px" src={image} objectFit="contain" />

            <Flex direction="column" alignItems="center" gap={1}>
                <Text fontWeight={500} color="#fff">{title}</Text>

                <Text fontSize={14} color="#7B7B7B">{description}</Text>

                <ExternalLink
                    textDecoration="none"
                    padding="8px 12px"
                    fontSize={12}
                    fontWeight={500}
                    hasArrow
                >
                    {linkText}
                </ExternalLink>
            </Flex>
        </Flex>
    )
}

export default EmptyState