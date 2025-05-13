import { ModalBody } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppButton from 'components/redesign/button/AppButton'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useInvalidateProductsQuery from 'hooks/products/useInvalidateProducts'
import useAppToast from 'hooks/toast/useToast'
import { duplicateProductService, productDeleteServices, updateProductService } from 'lib/apis/product/productServices'
import React, { useState } from 'react'
import { action } from '../ProductTableActionMenu'

interface Props {
    product: any
    isOpen: boolean
    onClose: () => void
    action: action
}

function ConfirmationModal({ isOpen, onClose, product, action }: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const { invalidateProductsQuery } = useInvalidateProductsQuery()
    const { showToast } = useAppToast()

    const actionMessages = {
        DELETE: {
            icon: <AppIcons.WhiteTrash />,
            title: "Delete Product",
            description: "Are you sure you want to delete this product? This action cannot be undone.",
            successMessage: "The product has been deleted."
        },
        DUPLICATE: {
            icon: <AppIcons.Copy />,
            title: "Duplicate Product",
            description: "Are you sure you want to duplicate this product? A new copy will be created.",
            successMessage: "The product has been duplicated."
        },
        PUBLISH: {
            icon: <AppIcons.Transfer />,
            title: "Publish Product",
            description: "Are you sure you want to publish this product? It will become visible to your customers.",
            successMessage: "The product has been published."
        },
        DRAFT: {
            icon: <AppIcons.Transfer />,
            title: "Unpublish Product",
            description: "Are you sure you want to revert this product to draft? It will no longer be visible to your customers.",
            successMessage: "The product has been set to draft."
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
            const defaultMessage = "Something went wrong. Please refresh or try again later."
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
                    Cancel
                </AppButton>
                <AppButton isLoading={isLoading} onClick={handleAction}>
                    {title}
                </AppButton>
            </ModalBody>
        </AppModal>
    )
}

export default ConfirmationModal