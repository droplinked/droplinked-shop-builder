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

import { AiOutlineFieldTime } from "react-icons/ai";

import OrderModal from "../OrderModal/OrderModal"

export default function OrderComponent({ seen }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box
            border='1px'
            borderColor={(seen) ? "#8053ff" : "#aaa"}
            borderRadius='16px'
            p='15px 20px'
        >
            <Flex justifyContent='space-between'  >
                <Text
                    color='#fff'
                    fontSize={{ base: "12px", md: '14px' }}
                    fontWeight='600'

                    mb={{ base: "10px", md: '20px' }}
                >
                    Order time : 4 hours ago
                </Text>

                {(seen) &&
                    <Text
                        color='#8053ff'
                        fontSize={{ base: "12px", md: '16px' }}
                        fontWeight='600'
                        mb={{ base: "10px", md: '20px' }}
                    >
                        New
                    </Text>
                }

            </Flex>

            <Text
                color='#fff'
                fontSize={{ base: "12px", md: '14px' }}
                fontWeight='600'
                mb={{ base: "10px", md: '20px' }}
            >
                Merch quantity : 10 Merch
            </Text>
            <Flex
                w='100%'
                justifyContent='space-between'
            >
                <Text
                    color='#fff'
                    fontSize={{ base: "20px", md: '26px' }}
                    fontWeight='600'
                >
                    Total price : $ 200
                </Text>
                <Text
                    color='#fff'
                    fontSize={{ base: "16px", md: '20px' }}
                    fontWeight='600'
                    my="auto"
                    h="100%"
                    px={{ base: '10px', md: "20px" }}
                    cursor='pointer'
                    borderBottom='1px'
                    borderColor='#8053ff'
                    _hover={{
                        border: '1px',
                        borderColor: '#8053ff',
                        borderRadius: '8px',
                        color: '#8053ff'
                    }}
                    onClick={onOpen}
                >
                    View order
                </Text>
            </Flex>

            <OrderModal isOpen={isOpen} onClose={onClose} />

        </Box>
    )
}