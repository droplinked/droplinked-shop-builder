import {
    Text, Box, Flex, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
} from "@chakra-ui/react"

import MerchComponent from "../merchComponent/MerchComponent"


export default function OrderModal({isOpen , onClose}){

    return(
        <Modal isOpen={isOpen} onClose={onClose}  >
                <ModalOverlay />
                <ModalContent
                    mt='200px'
                    maxW='700px'
                    w='100%'
                    mx="20px"
                    bgColor='#222'
                >
                    <ModalHeader
                        color='#fff'
                        fontSize='22px'
                        fontWeight='600'
                    >Order</ModalHeader>
                    <ModalCloseButton color='white' />
                    <ModalBody>
                        <Text
                            color='#fff'
                            fontSize={{ base: '12px', md: '16px' }}
                            fontWeight='600'
                            mb='10px'
                        >
                            Date : 2022/06/21
                        </Text>
                        <Text
                            color='#fff'
                            fontSize={{ base: '12px', md: '16px' }}
                            fontWeight='600'
                            mb='10px'
                        >
                            Merchs 10
                        </Text>
                        <Text
                            color='#fff'
                            fontSize={{ base: '12px', md: '16px' }}
                            fontWeight='600'
                            mb='40px'
                        >
                            Total pric : $ 500
                        </Text>
                        < MerchComponent />
                        <Box mb='20px'></Box>
                        < MerchComponent />
                        <Box mb='20px'></Box>
                        < MerchComponent />
                        <Box mb='20px'></Box>
                        < MerchComponent />

                        <Box
                            mt='30px'
                            w='100%'
                            mb='12px'
                        >
                            <Text
                                color='white'
                                fontSize='16px'
                                mb='10px'
                            >
                                Customer Name : Behdad mansouri
                            </Text>
                            <Text
                                color='white'
                                fontSize='16px'
                            >
                                Customer Address : Iran ahwaz zeiton 5898
                            </Text>

                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' w='40%' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    )
}