import { ModalHeader } from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AppIcons from 'assest/icon/Appicons';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { appDevelopment } from 'lib/utils/app/variable';
import React from 'react';
import { ModalStep } from '../../types/interfaces';
import PurchaseStepInformation from '../PurchaseStepInformation';
import StripeForm from './StripeForm';

const stripePromise = loadStripe(`${appDevelopment ? process.env.REACT_APP_STRIPE_KEY_DEV : process.env.REACT_APP_STRIPE_KEY_MAIN}`)

interface Props {
    clientSecret: string;
    setplanPurchaseModalStep: (step: ModalStep) => void;
    close: () => void;
    isFromPlansPage?: boolean;
}

function StripePayment({ clientSecret, setplanPurchaseModalStep, close, isFromPlansPage }: Props) {
    const { logoutUser } = useProfile()

    const handleCloseModal = () => {
        isFromPlansPage && logoutUser()
        close()
    }

    return (
        <>
            <ModalHeader paddingBlock={0}>
                <PurchaseStepInformation
                    icon={<AppIcons.StripePayment />}
                    title='Credit card information'
                    description={"Choose a credit card on file or add a new one."}
                />
            </ModalHeader>

            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night" }, paymentMethodCreation: "manual" }}>
                <StripeForm setplanPurchaseModalStep={setplanPurchaseModalStep} closeModal={handleCloseModal} />
            </Elements>
        </>
    )
}

export default StripePayment