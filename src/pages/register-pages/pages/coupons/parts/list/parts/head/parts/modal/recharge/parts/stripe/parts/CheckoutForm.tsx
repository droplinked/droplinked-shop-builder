import { Flex, VStack } from '@chakra-ui/react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import BasicButton from 'components/common/BasicButton/BasicButton'
import useAppToast from 'functions/hooks/toast/useToast'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { patchedChargedService } from 'lib/apis/shop/shopServices'
import CouponsSettingContext from 'pages/register-pages/pages/coupons/context'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import rechargeContext from '../../../context'

function CheckoutForm() {
    const [States, setStates] = useState({
        loading: false,
        complete: false
    })
    const { close } = useContext(rechargeContext)
    const { fetch } = useContext(CouponsSettingContext)
    const stripe = useStripe();
    const elements = useElements();
    const { showToast } = useAppToast();
    const { updateShopData } = useProfile()

    const setLoading = (loading: boolean) => setStates(prev => ({ ...prev, loading }))

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) return

        try {
            setLoading(true)
            await stripe.confirmPayment({
                elements,
                redirect: "if_required"
            });
            await fetch()
            await updateShopData()
            setLoading(false)
            close()

            showToast("Payment confirmed! Your credit has been added successfully", 'success');
        } catch (error) {
            setLoading(false)
            showToast(error?.message, 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack align="stretch" spacing="30px">
                <PaymentElement onChange={(e) => setStates((prev) => ({ ...prev, complete: e.complete }))} />
                <Flex justifyContent="space-between">
                    <BasicButton variant='outline' onClick={close}>Cancel</BasicButton>
                    <BasicButton type='submit' isDisabled={!States.complete} isLoading={States.loading}>Pay</BasicButton>
                </Flex>
            </VStack>
        </form>
    )
}

export default CheckoutForm