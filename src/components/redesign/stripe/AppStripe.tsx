import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { appDevelopment } from 'utils/app/variable';
import React from 'react';
import CheckoutForm, { IFormStripe } from './components/CheckoutForm';

/**
 * AppStripe Component - Stripe payment integration wrapper
 * 
 * Configures and initializes Stripe Elements with dark theme styling,
 * handling payment processing with appropriate success and error callbacks.
 * 
 * @param {object} props - Component props
 * @param {string} props.clientSecret - Stripe client secret for payment processing
 * @param {number} [props.amount] - Payment amount
 * @param {Function} props.cancel - Callback function when payment is canceled
 * @param {Function} props.onSuccess - Callback function when payment is successful
 * @param {Function} props.onError - Callback function when payment encounters an error
 */
const stripePromise = loadStripe(`${appDevelopment ? process.env.REACT_APP_STRIPE_KEY_DEV : process.env.REACT_APP_STRIPE_KEY_MAIN}`);

interface IProps extends IFormStripe {
  clientSecret: string
  amount?: number
}

function AppStripe({ clientSecret, amount, cancel, onSuccess, onError }: IProps) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night" }, paymentMethodCreation: "manual" }}>
      <CheckoutForm cancel={cancel} onSuccess={onSuccess} onError={onError} amount={amount} />
    </Elements>
  )
}

export default AppStripe