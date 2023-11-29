import React, { useContext } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import rechargeContext from '../../context';
import CheckoutForm from './parts/CheckoutForm';
import { appDeveloment } from 'lib/utils/app/variable';
const stripePromise = loadStripe(`${appDeveloment ? process.env.REACT_APP_STRIPE_KEY_DEV : process.env.REACT_APP_STRIPE_KEY_MAIN}`);

function RechargeStripe() {
  const { clientSecret } = useContext(rechargeContext)

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night" }, paymentMethodCreation: "manual" }}>
      <CheckoutForm />
    </Elements>
  )
}

export default RechargeStripe