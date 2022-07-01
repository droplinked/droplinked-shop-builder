
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Text,
    Button,
    useDisclosure ,
    Flex
} from '@chakra-ui/react'
import { useState } from "react"

import ButtonComponent from "../../../components/button component/Button-component";


export default function PaymentPage() {

    const [paymentSelected, setPaymentSelected] = useState(null)
    const cart = JSON.parse(localStorage.getItem("shopping_cart"));
    const { isOpen, onOpen, onClose } = useDisclosure()

    const changeWay = () => {
        setPaymentSelected((paymentSelected == "Stripe") ? "Stx" : "Stripe")
    }

    let merchsPrice = 0;
    let shippingPrice;
    cart.merchs.forEach((merch) => {
        merchsPrice += (merch.price * merch.quantity)
    })
    let shops = cart.merchs.map((merch) => merch.shopID._id)
    shops = [...new Set(shops)];
    shippingPrice = (shops.length * 5)

    return (
        <Box w="100%" maxW="1000px" mx="auto" px={{ base: "20px", md: "80px" }}>
            <Box display="flex" wrap="wrap" row-gap="10px" w="100%" flexDirection="column">

                {/* top side */}
                <Box p="10px 5px" mb="50px" w={{ base: '100%', md: '200px' }}>
                    <Text color='#ddd' mb="20px" fontSize={{ base: '16px', md: '18px' }} fontWeight="500">
                        Merchs : $ {merchsPrice}
                    </Text>
                    <Text color='#ddd' mb="20px" fontSize={{ base: '16px', md: '18px' }} fontWeight="500">
                        Shipping : $ {shippingPrice}
                    </Text>
                    <Text color='#ddd' mb="20px" fontSize={{ base: '16px', md: '18px' }} fontWeight="500">
                        Total price : $ {merchsPrice + shippingPrice}
                    </Text>
                </Box>

                <Box w="100%" mb="40px" display="flex" alignItems="center" justifyContent="center">
                    <Text color='#fff' fontSize={{ base: '22px', md: '26px' }} fontWeight="600">
                        Select payment way
                    </Text>
                </Box>

                {/* bottom side */}
                <Box w="100%" p="10px 5px">
                    <Box w="100%" display="flex" height={{ base: "100px", md: "auto" }} flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Button
                            w="40%"
                            color="#fff"
                            bgColor={((paymentSelected == "Stripe")) ? '#8053ff' : "#4A4A4A"}
                            _hover={{ color: "#444" }}
                            onClick={() => {
                                setPaymentSelected("Stripe")
                                onOpen()
                            }}
                        >Stripe</Button>

                        <Button
                            w="40%"
                            color="#fff"
                            bgColor={((paymentSelected == "Stx")) ? '#8053ff' : "#4A4A4A"}
                            _hover={{ color: "#444" }}
                            onClick={() => {
                                setPaymentSelected("Stx")
                                onOpen()
                            }}
                        >Hiro Wallet</Button>
                    </Box>
                </Box>

            </Box>

            <Modal isOpen={isOpen} onClose={onClose} bgColor="#222">
                <ModalOverlay />
                <ModalContent  bgColor="#222">
                    <ModalHeader color="#fff">Payment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose} color="">
                            Close
                        </Button>
                        <Button color="#fff" bgColor='#8053ff' variant='ghost'>submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}