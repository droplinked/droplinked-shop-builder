import { Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import BlueButton from 'components/redesign/button/BlueButton'
import React from 'react'

interface Props {
    image: string
    title: string
    description: string
    actionText: string
    onActionClick: () => void
}

function BaseEmptyState({ image, title, description, actionText, onActionClick }: Props) {
    return (
        <Flex direction="column" gap={9} padding={12}>
            <AppImage height="161px" src={image} objectFit="contain" />

            <Flex direction="column" alignItems="center" gap={1} textAlign="center">
                <Text fontWeight={500} color="#fff">{title}</Text>
                <Text fontSize={14} color="text.subtextPlaceholder.dark">{description}</Text>
                <BlueButton
                    sx={{ svg: { boxSize: 4, path: { stroke: "#179EF8" } } }}
                    onClick={onActionClick}
                >
                    {actionText}
                    <AppIcons.ExternalArrow />
                </BlueButton>
            </Flex>
        </Flex>
    )
}

export default BaseEmptyState