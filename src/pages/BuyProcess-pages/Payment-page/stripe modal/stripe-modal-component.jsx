import { CardElement, useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';

import ModalContainer from "../../../../components/Modal/modal-container/modal-container"
import BasicButton from "../../../../components/shared/BasicButton/BasicButton";

const StripeComponent = () => {

    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: "https://ngsf.flatlay.io/",
            },
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            console.log(result.data);
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }


    }

    return (
        <ModalContainer>
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <BasicButton mt='40px' p="12px 0px" >submit</BasicButton>
            </form>
        </ModalContainer>
    )
}

export default StripeComponent