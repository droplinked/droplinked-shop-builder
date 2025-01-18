import React from 'react'
import { Coupon } from '../../interface'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import { Divider, Flex, ModalBody } from '@chakra-ui/react'
import { Formik } from 'formik'
import { getInitialValues, getValidationSchema } from './formConfigs'
import CouponForm from './CouponForm'
import Button from 'components/redesign/button/Button'
import { useMutation } from 'react-query'
import { IgiftcardCreateService, IGiftCardExpiryDate } from 'lib/apis/coupons/interfaces'
import { giftcardCreateService, updateGiftCartExpiryDateService } from 'lib/apis/coupons/addressServices'
import useAppStore, { useCheckPermission } from 'lib/stores/app/appStore'
import useAppToast from 'functions/hooks/toast/useToast'
import { capitalizeFirstLetter } from 'lib/utils/helpers/helpers'
import moment from 'moment/moment'

interface Props {
    isEdit?: boolean
    coupon?: Coupon
    isOpen: boolean
    onClose: () => void
    refetch: () => void
}

export default function CouponsEditCreationModal({ isEdit, coupon, isOpen, onClose, refetch }: Props) {
    const createGiftcard = useMutation((params: IgiftcardCreateService) => giftcardCreateService(params))
    const updateGiftcardExpiryDate = useMutation((params: IGiftCardExpiryDate) => updateGiftCartExpiryDateService(params))
    const isLoading = createGiftcard.isLoading || updateGiftcardExpiryDate.isLoading
    const checkPermissionAndShowToast = useCheckPermission()
    const { shop } = useAppStore()
    const { showToast } = useAppToast()

    async function onSubmit(params: any) {
        try {
            if (isEdit) {
                await updateGiftcardExpiryDate.mutateAsync({
                    id: coupon._id,
                    expiryDate: params.expiryDate
                })
            } else {
                if (!checkPermissionAndShowToast("coupon_creation")) return
                const body: IgiftcardCreateService = {
                    balance: params.balance,
                    name: params.name,
                    quantity: params.quantity,
                    ...params.expiryDate && { expiryDate: moment(params.expiryDate).format('Y/M/D') },
                    type: params.type,
                    shopID: shop._id,
                }
                await createGiftcard.mutateAsync(body)
            }

            showToast({
                message: `${capitalizeFirstLetter(isEdit ? coupon.type : params.type)} has been ${isEdit ? "updated" : "created"}.`,
                type: 'success'
            })
            refetch()
            onClose()
        } catch (error) {
            showToast({ message: error?.message || "Oops! Something went wrong.", type: 'error' });
        }
    }

    return (
        <AppModal modalRootProps={{ isOpen, onClose, isCentered: true, size: "xl" }} modalContentProps={{ p: 0, background: "#141414" }}>
            <ModalHeaderData
                backgroundColor='#141414'
                modalHeaderProps={{ padding: "0px", paddingBlock: "0px", style: { paddingInline: "36px" } }}
                title={isEdit ? "Edit Discount" : "Create Discount"}
                description=''
            />
            <ModalBody style={{ paddingInline: 0 }}>
                <Formik
                    initialValues={getInitialValues(coupon)}
                    validateOnChange={false}
                    validationSchema={getValidationSchema({ isEdit })}
                    onSubmit={onSubmit}
                >
                    {({ handleSubmit }) => (
                        <Flex flexDir={"column"} gap={9}>
                            <CouponForm isEdit={isEdit} />
                            <Divider borderColor={"#292929"} />
                            <Flex px={9} justifyContent={"space-between"}>
                                <Button onClick={onClose} isDisabled={isLoading} fontWeight={500} variant='secondary'>
                                    {isEdit ? "Cancel" : "Discard"}
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSubmit();
                                    }}
                                    type='submit'
                                    isLoading={isLoading}
                                    fontWeight={500}
                                >
                                    {isEdit ? "Update" : "Create"}
                                </Button>
                            </Flex>
                        </Flex>
                    )}
                </Formik>
            </ModalBody>
        </AppModal>
    )
}
