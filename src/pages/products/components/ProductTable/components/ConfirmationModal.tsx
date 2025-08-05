import { CopyLg } from 'assets/icons/Action/Copy/CopyLg'
import { TrashLg } from 'assets/icons/Action/Trash/TrashLg'
import { TransferLg } from 'assets/icons/Navigation/Transfer/TransferLg'
import AppConfirmationDialog from 'components/redesign/app-confirmation-dialog/AppConfirmationDialog'
import useInvalidateProductsQuery from 'hooks/products/useInvalidateProducts'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'
import { duplicateProductService, productDeleteServices, updateProductService } from 'services/product/productServices'
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
            icon: <TrashLg color='#fff' />,
            title: t('ConfirmationModal.actions.delete.title'),
            description: t('ConfirmationModal.actions.delete.description'),
            successMessage: t('ConfirmationModal.actions.delete.successMessage')
        },
        DUPLICATE: {
            icon: <CopyLg color='#fff' />,
            title: t('ConfirmationModal.actions.duplicate.title'),
            description: t('ConfirmationModal.actions.duplicate.description'),
            successMessage: t('ConfirmationModal.actions.duplicate.successMessage')
        },
        PUBLISH: {
            icon: <TransferLg color='#fff' />,
            title: t('ConfirmationModal.actions.publish.title'),
            description: t('ConfirmationModal.actions.publish.description'),
            successMessage: t('ConfirmationModal.actions.publish.successMessage')
        },
        DRAFT: {
            icon: <TransferLg color='#fff' />,
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
        <AppConfirmationDialog
            isOpen={isOpen}
            onClose={onClose}
            icon={icon}
            title={title}
            description={description}
            variant={action === "DELETE" ? "delete" : "default"}
            confirmButtonProps={{
                children: title,
                isLoading,
                onClick: handleAction
            }}
        />
    )
}

export default ConfirmationModal