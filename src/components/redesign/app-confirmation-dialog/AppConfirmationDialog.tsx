import { ModalFooter } from "@chakra-ui/react"
import AppButton, { AppButtonProps } from "components/redesign/button/AppButton"
import AppModal from "components/redesign/modal/AppModal"
import ModalHeaderData from "components/redesign/modal/ModalHeaderData"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import React from "react"

interface AppConfirmationDialogProps {
    isOpen: boolean
    onClose: () => void
    icon: React.ReactNode
    title: string
    description: string
    confirmButtonProps?: AppButtonProps
    cancelButtonProps?: AppButtonProps
    variant?: "default" | "delete"
}

function AppConfirmationDialog({
    isOpen,
    onClose,
    icon,
    title,
    description,
    confirmButtonProps = {},
    cancelButtonProps = {},
    variant = "default",
}: AppConfirmationDialogProps) {
    const { t } = useLocaleResources("common")
    const isLoading = confirmButtonProps.isLoading ?? false

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "xl", isCentered: true }}
            modalContentProps={{ width: "600px", gap: "38px" }}
        >
            <ModalHeaderData icon={icon} title={title} description={description} />

            <ModalFooter display="flex" gap={6}>
                <AppButton
                    size="lg"
                    flex={1}
                    variant="secondary"
                    isDisabled={isLoading}
                    onClick={onClose}
                    {...cancelButtonProps}
                >
                    {cancelButtonProps.children ?? t("cancel")}
                </AppButton>
                <AppButton
                    size="lg"
                    flex={1}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    {...(variant === "delete" && {
                        backgroundColor: "system.error",
                        color: "text.white",
                        _hover: { backgroundColor: "system.error" },
                        _active: { backgroundColor: "system.error" },
                        _focus: { backgroundColor: "system.error" },
                    })}
                    {...confirmButtonProps}
                >
                    {confirmButtonProps.children ?? t("confirm")}
                </AppButton>
            </ModalFooter>
        </AppModal>
    )
}

export default AppConfirmationDialog