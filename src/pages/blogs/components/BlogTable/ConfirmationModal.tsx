import { ModalFooter } from "@chakra-ui/react"
import Button, { AppButtonProps } from "components/redesign/button/Button"
import AppModal from "components/redesign/modal/AppModal"
import ModalHeaderData from "components/redesign/modal/ModalHeaderData"
import React from "react"

interface Props {
    isOpen: boolean
    onClose: () => void
    icon: React.ReactNode
    title: string
    description: string
    confirmButtonProps?: AppButtonProps
}

function ConfirmationModal({ isOpen, onClose, icon, title, description, confirmButtonProps }: Props) {
    const isLoading = confirmButtonProps?.isLoading

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
                descriptionProps={{
                    color: "text.subtext.placeholder.light !important"
                }}
            />

            <ModalFooter display="flex" gap={6} mb="8">
                <Button flex={1} variant="secondary" isDisabled={isLoading} onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    flex={1}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    {...confirmButtonProps}
                >
                    {confirmButtonProps?.children}
                </Button>
            </ModalFooter>
        </AppModal>
    )
}

export default ConfirmationModal