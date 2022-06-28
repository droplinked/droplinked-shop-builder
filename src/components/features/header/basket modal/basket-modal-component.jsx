import "./basket-modal-style.scss"

import { Box, chakra, Text, Button } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { useCart } from "../../../../sevices/hooks/useCart"
import { useNavigate } from "react-router-dom";

import BasketItemComponent from "./basket item/basket-item-component"


export default function BasketModal({ close }) {

    const ChakraBox = chakra(motion.div, {
        shouldForwardProp: isValidMotionProp,
    })

    const { cart } = useCart();
    let navigate = useNavigate();

    const ClickCheckuot = () => {
        navigate("/checkout")
        close();
    }

    console.log(cart);

    return (
        // <ChakraBox
        //     border='1px'
        //     borderColor='white'
        //     borderRadius="10px"
        //     w={{ base: "90%", md: "300px" }}
        //     h="auto"
        //     p="20px 10px"
        //     pos="fixed"
        //     mx={{ base: "20px", md: "0px" }}
        //     right={{ base: "0px", md: "50px" }}
        //     zIndex="50"
        //     bgColor="#222"
        //     animate={{ top: ["-80px", "80px"], opacity: ["0", "1"] }}
        //     transition={{ duration: 0.3, }}
        //     color="red"
        // >
        //    xxx
        //         <BasketItemComponent />
        //         <BasketItemComponent />

        // </ChakraBox>

        <div className="basket-modal-wrapper">
            <BasketItemComponent />
            <BasketItemComponent />
            <Button
                mt="20px"
                color="white"
                w="100%"
                bgColor="#8053ff"
                fontSize="20px"
                fontWeight="600"
                _hover={{ color: "#222" }}
            >
                Check out
            </Button>

        </div>

    )
}