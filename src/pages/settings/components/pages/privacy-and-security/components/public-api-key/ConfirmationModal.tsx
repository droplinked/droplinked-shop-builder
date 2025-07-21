import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useAppToast from 'hooks/toast/useToast'
import { ShopOAuth2Client } from 'services/shop/interfaces'
import { updateShopAPIKeyService } from 'services/shop/shopServices'
import { useCheckPermission } from 'stores/app/appStore'
import React from 'react'
import { useMutation } from 'react-query'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface Props {
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
    selectedDomain: string;
    domains: string[];
}

export default function ConfirmationModal({ isOpen, onClose, refetch, selectedDomain, domains }: Props) {
    const { t } = useLocaleResources('settings');
    const { showToast } = useAppToast()
    const checkPermissionAndShowToast = useCheckPermission()
    const { mutateAsync, isLoading } = useMutation((params: ShopOAuth2Client) => updateShopAPIKeyService(params))

    const handleDeleteDomain = async () => {
        try {
            if (!checkPermissionAndShowToast("shopfront_apis")) return
            if (domains.length === 1) return

            const updatedDomains = domains.filter(domain => domain !== selectedDomain)
            await mutateAsync({ domains: updatedDomains })
            await refetch()
            showToast({ message: t("PublicApiKey.deleteConfirmation.success"), type: "success" })
            onClose()
        } catch (error) {
            showToast({ message: (error as Error).message, type: "error" })
        }
    }

    return (
        <AppModal modalRootProps={{ isOpen, onClose, isCentered: true, size: "lg" }} modalContentProps={{ background: "#141414" }}>
            <ModalHeaderData
                modalHeaderProps={{
                    px: { lg: "48px !important", md: "32px !important", base: "16px !important" },
                    padding: "0px",
                    paddingBlock: "0px",
                    backgroundColor: '#141414',
                }}
                title={t("PublicApiKey.deleteConfirmation.title")}
                description={t("PublicApiKey.deleteConfirmation.description")}
            >
                <Flex gap={6} justifyContent={"space-between"} mt={"38px"}>
                    <AppButton width={"45%"} disabled={isLoading} variant='secondary' onClick={onClose}>
                        {t("cancel")}
                    </AppButton>
                    <AppButton width={"45%"} onClick={handleDeleteDomain} disabled={isLoading} isLoading={isLoading}>
                        {t("delete")}
                    </AppButton>
                </Flex>
            </ModalHeaderData>
        </AppModal>
    )
}
