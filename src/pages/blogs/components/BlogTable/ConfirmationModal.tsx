import { ModalBody } from "@chakra-ui/react"
import Button from "components/redesign/button/Button"
import AppModal from "components/redesign/modal/AppModal"
import ModalHeaderData from "components/redesign/modal/ModalHeaderData"
import React from "react"

interface Props {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    isLoading: boolean
    icon: React.ReactNode
    title: string
    description: string
    confirmText: string
}

function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
    icon,
    title,
    description,
    confirmText
}: Props) {
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
                <Button variant="secondary" isDisabled={isLoading} onClick={onClose}>
                    Cancel
                </Button>
                <Button isLoading={isLoading} isDisabled={isLoading} onClick={onConfirm}>
                    {confirmText}
                </Button>
            </ModalBody>
        </AppModal>
    )
}

export default ConfirmationModal