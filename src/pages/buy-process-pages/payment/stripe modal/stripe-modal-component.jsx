import {  useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useCart } from "../../../../context/cart/CartContext"
import { Flex } from '@chakra-ui/react';
import { useToasty } from "../../../../context/toastify/ToastContext"
import ModalContainer from "../../../../components/Modal/modal-container/modal-container"
import BasicButton from "../../../../components/shared/BasicButton/BasicButton";
import Timer from "./time-component"

const StripeComponent = ({cancel}) => {

    const [loading , setLoading] = useState(false)
    const { errorToast } = useToasty()

    const { updateCart } = useCart()

    const elements = useElements();
    const stripe = useStripe();




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true)
        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/purchseHistory?redirect_status=succeeded`,
            },
        });

        if (result.error) {
            setLoading(false)
            // Show error to your customer (for example, payment details incomplete)
            errorToast(result.error.message);
        } else {
            setLoading(false)
           // console.log(result.data);
            updateCart()
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    }

    return (
        <ModalContainer>
            <Timer timerSecond={300} />
            <Flex mb='30px'></Flex>
            {(elements != null) &&
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <Flex justifyContent='space-between'>
                <BasicButton w='45%' mt='40px' p="12px 0px" bgColor='#e74c3c' click={cancel}>Cancel</BasicButton>
                <BasicButton w='45%' mt='40px' p="12px 0px" type="submit"  loading={loading}>Submit</BasicButton>
                </Flex>
                
            </form>
            }
        </ModalContainer>
    )
}

export default StripeComponent