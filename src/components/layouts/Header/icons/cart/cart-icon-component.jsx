import { Flex, Box, Image } from "@chakra-ui/react"
import { useCart } from "../../../../../context/cart/CartContext"
import cartIcon from "../../../../../assest/icon/shopCart.svg"

export default function Cart({ clickBasket }) {
    const { cart } = useCart();

    return (
        <Box
            pos='relative'
            w={{ base: "25px", md: '40px' }}
            h={{ base: "25px", md: '40px' }}
            cursor='pointer'
            mr={{base:"8px" , md:'12px'}}
            onClick={clickBasket}
        >
            <Image
                h='100%'
                w='100%'
                pos='absolute'
                src={cartIcon}
                
            />
            {(cart != null) && (cart.items.length > 0) &&
                <Flex
                    pos='absolute'
                    w='100%'
                    h='100%'
                    pb='7px'
                    pl='4px'
                    fontWeight='600'
                    justifyContent='center'
                    alignItems='center'
                    fontSize={{ base: '6px', md: '10px' }}
                    color='#8053ff'
                >{cart.items.length}</Flex>}
        </Box>)
}

