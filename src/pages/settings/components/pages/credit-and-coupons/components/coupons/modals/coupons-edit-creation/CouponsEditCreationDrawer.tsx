import React from 'react'
import { Coupon } from '../../interface'
import { Flex } from '@chakra-ui/react'
import { Formik } from 'formik'
import { getInitialValues, getValidationSchema } from './formConfigs'
import CouponForm from './CouponForm'
import { useMutation } from 'react-query'
import { IgiftcardCreateService, IGiftCardExpiryDate } from 'services/coupons/interfaces'
import { giftcardCreateService, updateGiftCartExpiryDateService } from 'services/coupons/addressServices'
import useAppStore, { useCheckPermission } from 'stores/app/appStore'
import useAppToast from 'hooks/toast/useToast'
import { capitalizeFirst } from 'utils/helpers'
import moment from 'moment/moment'
import Drawer from 'components/common/Drawer/Drawer'
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter'
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

interface Props {
    isEdit?: boolean
    coupon?: Coupon
    isOpen: boolean
    onClose: () => void
    refetch: () => void
}

export default function CouponsEditCreationDrawer({ isEdit, coupon, isOpen, onClose, refetch }: Props) {
    const { t } = useLocaleResources('settings');
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
                message: t(isEdit ? "settings.coupons.success.updated" : "settings.coupons.success.created", { type: capitalizeFirst(isEdit ? coupon.type : params.type) }),
                type: 'success'
            })
            refetch()
            onClose()
        } catch (error) {
            showToast({ message: error?.message || t("settings.coupons.error"), type: 'error' });
        } finally {
            resetForm()
        }
    }

    return (
        <Formik
            initialValues={getInitialValues({ coupon, convertPrice })}
            validateOnChange={false}
            validationSchema={getValidationSchema({ isEdit, t })}
            onSubmit={onSubmit}
        >
            {({ handleSubmit }) => (
                <Drawer
                    isOpen={isOpen}
                    onClose={onClose}
                    title={isEdit ? t("settings.coupons.drawer.editTitle") : t("settings.coupons.drawer.createTitle")}
                    discardButtonText={isEdit ? t("settings.coupons.drawer.cancel") : t("settings.coupons.drawer.discard")}
                    saveButtonText={isEdit ? t("settings.coupons.drawer.update") : t("settings.coupons.drawer.create")}
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
