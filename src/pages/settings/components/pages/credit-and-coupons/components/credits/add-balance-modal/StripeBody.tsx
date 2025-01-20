import { ModalBody } from '@chakra-ui/react'
import AppStripe from 'components/redesign/stripe/AppStripe'
import React from 'react'

interface Props {
    handleSuccessPayment: () => void
    handleCancelPayment: () => void
    paymentData: {
        clientSecret: string | null
        amount: number | null
    }
}

export default function StripeBody({ handleSuccessPayment, handleCancelPayment, paymentData }: Props) {
    return (
        <ModalBody pt={"48px"}>
            <AppStripe cancel={handleCancelPayment} onSuccess={handleSuccessPayment} clientSecret={paymentData.clientSecret} amount={paymentData.amount} />
        </ModalBody>
    )
}
