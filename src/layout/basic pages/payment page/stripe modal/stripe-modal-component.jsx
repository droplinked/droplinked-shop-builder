import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import BadicModal from "../../../../components/Modal/basic modal component/Basic-modal-component"

const StripeComponent = () => {

    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (e) => {
        // e.preventDefault();

        // if (!stripe || !elements) {
        //     return;
        // }

        // console.log('creating payment intent')

        // const { clientSecret } = await fetch('https://api.stripe.com/v1/payment_intents', {
        //     method: 'POST',
        //     headers: { 
        //         "Authorization": `Bearer pk_test_51B3XzHDHP9PnFF5D7xWkc29H1NehLpfVEAWaycBBtoUXPyL4qq1dAZYVSBlWr5Kc0sGenWCJfuFEmXy5JCXxACLk00NXM3aQQh`,
        //         "Content-Type": "application/json",
        //      },
        //     body: JSON.stringify({
        //         paymentMethodType: 'card',
        //         currency: 'USD',
        //         amouy:2000
        //     })
        // }).then(r => r.json());

        // console.log('payment intent created')
    }

    return (
        <BadicModal>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button >submit</button>
            </form>
        </BadicModal>
    )
}

export default StripeComponent