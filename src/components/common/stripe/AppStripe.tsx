import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { appDevelopment } from 'utils/app/variable';
import React from 'react';
import CheckoutForm, { IFormStripe } from './parts/CheckoutForm';

const stripePromise = loadStripe(`${appDevelopment ? import.meta.env.VITE_STRIPE_KEY_DEV : import.meta.env.VITE_STRIPE_KEY_MAIN}`);

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