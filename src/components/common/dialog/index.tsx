import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import BasicButton, { IBasicButton } from 'components/common/BasicButton/BasicButton'
import AppModal from 'components/common/modal/AppModal'
import React from 'react'
import AppTypography from '../typography/AppTypography'

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
        <AppModal open={open} close={close} size="lg">
            <VStack color="#FFF" align="stretch" spacing={6}>
                <Box textAlign="center">
                    <AppTypography size='20px' weight='bolder' color={"#FEB900"}>{title}</AppTypography>
                </Box>
                {text && (
                    <Box textAlign="center">
                        <AppTypography size='16px' whiteSpace={"pre-wrap"} color={"#C2C2C2"}>
                            {text}
                        </AppTypography>
                    </Box>
                )}
                <HStack paddingTop={6} justifyContent={buttons.length === 1 ? "center" : "space-between"}>
                    {buttons && buttons.map((el: IButtons, key) => (
                        <Box key={key}><BasicButton onClick={() => {
                            el.onClick()
                            close()
                        }} {...el.buttonProps}>{el.children}</BasicButton></Box>
                    ))}
                </HStack>
            </VStack>
        </AppModal>
    )
}

export default AppDialog