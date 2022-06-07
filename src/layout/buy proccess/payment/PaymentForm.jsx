import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "./PaymentForm.scss"

let sy = {
    backgroundColor: "#8053FF",
    color: "#FFFFFF",
    padding: "12px 12px",
    fontFamily: 'AvenirNext',
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "20px",
    borderRadius: "8px",
    marginTop: "10px"

}

let cardOptions = {
    style: {
        
        base: {
            width:"200px",
            height:"200px",
            border:"5px solid blue",
            backgroundColor:"#222",
            iconColor: "#666EE8",
            color: "#fff",
            fontWeight: "300",
            fontFamily: 'avenir, "Helvetica Neue", Helvetica, sans-serif',
            fontSize: "18px",
            "::placeholder": {
                color: "#CFD7E0",
            },
        },
    },
};


function PaymentForm({add}) {
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
        add(token)
    };

    return (
        <form onSubmit={handleSubmit} style={{backgroundColor:"#222"}}
        className="pay-fomr-ss"
        >
            <p>Payment</p>
            <CardElement options={cardOptions}/>
            <button type="submit" disabled={!stripe || !elements} style={sy}>Submit</button>
        </form>
    );
}

export default PaymentForm