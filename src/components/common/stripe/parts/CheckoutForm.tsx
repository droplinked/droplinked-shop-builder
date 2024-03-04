import { Flex, VStack } from '@chakra-ui/react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import BasicButton from 'components/common/BasicButton/BasicButton'
import useAppToast from 'functions/hooks/toast/useToast'
import React, { useState } from 'react'

export interface IFormStripe {
    onSuccess: Function
    cancel: Function
}
function CheckoutForm({ onSuccess, cancel }: IFormStripe) {
    const [States, setStates] = useState({
        loading: false,
        complete: false
    })
    const stripe = useStripe();
    const elements = useElements();
    const { showToast } = useAppToast();
    const setLoading = (loading: boolean) => setStates(prev => ({ ...prev, loading }))

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) return

        try {
            setLoading(true)
            await stripe.confirmPayment({ elements, redirect: "if_required" });
            onSuccess()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            showToast({ message: error?.message, type: 'error' });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack align="stretch" spacing="30px">
                <PaymentElement onChange={(e) => setStates((prev) => ({ ...prev, complete: e.complete }))} />
                <Flex justifyContent="space-between">
                    <BasicButton variant='outline' onClick={() => cancel()}>Cancel</BasicButton>
                    <BasicButton type='submit' isDisabled={!States.complete} isLoading={States.loading}>Pay</BasicButton>
                </Flex>
            </VStack>
        </form>
    )
}

export default CheckoutForm