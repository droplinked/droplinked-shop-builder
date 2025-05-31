import { Flex, Text } from '@chakra-ui/react'
import { ExternalarrowSm } from 'assets/icons/Navigation/ExternalArrow/ExternalarrowSm'
import { ExternalarrowleftSm } from 'assets/icons/Navigation/ExternalArrowLeft/ExternalArrowLeftSm'
import AppImage from 'components/common/image/AppImage'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

interface Props {
    image: string
    title: string
    description: string
    actionText: string
    onActionClick: () => void
}

function BaseEmptyState({ image, title, description, actionText, onActionClick }: Props) {
    const { isRTL } = useLocaleResources("dashboardPage")

    return (
        <Flex direction="column" gap={9} padding={12}>
            <AppImage height="161px" src={image} objectFit="contain" />

            <Flex direction="column" alignItems="center" gap={1} textAlign="center">
                <Text fontWeight={500} color="text.white">{title}</Text>
                <Text fontSize={14} color="text.subtext.placeholder.dark">{description}</Text>
                <InteractiveText
                    padding="8px 12px"
                    fontSize={12}
                    iconRight={isRTL ? <ExternalarrowleftSm color='#179EF8' /> : <ExternalarrowSm color='#179EF8' />}
                    onClick={onActionClick}
                >
                    {actionText}
                </InteractiveText>
            </Flex>
        </Flex>
    )
}

export default BaseEmptyState