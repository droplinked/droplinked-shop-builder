import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AppIcons from 'assets/icon/Appicons';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import React from 'react';
import { appDevelopment } from 'utils/app/variable';
import { ModalStep } from '../../types/interfaces';
import StripeForm from './StripeForm';

const stripePromise = loadStripe(`${appDevelopment ? process.env.REACT_APP_STRIPE_KEY_DEV : process.env.REACT_APP_STRIPE_KEY_MAIN}`)

interface Props {
    clientSecret: string;
    setPlanPurchaseModalStep: (step: ModalStep) => void;
    close: () => void;
}

function StripePayment({ clientSecret, setPlanPurchaseModalStep, close }: Props) {
    return (
        <>
            <ModalHeaderData
                icon={<AppIcons.StripePayment />}
                title='Credit card information'
                description={"Choose a credit card on file or add a new one."}
            />

            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night" }, paymentMethodCreation: "manual" }}>
                <StripeForm setplanPurchaseModalStep={setPlanPurchaseModalStep} closeModal={close} />
            </Elements>
        </>
    )
}

export default StripePayment