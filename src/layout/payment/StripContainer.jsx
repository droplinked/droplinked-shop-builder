import "./StripContainer.scss"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from "./PaymentForm";


const stripePromise = loadStripe('pk_test_VOOyyYjgzqdm8I3SrBqmh9qY');

function StripContainer() {

    const inputStyle = {
        iconColor: '#c4f0ff',
        color: 'red',
        fontWeight: '500',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: 'red',
        },
        '::placeholder': {
          color: '#87BBFD',
        },
  }



return (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
);

}

export default StripContainer