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
    variant?: "default" | "delete"
    confirmButtonProps?: AppButtonProps
    cancelButtonProps?: AppButtonProps
}

function AppConfirmationDialog({
    isOpen,
    onClose,
    icon,
    title,
    description,
    variant = "default",
    confirmButtonProps = {},
    cancelButtonProps = {},
}: AppConfirmationDialogProps) {
    const { t } = useLocaleResources("common")

    const isLoading = !!confirmButtonProps.isLoading
    const baseButtonProps: AppButtonProps = { size: "lg", flex: 1, isDisabled: isLoading }
    const getConfirmButtonStyle = (): AppButtonProps => {
        if (variant === "delete" && !isLoading) {
            return {
                backgroundColor: "system.error",
                color: "text.white",
                _hover: { backgroundColor: "system.error" },
                _active: { backgroundColor: "system.error" },
            }
        }
        return {}
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "xl", isCentered: true }}
            modalContentProps={{ width: "600px", gap: "38px" }}
        >
            <ModalHeaderData icon={icon} title={title} description={description} />

            <ModalFooter display="flex" gap={6}>
                <AppButton
                    variant="secondary"
                    onClick={onClose}
                    {...baseButtonProps}
                    {...cancelButtonProps}
                >
                    {cancelButtonProps.children ?? t("cancel")}
                </AppButton>

                <AppButton
                    {...baseButtonProps}
                    {...confirmButtonProps}
                    {...getConfirmButtonStyle()}
                >
                    {confirmButtonProps.children ?? t("confirm")}
                </AppButton>
            </ModalFooter>
        </AppModal>
    )
}

export default AppConfirmationDialog