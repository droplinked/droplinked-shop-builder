import { Flex, Text, Image, ButtonGroup, IconButton, Button, Input} from "@chakra-ui/react"
import { AiOutlineDelete } from "react-icons/ai";
import { useCart } from "../../../context/cart/CartContext"
import { useToasty } from "../../../context/toastify/ToastContext"
import { useState } from "react";
import { deleteSkuFromCart ,updateQuantity } from "../../../api/base-user/Cart-api"



export default function CheckoutItem({ product }) {

    const [quantity, setQuantity] = useState(product.quantity)
    const [disableDeleteBtn, setDisableDeleteBtn] = useState(false)
    const [disableEditBtn, setDisableEditBtn] = useState(false)

    const { updateCart } = useCart()
    const { successToast, errorToast } = useToasty()


    // text for show variants value
    let findSku = product.Product.skus.find(sku => sku._id == product.skuID)
    let variantText = ""
    findSku.options.forEach(option => { variantText += `${option.variantName}:${option.value}  \xa0\xa0\xa0` })


    //delete merch
    const deleteMerch = async () => {
        setDisableDeleteBtn(true)
        let result = await deleteSkuFromCart(product.skuID)
        if (result == true) {
            successToast("Merch deleted successfully")
            updateCart();
        } else {
            errorToast(result)
        }
        setDisableDeleteBtn(false)
    }


    // update quantity
    const updateQ = async() => {

        if (quantity < 1) {
            errorToast("Merch quantity must be greater than zero")
            return;
        }
        setDisableEditBtn(true)
        let result = await updateQuantity(product.skuID , quantity)
        if(result == true){
            successToast("Merch updated successfully")
            updateCart();
        }else{
            errorToast(result)
        }
        setDisableEditBtn(false)
    }


    return (
        <Flex
            w="100%"
            p='5px'
            bgColor="#333"
            h="auto"
            mb="10px"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
        >

            <Flex
                w={{ base: "100%", md: "50%" }}
                flexDirection="row"
            >
                <Image
                    src={product.Product.media[0].url}
                    alt='product image'
                    w="80px"
                    h="80px"
                    mr="20px"
                />
                <Flex
                    flexDirection="column"
                    align="start"
                >
                    <Text
                        color="#fff"
                        fontWeight="600"
                        fontSize={{ base: "16px", md: "18px" }}
                        mb="5px"
                    >
                        {product.Product.title}
                    </Text>

                    <Text
                        color="#ddd"
                        fontWeight="500"
                        fontSize={{ base: "14px", md: "13px" }}
                        mb="5px"
                    >
                        {product.Product.description}
                    </Text>
                    {(variantText != "") &&
                        <Text
                            color="#ddd"
                            fontWeight="500"
                            fontSize={{ base: "14px", md: "13px" }}
                        >
                            {variantText}
                        </Text>
                    }
                </Flex>

            </Flex>

            <Flex
                w={{ base: '100%', md: "45%" }}
                mr="20px"
                h={{ base: "60px", md: "80px" }}
                alignItems="center"
                justifyContent="space-between">

                <Text
                    color="#fff"
                    fontWeight="600"
                    fontSize="18"
                >
                    ${findSku.price}
                </Text>

                <ButtonGroup size="md" isAttached variant='outline'>
                    <IconButton
                        aria-label='delete'
                        icon={<AiOutlineDelete color="#fd4545" size="sm" />}
                        _hover={{ bgColor: "none", borderColor: "#8053ff" }}
                        _focus={{ bgColor: "none", borderColor: "#8053ff" }}
                        //   _active={{bgColor: "none", borderColor: "#8053ff"}}
                        onClick={deleteMerch}
                        disabled={disableDeleteBtn}
                    />

                    <Input
                        value={quantity}
                        borderRadius="0px"
                        cursor="pointer"
                        w="80px"
                        textAlign="center"
                        color="#fff"
                        fontSize="20px"
                        fontWeight="600"
                        _hover={{ bgColor: "none", borderColor: "#8053ff" }}
                        _focus={{ bgColor: "none", borderColor: "#8053ff" }}
                        onChange={e => setQuantity(e.target.value)}
                    />
                    <Button
                        color="#fff"
                        fontSize="20px"
                        fontWeight="600"
                        _hover={{ bgColor: "none", borderColor: "#8053ff" }}
                        _focus={{ bgColor: "none", borderColor: "#8053ff" }}
                        onClick={updateQ}
                        disabled={disableEditBtn}
                    >Submit</Button>
                </ButtonGroup>

            </Flex>

        </Flex>
    )
}