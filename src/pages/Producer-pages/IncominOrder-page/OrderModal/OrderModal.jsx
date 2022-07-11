import {
    Text, Box, Flex, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from "@chakra-ui/react"

import MerchComponent from "../merchComponent/MerchComponent"


export default function OrderModal({  isOpen, onClose }) {


    return (
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
                    <Flex w='100%' justifyContent='space-between'>
                        <Text
                            color='#fff'
                            fontSize={{ base: '10px', md: '14px' }}
                            fontWeight='600'
                            mb={{ base: "5px", md: '10px' }}
                        >
                            Merchs price : $ 140
                        </Text>

                        <Text
                            color='#fff'
                            fontSize={{ base: '10px', md: '14px' }}
                            fontWeight='600'
                            mb={{ base: "5px", md: '10px' }}
                        >
                            Date : 2022/06/21
                        </Text>
                    </Flex>
                    <Flex w='100%' justifyContent='space-between'>
                        <Text
                            color='#fff'
                            fontSize={{ base: '10px', md: '14px' }}
                            fontWeight='600'
                            mb={{ base: "5px", md: '10px' }}
                        >
                            Shipping price : $ 5
                        </Text>
                        <Text
                            color='#fff'
                            fontSize={{ base: '10px', md: '14px' }}
                            fontWeight='600'
                            mb={{ base: "5px", md: '10px' }}
                        >
                            Merchs quantity : 10
                        </Text>

                    </Flex>

                    <Text
                        color='#fff'
                        fontSize={{ base: '16px', md: '20px' }}
                        fontWeight='600'
                        mb='40px'
                    >
                        Total pric : $ 145
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
                        mb='10px'
                    >
                        <Text
                            color='white'
                            fontSize={{ base:'14px' , md:'18px'}}
                            mb='20px'
                            fontWeight='600'
                        >
                            Customer Detail
                        </Text>
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