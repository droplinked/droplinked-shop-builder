import React from 'react'
import { Coupon } from '../../interface'
import { Flex } from '@chakra-ui/react'
import { Formik } from 'formik'
import { getInitialValues, getValidationSchema } from './formConfigs'
import CouponForm from './CouponForm'
import { useMutation } from 'react-query'
import { IgiftcardCreateService, IGiftCardExpiryDate } from 'lib/apis/coupons/interfaces'
import { giftcardCreateService, updateGiftCartExpiryDateService } from 'lib/apis/coupons/addressServices'
import useAppStore, { useCheckPermission } from 'lib/stores/app/appStore'
import useAppToast from 'hooks/toast/useToast'
import { capitalizeWords } from 'utils/helpers'
import moment from 'moment/moment'
import Drawer from 'components/common/Drawer/Drawer'
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter'

interface Props {
    isEdit?: boolean
    coupon?: Coupon
    isOpen: boolean
    onClose: () => void
    refetch: () => void
}

export default function CouponsEditCreationDrawer({ isEdit, coupon, isOpen, onClose, refetch }: Props) {
    const createGiftcard = useMutation((params: IgiftcardCreateService) => giftcardCreateService(params))
    const updateGiftcardExpiryDate = useMutation((params: IGiftCardExpiryDate) => updateGiftCartExpiryDateService(params))
    const isLoading = createGiftcard.isLoading || updateGiftcardExpiryDate.isLoading
    const { convertPrice } = useCurrencyConverter()
    const checkPermissionAndShowToast = useCheckPermission()
    const { shop } = useAppStore()
    const { showToast } = useAppToast()

    async function onSubmit(params: any, { resetForm }) {
        try {
            if (isEdit) {
                await updateGiftcardExpiryDate.mutateAsync({
                    id: coupon._id,
                    expiryDate: params.expiryDate
                })
            } else {
                if (!checkPermissionAndShowToast("coupon_creation")) return
                const body: IgiftcardCreateService = {
                    balance: params.type === "CREDIT" ? +convertPrice({ amount: params.balance, toUSD: true }).toFixed(2) : params.balance,
                    name: params.name,
                    quantity: params.quantity,
                    ...params.expiryDate && { expiryDate: moment(params.expiryDate).format('Y/M/D') },
                    type: params.type,
                    shopID: shop._id,
                }
                await createGiftcard.mutateAsync(body)
            }

            showToast({
                message: `${capitalizeWords(isEdit ? coupon.type : params.type)} has been ${isEdit ? "updated" : "created"}.`,
                type: 'success'
            })
            refetch()
            onClose()
        } catch (error) {
            showToast({ message: error?.message || "Oops! Something went wrong.", type: 'error' });
        } finally {
            resetForm()
        }
    }

    return (
        <Formik
            initialValues={getInitialValues({ coupon, convertPrice })}
            validateOnChange={false}
            validationSchema={getValidationSchema({ isEdit })}
            onSubmit={onSubmit}
        >
            {({ handleSubmit }) => (
                <Drawer
                    isOpen={isOpen}
                    onClose={onClose}
                    title={isEdit ? "Edit Discount" : "Create Discount"}
                    discardButtonText={isEdit ? "Cancel" : "Discard"}
                    saveButtonText={isEdit ? "Update" : "Create"}
                    isLoading={isLoading}
                    onClick={handleSubmit}
                    showSubmitButtons
                >
                    <Flex my={9} height={"100%"} px={9} flexDir="column">
                        <CouponForm isEdit={isEdit} />
                    </Flex>
                </Drawer>
            )}
        </Formik>
    )
}
