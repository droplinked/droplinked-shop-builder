import { Box, HStack, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppDatepicker from 'components/common/datepicker/AppDatepicker'
import AppInput from 'components/common/form/textbox/AppInput'
import { Form, Formik } from 'formik'
import useAppToast from 'functions/hooks/toast/useToast'
import { giftcardCreateService, updateGiftCartExpiryDateService } from 'lib/apis/coupons/addressServices'
import { IGiftCardExpiryDate, IgiftcardCreateService } from 'lib/apis/coupons/interfaces'
import useAppStore, { useCheckPermission } from 'lib/stores/app/appStore'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import moment from 'moment/moment'
import CouponsSettingContext from 'pages/register-pages/pages/coupons/context'
import React, { useCallback, useContext } from 'react'
import { useMutation } from 'react-query'
import * as Yup from 'yup'
import CouponsCreateContext from '../head/parts/modal/create/context'

interface Props {
    coupon?: any;
    close?: () => void
}

interface IFrom {
    name: string
    quantity: string
    balance: string
    expiryDate: Date
}

function CouponForm({ coupon, close }: Props) {
    const isEditMode = !!coupon
    const checkPermissionAndShowToast = useCheckPermission()
    const createGiftcard = useMutation((params: IgiftcardCreateService) => giftcardCreateService(params))
    const updateGiftcardExpiryDate = useMutation((params: IGiftCardExpiryDate) => updateGiftCartExpiryDateService(params))
    const isLoading = createGiftcard.isLoading || updateGiftcardExpiryDate.isLoading
    const { type, closeModal } = useContext(CouponsCreateContext)
    const { fetch } = useContext(CouponsSettingContext)
    const { shop } = useAppStore()
    const { showToast } = useAppToast()
    const closeFunction = isEditMode ? close : closeModal

    const onSubmit = useCallback(async (params: IFrom) => {
        try {
            if (isEditMode) {
                await updateGiftcardExpiryDate.mutateAsync({ id: coupon._id, expiryDate: params.expiryDate.toISOString() })
            }
            else {
                if (!checkPermissionAndShowToast("coupon_creation")) return
                const body: IgiftcardCreateService = {
                    balance: params.balance,
                    name: params.name,
                    quantity: params.quantity,
                    ...params.expiryDate && { expiryDate: moment(params.expiryDate).format('Y/M/D') },
                    type,
                    shopID: shop._id,
                }
                await createGiftcard.mutateAsync(body)
            }

            showToast({
                message: `${capitalizeFirstLetter(isEditMode ? coupon.type : type)} has been ${isEditMode ? "updated" : "created"}.`,
                type: 'success'
            })
            closeFunction()
            fetch()
        } catch (error) {
            showToast({ message: error?.message || "Oops! Something went wrong.", type: 'error' });
        }
    }, [type, shop])

    const formSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        quantity: Yup.number().min(0).typeError('Please correct value').required('Required'),
        balance: Yup.number().min(0).typeError('Please correct value').required('Required'),
    })

    return (
        <Formik
            initialValues={{
                name: isEditMode ? coupon.name : "",
                quantity: isEditMode ? coupon.codes.length : "",
                balance: isEditMode ? coupon.balance : "",
                expiryDate: isEditMode && coupon?.expiryDate ? new Date(coupon.expiryDate) : null
            }}
            validationSchema={formSchema}
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            {({ errors, values, setFieldValue }) => (
                <Form>
                    <VStack align="stretch" spacing='20px'>
                        <HStack>
                            <AppInput name='Title' value={values.name} error={errors?.name?.toString()} onChange={el => setFieldValue('name', el.target.value)} label='Title' placeholder='Summer Offer' isDisabled={isEditMode} />
                        </HStack>
                        <HStack justifyContent="space-between" alignItems="baseline" spacing="20px">
                            <Box width="50%">
                                <AppInput value={values.quantity} error={errors?.quantity?.toString()} name='Available Quantity' onChange={el => setFieldValue('quantity', parseInt(el.target.value))} label='Available Quantity' placeholder='100' isDisabled={isEditMode} />
                            </Box>
                            <Box width="50%">
                                <AppInput value={values.balance} error={errors?.balance?.toString()} name={`${capitalizeFirstLetter(type)} Value`} onChange={el => setFieldValue('balance', parseInt(el.target.value))} label={`${capitalizeFirstLetter(type)} Value`} placeholder={type === "DISCOUNT" ? '20%' : '200'} isDisabled={isEditMode} />
                            </Box>
                        </HStack>
                        <AppDatepicker
                            onChange={(value) => setFieldValue('expiryDate', value)}
                            placeholderText="Enter expiration Date"
                            minDate={new Date()}
                            label='Expiration Date'
                            value={values.expiryDate}
                        />
                        <HStack justifyContent="space-between">
                            <BasicButton variant='outline' onClick={() => closeFunction()}>{isEditMode ? "Cancel" : "Discard"}</BasicButton>
                            <BasicButton isLoading={isLoading} type='submit'>{isEditMode ? "Edit" : "Save"}</BasicButton>
                        </HStack>
                    </VStack>
                </Form>
            )}
        </Formik>
    )
}

export default CouponForm