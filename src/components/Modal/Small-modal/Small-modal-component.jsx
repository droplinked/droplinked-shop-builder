

import BasicButton from '../../shared/BasicButton/BasicButton'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Box,
    Flex
} from '@chakra-ui/react'

export default function SmallModal({ show, hide, text, click, header, loading ,buttonText }) {

    return (
        <>
            <Modal isOpen={show} onClose={hide} >
                <ModalOverlay />
                <ModalContent bgColor="#222">
                    <ModalHeader color="white">{header}</ModalHeader>
                   
                    <ModalBody
                        fontWeight='600'
                        fontSize={{ base: "16px", md: '20px' }}
                        textAlign='center' color='white'>
                        {text}
                    </ModalBody>
                    <ModalFooter>
                        <Flex justifyContent='space-between' w='100%'>
                            <Box w='40%'>
                                <BasicButton
                                    bgColor="#4d4d4d"
                                    onClick={hide}
                                    disable={loading}
                                    cancelType={true}
                                > Cancel</BasicButton>
                            </Box>
                            <Box w='40%'>
                                <BasicButton loading={loading} onClick={click}>{buttonText}</BasicButton>
                            </Box>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
