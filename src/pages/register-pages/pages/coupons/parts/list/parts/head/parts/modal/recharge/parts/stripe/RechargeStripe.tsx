import React, { useContext } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import rechargeContext from '../../context';
import CheckoutForm from './parts/CheckoutForm';
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

function RechargeStripe() {
  const { clientSecret } = useContext(rechargeContext)

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night" }, paymentMethodCreation: "manual" }}>
      <CheckoutForm />
    </Elements>
  )
}

export default RechargeStripe