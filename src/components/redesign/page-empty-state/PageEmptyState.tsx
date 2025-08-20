import { Flex, Image, ImageProps, Text } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'

export interface PageEmptyStateProps {
    image: string
    imageProps?: ImageProps
    title?: string
    action?: {
        text: string
        icon?: React.ReactElement
        onClick: () => void
        wrapper?: (button: React.ReactElement) => React.ReactNode
    }
}

function PageEmptyState({ image, imageProps, title, action }: PageEmptyStateProps) {
    const renderAction = () => {
        if (!action) return null

        const button = (
            <AppButton
                variant="normal"
                padding="8px 12px"
                fontSize={12}
                fontWeight={500}
                leftIcon={action.icon}
                onClick={action.onClick}
            >
                {action.text}
            </AppButton>
        )

        return action.wrapper ? action.wrapper(button) : button
    }

    return (
        <Flex
            width="100%"
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <Image
                src={image}
                alt="Empty state illustration"
                {...imageProps}
            />

            {title && (
                <Text
                    mt="36px"
                    mb="16px"
                    fontSize={14}
                    color="text.white"
                >
                    {title}
                </Text>
            )}

            {action && renderAction()}
        </Flex>
    )
}

export default PageEmptyState
