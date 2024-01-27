import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTypography from 'components/common/typography/AppTypography'
import { Form, Formik } from 'formik'
import useAppToast from 'functions/hooks/toast/useToast'
import { IchargeCreditService } from 'lib/apis/shop/interfaces'
import { chargeCreditService } from 'lib/apis/shop/shopServices'
import React, { useContext } from 'react'
import { useMutation } from 'react-query'
import rechargeContext from '../../context'
import rechargePaymentModel from './model'

function RechargePayment() {
    const { mutateAsync, isLoading } = useMutation((params: IchargeCreditService) => chargeCreditService(params))
    const { formSchema } = rechargePaymentModel
    const { close, updateState } = useContext(rechargeContext)
    const { showToast } = useAppToast()

    const onSubmit = async (data: any) => {
        try {
            const query = await mutateAsync(data)
            updateState('clientSecret', query.data.data.clientSecret)
        } catch (error) {
            showToast({ message: error?.message || 'Oops! Something went wrong', type: 'error' })
        }
    }

    return (
        <Formik
            initialValues={{
                amount: '',
            }}
            validationSchema={formSchema}
            onSubmit={onSubmit}
        >
            {({ errors, values, setFieldValue }) => (
                <Form>
                    <VStack align={"stretch"} color="#FFF" spacing="36px">
                        <AppTypography fontSize="14px" textAlign="center" color="#C2C2C2">Description about charging credit, how it works, why does they need it and any other description about payment</AppTypography>
                        <VStack align="stretch">
                            <HStack justifyContent="space-between" alignItems="baseline" rowGap="10px">
                                <Box width="100%"><AppInput name='' label='Credit Recharge Value' value={values.amount} error={errors?.amount ? errors?.amount.toString() : null} onChange={(e) => setFieldValue('amount', parseInt(e.target.value))} placeholder='2000' /></Box>
                                <AppTypography color="#808080" fontSize="14px" position="relative" top="47px">USD</AppTypography>
                            </HStack>
                            <HStack><AppTypography color="#C2C2C2" fontSize="12px">Payment with</AppTypography> <BlockchainDisplay show='icon' blockchain='STRIPE' props={{ width: "36px" }} /></HStack>
                        </VStack>
                        <Flex justifyContent="space-between">
                            <BasicButton variant='outline' onClick={close}>Cancel</BasicButton>
                            <BasicButton type='submit' isLoading={isLoading}>Pay</BasicButton>
                        </Flex>
                    </VStack>
                </Form>
            )}
        </Formik >
    )
}

export default RechargePayment