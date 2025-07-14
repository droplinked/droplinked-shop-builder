import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'
import { ActionButtonProps } from '../interface'

function DesktopActionButtons({ actionButtons }: { actionButtons: ActionButtonProps[] }) {
    if (!actionButtons?.length) return null

    return (
        <Flex flexDirection="row" gap={4} alignItems="center">
            {actionButtons?.map((button, index) => {
                const ButtonComponent = (
                    <AppButton
                        key={index}
                        paddingBlock="10px"
                        paddingInline="14px"
                        fontSize={14}
                        fontWeight={500}
                        iconSpacing="6px"
                        {...button}
                    >
                        {button.title}
                    </AppButton>
                )

                if (button.wrapper) {
                    return React.cloneElement(button.wrapper, { key: index }, ButtonComponent)
                }

                return ButtonComponent
            })}
        </Flex>
    )
}

export default DesktopActionButtons