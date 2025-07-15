import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { ActionButtonProps } from '../interface'

function DesktopActionButtons({ actionButtons }: { actionButtons: ActionButtonProps[] }) {
    const { isRTL } = useLocaleResources('common')
    if (!actionButtons?.length) return null

    return (
        <Flex flexDirection={isRTL ? "row-reverse" : "row"} gap={4} alignItems="center">
            {actionButtons?.map((button, index) => {
                const ButtonComponent = (
                    <AppButton
                        key={index}
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