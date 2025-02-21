import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AppIcons from 'assest/icon/Appicons';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { appDevelopment } from 'lib/utils/app/variable';
import React from 'react';
import { ModalStep } from '../../types/interfaces';
import StripeForm from './StripeForm';
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper';

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
            <ModalHeaderData
                icon={
                    <ModalHeaderIconWrapper>
                        <AppIcons.StripePayment />
                    </ModalHeaderIconWrapper>
                }
                title='Credit card information'
                description={"Choose a credit card on file or add a new one."}
            />

            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night" }, paymentMethodCreation: "manual" }}>
                <StripeForm setplanPurchaseModalStep={setplanPurchaseModalStep} closeModal={handleCloseModal} />
            </Elements>
        </>
    )
}

export default StripePayment