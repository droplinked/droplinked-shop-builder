import { ModalBody } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Button from 'components/redesign/button/Button'
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useAppToast from 'functions/hooks/toast/useToast'
import { IproductState } from 'lib/apis/product/interfaces'
import { duplicateProductService, productDeleteServices } from 'lib/apis/product/productServices'
import React, { useState } from 'react'
import { useQueryClient } from 'react-query'

interface Props {
    isOpen: boolean
    onClose: () => void
    product: IproductState
    action: "DELETE" | "DUPLICATE"
}

function ConfirmationModal({ isOpen, onClose, product, action }: Props) {
    const queryClient = useQueryClient()
    const { showToast } = useAppToast()
    const [isLoading, setIsLoading] = useState(false)

    const actionMessages = {
        DELETE: {
            title: "Delete Product",
            description: "Are you sure you want to delete this product? You will no longer have access to this product.",
            successMessage: "The product has been deleted!",
            icon: <AppIcons.WhiteTrash />
        },
        DUPLICATE: {
            title: "Duplicate Product",
            description: "Are you sure you want to duplicate this product?",
            successMessage: "The product has been duplicated!",
            icon: <AppIcons.Copy style={{ transform: "scaleX(-1)" }} />
        }
    }

    const handleAction = async () => {
        try {
            setIsLoading(true)
            if (action === "DELETE") await productDeleteServices({ productID: product._id })
            else await duplicateProductService(product._id)
            showToast({ message: actionMessages[action].successMessage, type: "success" })
            queryClient.invalidateQueries(["PRODUCTS"])
        }
        catch (error) {
            showToast({ message: "Something went wrong. Please refresh or try again later.", type: "error" })
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
                icon={<ModalHeaderIconWrapper>{icon}</ModalHeaderIconWrapper>}
                title={title}
                description={description}
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" },
                    paddingBottom: { lg: "36px !important", md: "32px !important", base: "16px !important" }
                }}
            />
            <ModalBody display="flex" justifyContent="space-between" mb="8" bg="#141414" overflow="hidden">
                <Button disabled={isLoading} onClick={onClose} variant="secondary">
                    Cancel
                </Button>
                <Button isLoading={isLoading} onClick={handleAction}>
                    {action === "DELETE" ? "Delete Product" : "Duplicate Product"}
                </Button>
            </ModalBody>
        </AppModal>
    )
}

export default ConfirmationModal