import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }
        const { error, token } = await stripe.createToken(
            elements.getElement(CardElement)
        );
        localStorage.setItem("checkout-selectedCard", JSON.stringify(token));
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || !elements} style={{backgroundColor:"blue" , width:"100px" , color:"white"}}>Submit</button>
        </form>
    );
}

export default PaymentForm