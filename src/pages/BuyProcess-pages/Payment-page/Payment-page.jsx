
import {
    Box,
    Text,
    Button,
} from '@chakra-ui/react'
import { useState } from "react"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from "../../../context/cart/CartContext"
import { checkoutCart } from "../../../api/BaseUser-apis/Cart-api"

import StripeComponent from "./stripe modal/stripe-modal-component"
import Loading from "../../../components/shared/loading/Loading"


const stripePromise = loadStripe('pk_test_51B3XzHDHP9PnFF5D7xWkc29H1NehLpfVEAWaycBBtoUXPyL4qq1dAZYVSBlWr5Kc0sGenWCJfuFEmXy5JCXxACLk00NXM3aQQh');

export default function PaymentPage() {

    const [paymentSelected, setPaymentSelected] = useState(null)
    const [clientSecret, setClientSecret] = useState('')
    const [disableBtns, setDisables] = useState(false)
    const { cart } = useCart();


    const appearance = {
        theme: 'night',
        labels: 'floating'
    };


    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
        appearance
    };

    const getTotalofMerchs = () => {
        let merchsPrice = 0;
        cart.items.forEach((item) => {
            merchsPrice += (item.price * item.quantity)
        })
        return merchsPrice
    }

    const getTotalofShipping = () => {
        let shops = cart.items.map((merch) => merch.shopName)
        shops = [...new Set(shops)];
        let shippingPrice = (shops.length * 5)
        return shippingPrice
    }

    const stripePayment = async () => {
        setDisables(true)
        let result = await checkoutCart()
        if(result != null){
            setClientSecret(result)
            setPaymentSelected("Stripe")
        }
        setDisables(false)
    }


    return (
        <Box w="100%" maxW="1000px" mx="auto" px={{ base: "20px", md: "80px" }}>

            {(cart == null)
                ?
                <Loading />
                :
                <>
                    <Box display="flex" wrap="wrap" row-gap="10px" w="100%" flexDirection="column">

                        {/* top side */}
                        <Box p="10px 5px" mb="50px" w={{ base: '100%', md: '200px' }}>
                            <Text color='#ddd' mb="20px" fontSize={{ base: '18px', md: '22px' }} fontWeight="600">
                                Merchs : $ {getTotalofMerchs()}
                            </Text>
                            <Text color='#ddd' mb="20px" fontSize={{ base: '18px', md: '22px' }} fontWeight="600">
                                Shipping : $ {getTotalofShipping()}
                            </Text>
                            <Text color='#ddd' mb="20px" fontSize={{ base: '18px', md: '22px' }} fontWeight="600">
                                Total price : $ {(getTotalofMerchs() + getTotalofShipping())}
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
                                    color="#8053ff"
                                    border='1px'
                                    borderColor='#8053ff'
                                    bgColor='#222'
                                    // bgColor={((paymentSelected == "Stripe")) ? '#8053ff' : "#4A4A4A"}
                                    _hover={{
                                        color: "#222",
                                        borderColor: '#222',
                                        bgColor: '#8053ff',
                                    }}
                                    disabled={disableBtns}
                                    onClick={stripePayment}
                                >Stripe</Button>

                                <Button
                                    w="40%"
                                    // bgColor={((paymentSelected == "Stx")) ? '#8053ff' : "#4A4A4A"}
                                    color="#8053ff"
                                    border='1px'
                                    borderColor='#8053ff'
                                    bgColor='#222'
                                    // bgColor={((paymentSelected == "Stripe")) ? '#8053ff' : "#4A4A4A"}
                                    _hover={{
                                        color: "#222",
                                        borderColor: '#222',
                                        bgColor: '#8053ff',
                                    }}
                                    disabled={disableBtns}
                                    onClick={() => {
                                        setPaymentSelected("Stx")
                                    }}
                                >Hiro Wallet</Button>
                            </Box>
                        </Box>
                    </Box>

                </>
            }

            {(paymentSelected == "Stripe") &&
                <Elements stripe={stripePromise} options={options}  >
                    <StripeComponent cartId={cart.id} />
                </Elements>
            }

        </Box>
    )
}