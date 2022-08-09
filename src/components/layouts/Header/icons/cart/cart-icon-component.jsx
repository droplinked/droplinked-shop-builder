import {  Box, Image, keyframes } from "@chakra-ui/react"
import { useCart } from "../../../../../context/cart/CartContext"


import cartIcon from "../../../../../assest/icon/shopCart.svg"
import activeCartIcon from '../../../../../assest/icon/activeShopCart.svg';


const animationKeyframes = keyframes`
0% { opacity:1; }
50% { opacity:0.4; }
100% { opacity:1; }
`;

const animation = `${animationKeyframes} 2s linear infinite`;


export default function Cart({ clickBasket }) {

    const { cart } = useCart();

    return (
        <Box
            pos='relative'
            w={{ base: "25px", md: '40px' }}
            h={{ base: "25px", md: '40px' }}
            cursor='pointer'
            mr={{ base: "8px", md: '12px' }}
            onClick={clickBasket}
        >

            {((cart != null) && (cart.items.length > 0)) ?
                <Image
                    h='100%'
                    w='100%'
                    pos='absolute'
                    src={activeCartIcon}
                    animation={animation}
                />
                :
                <Image
                    h='100%'
                    w='100%'
                    pos='absolute'
                    src={cartIcon}
                    fill='red'
                />
            }
        </Box>)
}

