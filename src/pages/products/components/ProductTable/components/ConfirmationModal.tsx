import { ModalBody } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppButton from 'components/redesign/button/AppButton'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useInvalidateProductsQuery from 'hooks/products/useInvalidateProducts'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { duplicateProductService, productDeleteServices, updateProductService } from 'services/product/productServices'
import React, { useState } from 'react'
import { action } from '../ProductTableActionMenu'

interface Props {
    product: any
    isOpen: boolean
    onClose: () => void
    action: action
}

function ConfirmationModal({ isOpen, onClose, product, action }: Props) {
    const { t } = useLocaleResources('products')
    const [isLoading, setIsLoading] = useState(false)
    const { invalidateProductsQuery } = useInvalidateProductsQuery()
    const { showToast } = useAppToast()

    const actionMessages = {
        DELETE: {
            icon: <AppIcons.WhiteTrash />,
            title: t('ConfirmationModal.actions.delete.title'),
            description: t('ConfirmationModal.actions.delete.description'),
            successMessage: t('ConfirmationModal.actions.delete.successMessage')
        },
        DUPLICATE: {
            icon: <AppIcons.Copy />,
            title: t('ConfirmationModal.actions.duplicate.title'),
            description: t('ConfirmationModal.actions.duplicate.description'),
            successMessage: t('ConfirmationModal.actions.duplicate.successMessage')
        },
        PUBLISH: {
            icon: <AppIcons.Transfer />,
            title: t('ConfirmationModal.actions.publish.title'),
            description: t('ConfirmationModal.actions.publish.description'),
            successMessage: t('ConfirmationModal.actions.publish.successMessage')
        },
        DRAFT: {
            icon: <AppIcons.Transfer />,
            title: t('ConfirmationModal.actions.draft.title'),
            description: t('ConfirmationModal.actions.draft.description'),
            successMessage: t('ConfirmationModal.actions.draft.successMessage')
        }
    }

    const handleAction = async () => {
        try {
            setIsLoading(true)
            if (action === "DELETE") await productDeleteServices({ productID: product._id })
            else if (action === "DUPLICATE") await duplicateProductService(product._id)
            else if (["DRAFT", "PUBLISH"].includes(action)) {
                const publishProduct = action === "PUBLISH"
                await updateProductService({ productID: product._id, params: { publish_product: publishProduct } })
            }
            showToast({ message: actionMessages[action].successMessage, type: "success" })
            invalidateProductsQuery()
        }
        catch (error) {
            const defaultMessage = t('ConfirmationModal.error.defaultMessage')
            const errorMessage = error?.response?.data?.data?.message ?? defaultMessage
            showToast({ message: errorMessage, type: "error" })
        }
        finally {
            setIsLoading(false)
            onClose()
        }
    }

    const { title, description, icon } = actionMessages[action]

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "xl", isCentered: true }}
            modalContentProps={{ width: "600px", gap: 0, paddingBlock: 0, bg: "#141414" }}
        >
            <ModalHeaderData
                icon={icon}
                title={title}
                description={description}
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" },
                    paddingBottom: { lg: "36px !important", md: "32px !important", base: "16px !important" }
                }}
            />

            <ModalBody display="flex" justifyContent="space-between" mb="8" bg="#141414" overflow="hidden">
                <AppButton variant="secondary" isDisabled={isLoading} onClick={onClose}>
                    {t('ConfirmationModal.buttons.cancel')}
                </AppButton>
                <AppButton isLoading={isLoading} onClick={handleAction}>
                    {title}
                </AppButton>
            </ModalBody>
        </AppModal>
    )
}

export default ConfirmationModal