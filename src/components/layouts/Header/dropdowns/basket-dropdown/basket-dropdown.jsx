import "./basket-modal-style.scss"

import { Text, Button } from '@chakra-ui/react'
import { useCart } from "../../../../../context/cart/CartContext"
import { useNavigate } from "react-router-dom";

import BasketItemComponent from "./basket-item/basket-item-component"
import ShopifyCartItem from "./basket-item/shopify-item-cart"

export default function BasketModal({ close }) {

    const { cart } = useCart();

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
                            {cart.map((item, i) => {
                                return <ShopifyCartItem key={i} product={item.product} amount={item.amount} variant={item.variant}/>
                                // return <BasketItemComponent key={i} item={item} close={close} />
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