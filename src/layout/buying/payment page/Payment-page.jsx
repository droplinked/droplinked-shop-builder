import { Box, Text, Button, Flex } from "@chakra-ui/react"
import { useState } from "react"

import ButtonComponent from "../../../components/button component/Button-component";


export default function PaymentPage() {

    const [paymentSelected, setPaymentSelected] = useState("Stripe")

    const changeWay = () => {
        setPaymentSelected((paymentSelected == "Stripe") ? "Stx" : "Stripe")
    }

    return (
        <Box w="100%" maxW="1000px" mx="auto" px={{ base: "20px", md: "80px" }}>
            <Box display="flex" wrap="wrap" row-gap="10px" w="100%" flexDirection="column">

                {/* top side */}
                <Box p="10px 5px" mb="50px" w={{ base: '100%', md: '200px' }}>
                    <Text color='#ddd' mb="20px" fontSize={{ base: '16px', md: '18px' }} fontWeight="500">
                        Merchs : $300
                    </Text>
                    <Text color='#ddd' mb="20px" fontSize={{ base: '16px', md: '18px' }} fontWeight="500">
                        Shipping : $100
                    </Text>
                    <Text color='#ddd' mb="20px" fontSize={{ base: '16px', md: '18px' }} fontWeight="500">
                        Total price : $400
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
                            onClick={changeWay}
                        >Stripe</Button>

                        <Button
                            w="40%"
                            color="#fff"
                            bgColor={((paymentSelected == "Stx")) ? '#8053ff' : "#4A4A4A"}
                            _hover={{ color: "#444" }}
                            onClick={changeWay}
                        >Hiro Wallet</Button>
                    </Box>
                </Box>

            </Box>
            {/* <Flex
                justifyContent="space-between"
                alignItems="center"
                mt="150px"
                h="40px"
            >
                <Box
                    h="100%"
                    w="40%"
                >
                    <ButtonComponent>Back</ButtonComponent>
                </Box>
                <Box
                     h="100%"
                    w="40%"
                >
                    <ButtonComponent>Submit</ButtonComponent>
                </Box>
            </Flex> */}

        </Box>
    )
}