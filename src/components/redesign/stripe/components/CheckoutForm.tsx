import { Flex, VStack } from '@chakra-ui/react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Button from 'components/redesign/button/Button'
import useAppToast from 'functions/hooks/toast/useToast'
import React, { useState } from 'react'

export interface IFormStripe {
    onSuccess: () => void
    onError?: () => void
    cancel: () => void
    amount?: number
}

function CheckoutForm({ onSuccess, cancel, amount, onError }: IFormStripe) {
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

        setLoading(true)
        const { error } = await stripe.confirmPayment({ elements, redirect: "if_required" })
        if (error) {
            setLoading(false)
            showToast({ message: error.message, type: 'error' })
            onError?.()
            return
        }
        setLoading(false)
        onSuccess()
    }

    return (
        <form>
            <VStack align="stretch" spacing="30px">
                <PaymentElement onChange={(e) => setStates((prev) => ({ ...prev, complete: e.complete }))} />
                <Flex justifyContent="space-between">
                    <Button variant='secondary' onClick={() => cancel()}>Cancel</Button>
                    <Button type='button' onClick={(e) => handleSubmit(e)} isDisabled={!States.complete} isLoading={States.loading}>Pay {amount ? `$${amount.toFixed(2)}` : ""}</Button>
                </Flex>
            </VStack>
        </form>
    )
}

export default CheckoutForm