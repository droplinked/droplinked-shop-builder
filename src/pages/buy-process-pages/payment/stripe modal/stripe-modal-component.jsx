import {  useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useCart } from "../../../../context/cart/CartContext"

import ModalContainer from "../../../../components/Modal/modal-container/modal-container"
import BasicButton from "../../../../components/shared/BasicButton/BasicButton";

const StripeComponent = ({cartId}) => {

    const [loading , setLoading] = useState(false)

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
                return_url: `https://ngsf.flatlay.io/purchseHistory`,
            },
        });

        if (result.error) {
            setLoading(false)
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
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
            {(elements != null) &&
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <BasicButton mt='40px' p="12px 0px" type="submit"  loading={loading}>submit</BasicButton>
            </form>
            }
        </ModalContainer>
    )
}

export default StripeComponent