import "./basket-modal-style.scss"

import { Box, chakra, Text, Button } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { useCart } from "../../../../sevices/hooks/useCart"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import BasketItemComponent from "./basket item/basket-item-component"


export default function BasketModal({ close }) {

    const { cart } = useCart();
    console.log(cart)
    let navigate = useNavigate();

    const ClickCheckuot = () => {
        navigate("/checkout")
        close();
    }
    return (

        <div className="basket-modal-wrapper">
            {(cart) &&
                <>
                    {(cart.length > 0)
                        ?
                        <>
                            {cart.map(item => {
                                return <BasketItemComponent item={item} />
                            })}
                            <Button
                                mt="20px"
                                color="white"
                                w="100%"
                                bgColor="#8053ff"
                                fontSize="20px"
                                fontWeight="600"
                                _hover={{ color: "#222" }}
                                onClick={ClickCheckuot}
                            >
                                Check out
                            </Button>

                        </>
                        :
                        <Text
                            color="white"
                            w='100%'
                            textAlign='center'
                            fontSize={{ base: "18px", md: "24px" }}
                            fontWeight='600'
                            my={{ base: "0px", md: "20px" }}
                            h="100%"
                        >
                            Empty
                        </Text>
                    }
                </>
            }
        </div>

    )
}