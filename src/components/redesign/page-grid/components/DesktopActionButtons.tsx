import { Flex } from '@chakra-ui/react'
import Button, { AppButtonProps } from 'components/redesign/button/Button'
import React from 'react'

export default function DesktopActionButtons({ actionButtons }: { actionButtons: AppButtonProps[] }) {
    if (!actionButtons?.length) {
        return null
    }

    return (
        <Flex flexDirection="row" gap={4} alignItems="center">
            {actionButtons?.map((button, index) => (
                <Button
                    key={index}
                    {...button}
                >
                    {button.title}
                </Button>
            ))}
        </Flex>
    )
}
