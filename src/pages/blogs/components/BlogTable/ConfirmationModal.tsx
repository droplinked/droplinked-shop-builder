import { ModalFooter } from "@chakra-ui/react"
import AppButton, { AppButtonProps } from "components/redesign/button/AppButton"
import AppModal from "components/redesign/modal/AppModal"
import ModalHeaderData from "components/redesign/modal/ModalHeaderData"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
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
    const { t } = useLocaleResources("blogs")

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

            <ModalFooter display="flex" gap={6} mb="8">
                <AppButton flex={1} variant="secondary" isDisabled={isLoading} onClick={onClose}>
                    {t("cancel")}
                </AppButton>
                <AppButton
                    flex={1}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    {...confirmButtonProps}
                >
                    {confirmButtonProps?.children}
                </AppButton>
            </ModalFooter>
        </AppModal>
    )
}

export default ConfirmationModal