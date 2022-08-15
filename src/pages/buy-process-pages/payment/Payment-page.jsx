
import {
    Box,
    Text,
    Button,
} from '@chakra-ui/react'
import { useState, useEffect } from "react"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from "../../../context/cart/CartContext"
import { checkoutCart } from "../../../api/base-user/Cart-api"
import { STRIPE_KEY } from "./stripe.key"
//import { addRootpaymentOrder } from "../../../api/base-user/Cart-api"
import { useNavigate } from "react-router-dom";
import { getClientSecret } from "../../../api/base-user/OrderHistory-api"

import axios from "axios"
import StripeComponent from "./stripe modal/stripe-modal-component"
import Loading from "../../../components/shared/loading/Loading"


const stripePromise = loadStripe(STRIPE_KEY.TEST);

export default function PaymentPage() {

   // const [rootpaymentsOrderID, setRootpaymentsOrderID] = useState(null);
    const [paymentSelected, setPaymentSelected] = useState(null)
    const [clientSecret, setClientSecret] = useState('')
    const [disableBtns, setDisables] = useState(false)


    const { cart, updateCart } = useCart();
    let navigate = useNavigate();

    let params = (new URL(document.location)).searchParams;

    let CurrentOrderId = params.get('CurrentOrderId')
    let orderPrice = params.get('price')

    if (cart && (cart.items.length == 0) && (CurrentOrderId == null)) {
        navigate("/purchseHistory?redirect_status=failed")
    }

    const appearance = {
        theme: 'night',
        labels: 'floating'
    };


    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
        appearance
    };



    // get total cost of merchs 
    const getTotalofMerchs = () => {
        let merchsPrice = 0;
        // map on all cart items and get total price of each item
        cart.items.forEach((item) => {
            merchsPrice += parseFloat(item.totalPrice)
        })
        return merchsPrice
    }



    // find all shop's name and build unique array and set $5 for each shop
    const getTotalofShipping = () => {
        let shops = cart.items.map((merch) => merch.shopName)
        shops = [...new Set(shops)];
        let shippingPrice = (shops.length * 5.0)
        return parseFloat(shippingPrice)
    }

    const getTotalCost = () => {
        return (CurrentOrderId) ? orderPrice : parseFloat((getTotalofShipping()) + (getTotalofMerchs())).toFixed(2)
    }



    const cancelPayment = async () => {
        await checkoutCart()
        updateCart()
        navigate("/purchseHistory?redirect_status=failed")
    }


    const stripePayment = async () => {
        setDisables(true)
        let result 
        if(CurrentOrderId) {
            result = await getClientSecret(CurrentOrderId)
        } else {
            result = await checkoutCart()
        }

        if (result != null) {
            setClientSecret(result)
            setPaymentSelected("Stripe")
            setTimeout(cancelPayment, 300000)
        }
        setDisables(false)
    }

    const rootpaymentListener = (orderId) => {
        setInterval(function () {
            axios.get(`https://api.staging.rootpayments.com/orders/${orderId}`)
                .then(e => {
                    if (e.data.data.status == 'paid') {
                        navigate("/purchseHistory?redirect_status=succeeded")
                    }
                    console.log(e.data.data.status)
                })
        }, 10000);
    }



    // const rootpaymentsPayment = async () => {
    //     setDisables(true) //Don't know what that is, copied from stripe

    //     const ROOTPAYMENTS_API = 'https://api.staging.rootpayments.com';
    //     const ROOTPAYMENTS_INTEGRATION_ID = '87f9faf7-816f-44e9-bfa5-a2b7d5d78ee2'; // Replace with your integration ID

    //     //Create RootPayments order
    //     await axios.post(`${ROOTPAYMENTS_API}/orders`, {
    //         "amount": {
    //             "amount": (getTotalCost()),
    //             "currency": "USD"
    //         },
    //         "token": "stx", //mia or stx - depends on Integration configuration
    //         "integration_id": ROOTPAYMENTS_INTEGRATION_ID,
    //         "callback_url": `https://dev-api.droplinked.com/webhook/root-payments/order` // Replace with your callback URL - this should point to your backend API that handles order statuses. Note the order=${cart.id} parameter in the callback URL (so that you can identify the order by its ID)
    //     }, {}).then(e => {
    //         addRootpaymentOrder(e.data.data.id)
    //         setRootpaymentsOrderID(e.data.data.id);
    //         rootpaymentListener(e.data.data.id)
    //     }).catch(e => {
    //         console.log(e)
    //     })
    //     setDisables(false)//Don't know what that is, copied from stripe
    // }

    return (
        <Box w="100%" maxW="1000px" mx="auto" px={{ base: "20px", md: "80px" }}>

            {(cart == null)
                ?
                <Loading />
                :
                <>
                    <Box display="flex" wrap="wrap" row-gap="10px" w="100%" flexDirection="column">

                        {/* top side */}
                        <Box p="10px 5px" mb="50px" w={{ base: '100%', md: '100%' }}>
                            {(!CurrentOrderId) && <Text color='#ddd' mb="20px" fontSize={{ base: '18px', md: '22px' }} fontWeight="600">
                                Items: ${getTotalofMerchs()}
                            </Text>}
                            {(!CurrentOrderId) && <Text color='#ddd' mb="20px" fontSize={{ base: '18px', md: '22px' }} fontWeight="600">
                                Shipping: ${getTotalofShipping()}
                            </Text>}
                            <Text color='#ddd' mb="20px" fontSize={{ base: '18px', md: '22px' }} fontWeight="600">
                                Total price: ${getTotalCost()}
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
                                    color="#8053ff"
                                    border='1px'
                                    borderColor='#8053ff'
                                    bgColor='#222'
                                    _hover={{
                                        color: "#222",
                                        borderColor: '#222',
                                        bgColor: '#8053ff',
                                    }}
                                    disabled={true}
                                  //  onClick={rootpaymentsPayment}
                                >Crypto payment</Button>
                            </Box>
                        </Box>



                    </Box>

                </>
            }
            {/* {rootpaymentsOrderID && (
                <Box w="100%" mb="40px" display="flex" alignItems="center" justifyContent="center">
                    <stacks-checkout orderid={rootpaymentsOrderID}></stacks-checkout>
                </Box>
            )} */}

            {(paymentSelected == "Stripe") &&
                <Elements stripe={stripePromise} options={options}  >
                    <StripeComponent cancel={() => { cancelPayment() }} />
                </Elements>
            }

        </Box>
    )
}