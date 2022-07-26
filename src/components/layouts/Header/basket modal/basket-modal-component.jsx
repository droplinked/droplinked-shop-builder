import "./basket-modal-style.scss"

import { Text, Button } from '@chakra-ui/react'
import { useCart } from "../../../../context/cart/CartContext"
import { useNavigate } from "react-router-dom";

import DropdownContainer from "../dropdown-container/DropDown-container"
import BasketItemComponent from "./basket item/basket-item-component"


export default function BasketModal({ close }) {

    const { cart } = useCart();

    let navigate = useNavigate();

    const ClickCheckuot = () => {
        navigate("/checkout")
        close();
    }


    return (
        <DropdownContainer close={close}>
            <div className="basket-modal-wrapper">
                {(cart) &&
                    <>
                        {(cart.items.length > 0)
                            ?
                            <>
                                {cart.items.map((item, i) => {
                                    return <BasketItemComponent key={i} item={item} />
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
        </DropdownContainer>
    )
}