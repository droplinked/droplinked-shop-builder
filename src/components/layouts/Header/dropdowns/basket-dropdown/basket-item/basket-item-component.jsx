
import { Box, Text, Image, Spinner } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import { deleteSkuFromCart } from "../../../../../../api/base-user/Cart-api"
import { useCart } from "../../../../../../context/cart/CartContext"
import { ReactComponent as CloseIcon } from '../../../../../../assest/icon/xmark.svg';
import { useToasty } from "../../../../../../context/toastify/ToastContext"

export default function BasketItemComponent({ item, close }) {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { updateCart } = useCart()
    const { successToast, errorToast } = useToasty()

    //navigate to merch page after click on product
    const navigateToProductPage = () => {
        navigate(`${item.shopName}/merch/${item.product._id}`)
        close()
    }

    const deleteItem = async () => {
        setLoading(true)
        let result = await deleteSkuFromCart(item.skuID)
        if (result == true) {
            successToast("Item removed")
            updateCart();
        } else {
            errorToast(result)
        }
        setLoading(false)
    }
    console.log(item.skuID);
    return (
        <Box
            w="100%"
            h="80px"
            py="10px"
            borderBottom='1px'
            borderColor='white'
            display="flex"
            pos='relative'
        >
            <Image
                src={item.product.media[0].url}
                w="25%" h="100%" mr="10px" alt='Merch'
                cursor='pointer'
                onClick={navigateToProductPage}
            />

            <Box
                w="100%"
                h="100%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Box w="100%" display="flex" justifyContent="space-between">
                    <Text textAlign="center" fontSize="18px" color="white" fontWeight="600" cursor='pointer'
                        onClick={navigateToProductPage} >{item.product.title}</Text>
                    <Text textAlign="center" fontSize="18px" color="white" fontWeight="500" >${item.totalPrice}</Text>
                </Box>

                <Box w="100%" display="flex" justifyContent="space-between">
                    <Text textAlign="center" fontSize="12px" color="#ccc" fontWeight="500" >Quantity: {item.quantity}</Text>
                </Box>
            </Box>
            <Box
                pos='absolute'
                w='20px'
                h='20px'
                right='0px'
                bottom='10px'
            >
                {loading
                    ?
                    <Spinner color='#e74c3c' w='100%' h='100%' />
                    :
                    <CloseIcon
                        onClick={deleteItem}
                        style={{ fill: "#e74c3c", cursor: "pointer", width: "100%", height: "100%" }} />
                }
            </Box>

        </Box>
    )
}  