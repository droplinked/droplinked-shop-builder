
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

export default function YesNoModal({ show, hide, text, click, header, loading  }) {

    return (
        <>
            <Modal isOpen={show} onClose={hide} >
                <ModalOverlay />
                <ModalContent bgColor="#222">
                    <ModalHeader color="#fff">{header}</ModalHeader>
                   
                    <ModalBody
                        fontWeight='600'
                        fontSize={{ base: "16px", md: '20px' }}
                        textAlign='center' color='#fff'>
                        {text}
                    </ModalBody>
                    <ModalFooter>
                        <Flex justifyContent='space-between' w='100%'>
                            <Box w='40%'>
                                <BasicButton
                                    bgColor="#4d4d4d"
                                    onClick={hide}
                                    loading={loading}
                                    cancelType={true}
                                >No</BasicButton>
                            </Box>
                            <Box w='40%'>
                                <BasicButton loading={loading} onClick={click}>Yes</BasicButton>
                            </Box>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
