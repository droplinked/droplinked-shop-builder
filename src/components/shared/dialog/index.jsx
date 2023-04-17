import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import ModalWrapper from 'modals/modal-wrapper/ModalWrapper'
import React from 'react'

function AppDialog({ open, close, text, title, buttons }) {
    return (
        <ModalWrapper show={open} close={close}>
            <VStack color="#FFF" align="stretch" spacing={6}>
                <Box textAlign="center">
                    <Text fontSize='3xl' color={"#FEB900"}><strong>{title}</strong></Text>
                </Box>
                <Box textAlign="center">
                    <Text fontSize='xl' color={"#C2C2C2"}>
                        {text}
                    </Text>
                </Box>
                <HStack justifyContent="space-between">
                    {buttons && buttons.map((el, key) => (
                        <Box key={key}><BasicButton size="lg" width="150px" onClick={() => {
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