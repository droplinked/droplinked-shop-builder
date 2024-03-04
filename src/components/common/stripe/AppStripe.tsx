import React, { useContext } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm, { IFormStripe } from './parts/CheckoutForm';
import { appDeveloment } from 'lib/utils/app/variable';
const stripePromise = loadStripe(`${appDeveloment ? process.env.REACT_APP_STRIPE_KEY_DEV : process.env.REACT_APP_STRIPE_KEY_MAIN}`);

interface IProps extends IFormStripe {
  clientSecret: string
}
function AppStripe({ clientSecret, cancel, onSuccess }: IProps) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night" }, paymentMethodCreation: "manual" }}>
      <CheckoutForm cancel={cancel} onSuccess={onSuccess} />
    </Elements>
  )
}

export default AppStripe