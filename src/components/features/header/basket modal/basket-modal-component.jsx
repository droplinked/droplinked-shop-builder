import "./basket-modal-style.scss"

import { Box, chakra, Text, Button } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { useCart } from "../../../../sevices/hooks/useCart"
import { useNavigate } from "react-router-dom";

import BasketItemComponent from "./basket item/basket-item-component"


export default function BasketModal({ close }) {

    const { cart } = useCart();


    let navigate = useNavigate();

    const ClickCheckuot = () => {
        navigate("/checkout")
        close();
    }
    return (

        <div className="basket-modal-wrapper">
            {(cart)
                ?
                <>
                    {cart.map(item => {
                       return <BasketItemComponent id={item.id} skuID={item.skuID} quantity={item.quantity} />
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
                <>
                </>
            }

        </div>

    )
}