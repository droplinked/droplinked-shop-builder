import { Box, HStack, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppInput from 'components/common/form/textbox/AppInput'
import { Form, Formik } from 'formik'
import React, { useCallback, useContext } from 'react'
import CouponsCreateContext from '../../context'
import * as Yup from 'yup';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import useAppStore from 'lib/stores/app/appStore'
import moment from 'moment/moment'
import { useMutation } from 'react-query'
import { IgiftcardCreateService } from 'lib/apis/coupons/interfaces'
import { giftcardCreateService } from 'lib/apis/coupons/addressServices'
import useAppToast from 'functions/hooks/toast/useToast'

interface IFrom {
    name: string
    quantity: string
    balance: string
}

function CouponsCreateForm() {
    const { mutateAsync, isLoading } = useMutation((params: IgiftcardCreateService) => giftcardCreateService(params))
    const { type, closeModal } = useContext(CouponsCreateContext)
    const { shop } = useAppStore()
    const { showToast } = useAppToast()

    const onSubmit = useCallback(async (params: IFrom) => {
        try {
            const body: IgiftcardCreateService = {
                ...params,
                type,
                shopID: shop._id,
                expiryDate: moment().add(2, 'year').format('YYYY/MM/DD'),
            }
            await mutateAsync(body)
            showToast(capitalizeFirstLetter(type) + ' Created', 'success')
            closeModal()
        } catch (error) {
            showToast(error?.message || "Oops! Something went wrong", 'error');
        }
    }, [type, shop])

    const formSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        quantity: Yup.number().typeError('Please correct value').required('Required'),
        balance: Yup.number().typeError('Please correct value').required('Required'),
    });

    return (
        <Formik
            initialValues={{
                name: '',
                quantity: '',
                balance: '',
            }}
            validationSchema={formSchema}
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            {({ errors, values, setFieldValue }) => (
                <Form>
                    <VStack align="stretch" spacing='20px'>
                        <HStack>
                            <AppInput name='Title' value={values.name} error={errors.name} onChange={el => setFieldValue('name', el.target.value)} label='Title' placeholder='Summer Offer' />
                        </HStack>
                        <HStack justifyContent="space-between" spacing="20px">
                            <Box width="50%">
                                <AppInput value={values.quantity} error={errors.quantity} name='Available Quantity' onChange={el => setFieldValue('quantity', parseInt(el.target.value))} label='Available Quantity' placeholder='100' />
                            </Box>
                            <Box width="50%">
                                <AppInput value={values.balance} error={errors.balance} name={`${capitalizeFirstLetter(type)} Value`} onChange={el => setFieldValue('balance', parseInt(el.target.value))} label={`${capitalizeFirstLetter(type)} Value`} placeholder='%20' />
                            </Box>
                        </HStack>
                        <HStack justifyContent="space-between">
                            <BasicButton variant='outline' sizes="medium" onClick={() => closeModal()}>Discard</BasicButton>
                            <BasicButton isLoading={isLoading} type='submit' sizes="medium">Save</BasicButton>
                        </HStack>
                    </VStack>
                </Form>
            )}
        </Formik>
    )
}

export default CouponsCreateForm