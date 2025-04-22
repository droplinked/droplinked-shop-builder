import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'
import { ActionButtonProps } from '../interface'

export default function DesktopActionButtons({ actionButtons }: { actionButtons: ActionButtonProps[] }) {
    if (!actionButtons?.length) {
        return null
    }

    return (
        <Flex flexDirection="row" gap={4} alignItems="center">
            {actionButtons?.map((button, index) => {
                const ButtonComponent = (
                    <Button
                        key={index}
                        {...button}
                    >
                        {button.title}
                    </Button>
                );

                if (button.wrapper) {
                    return React.cloneElement(button.wrapper, { key: index }, ButtonComponent);
                }

                return ButtonComponent;
            })}
        </Flex>
    )
}
