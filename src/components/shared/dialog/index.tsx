import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import BasicButton, { IBasicButton } from 'components/shared/BasicButton/BasicButton'
import ModalWrapper from 'modals/modal-wrapper/ModalWrapper'
import React from 'react'

interface IButtons {
    children: any,
    onClick: Function
    buttonProps?: IBasicButton
}

export interface IAppDialog {
    open: boolean
    close: Function
    text?: any
    title: string
    buttons: Array<IButtons>
}

function AppDialog({ open, close, text, title, buttons }: IAppDialog) {
    return (
        <ModalWrapper show={open} close={close}>
            <VStack color="#FFF" align="stretch" spacing={6}>
                <Box textAlign="center">
                    <Text fontSize='3xl' color={"#FEB900"}><strong>{title}</strong></Text>
                </Box>
                {text && (
                    <Box textAlign="center">
                        <Text fontSize='xl' color={"#C2C2C2"}>
                            {text}
                        </Text>
                    </Box>
                )}
                <HStack justifyContent={buttons.length === 1 ? "center" : "space-between"}>
                    {buttons && buttons.map((el: IButtons, key) => (
                        <Box key={key}><BasicButton sizes='medium' onClick={() => {
                            el.onClick()
                            close()
                        }} {...el.buttonProps}>{el.children}</BasicButton></Box>
                    ))}
                </HStack>
            </VStack>
        </ModalWrapper>
    )
}

export default AppDialog